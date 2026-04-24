import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'andrew@fct.vn';

// Khởi tạo Resend instance
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Escapes characters for Telegram MarkdownV2
 */
function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export interface NotificationPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  solution?: string;
  projectScale?: string;
  message?: string;
  source?: string;
  ip?: string;
}

/**
 * Gửi thông báo qua Telegram
 */
export async function sendTelegramNotification(payload: NotificationPayload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('[TELEGRAM] Error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    throw new Error('Telegram configuration missing on server');
  }

  const message = `
🚀 *Yêu cầu liên hệ mới từ website FCT*
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
👤 *Khách hàng:* ${payload.fullName || 'N/A'}
📧 *Email:* ${payload.email || 'N/A'}
🏢 *Công ty:* ${payload.company || 'N/A'}
🏗️ *Ngành:* ${payload.industry || 'N/A'}
💡 *Giải pháp:* ${payload.solution || 'N/A'}
📊 *Quy mô:* ${payload.projectScale || 'N/A'}
💬 *Lời nhắn:* ${payload.message || 'N/A'}
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
📍 *Nguồn:* ${payload.source || 'Liên hệ trực tiếp'}
🌐 *IP:* ${payload.ip || 'Unknown'}
✅ *Turnstile:* Verified
  `.trim();

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'MarkdownV2',
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    console.error('[TELEGRAM] API Error:', data.description);
    throw new Error(`Telegram Error: ${data.description}`);
  }
  return data;
}

/**
 * Gửi Email qua Resend
 */
export async function sendEmailNotification(payload: NotificationPayload) {
  if (!resend) {
    console.error('[RESEND] Error: Missing RESEND_API_KEY');
    throw new Error('Resend API key missing on server');
  }

  const { data, error } = await resend.emails.send({
    from: 'FCT Website <system@fct.vn>',
    to: CONTACT_EMAIL,
    subject: `[FCT Website] Yêu cầu từ ${payload.fullName || 'Khách hàng'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu liên hệ mới</h2>
        <p><strong>Khách hàng:</strong> ${payload.fullName || 'N/A'}</p>
        <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
        <p><strong>Công ty:</strong> ${payload.company || 'N/A'}</p>
        <p><strong>Ngành:</strong> ${payload.industry || 'N/A'}</p>
        <p><strong>Giải pháp quan tâm:</strong> ${payload.solution || 'N/A'}</p>
        <p><strong>Quy mô dự án:</strong> ${payload.projectScale || 'N/A'}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
          <strong>Yêu cầu chi tiết:</strong><br/>
          ${payload.message || 'Không có yêu cầu chi tiết'}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Nguồn: ${payload.source || 'Liên hệ từ website'} | IP: ${payload.ip || 'Unknown'} | Turnstile: ✅</p>
      </div>
    `,
  });

  if (error) {
    console.error('[RESEND] API Error:', error);
    throw new Error(`Resend Error: ${error.message}`);
  }
  return data;
}
