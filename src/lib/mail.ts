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

  const isWhitepaper = payload.source === 'whitepaper';
  const title = isWhitepaper ? '🎯 <b>[CÓ LEAD MỚI TẢI SÁCH TRẮNG]</b>' : '🚀 <b>Yêu cầu liên hệ mới từ website FCT</b>';

  // Chuyển sang định dạng HTML để ổn định hơn, tránh lỗi ký tự đặc biệt của Markdown
  const message = `
${title}
---------------------------------------
👤 <b>Khách hàng:</b> ${payload.fullName || 'N/A'}
📧 <b>Email:</b> ${payload.email || 'N/A'}
📱 <b>Số điện thoại:</b> ${payload.phone || 'N/A'}
🏢 <b>Công ty:</b> ${payload.company || 'N/A'}
🏗️ <b>Ngành:</b> ${payload.industry || 'N/A'}
💡 <b>Giải pháp:</b> ${payload.solution || 'N/A'}
📊 <b>Quy mô:</b> ${payload.projectScale || 'N/A'}
💬 <b>Lời nhắn:</b> ${payload.message || 'N/A'}
---------------------------------------
📍 <b>Nguồn:</b> ${payload.source || 'Liên hệ trực tiếp'}
🌐 <b>IP:</b> ${payload.ip || 'Unknown'}
✅ <b>Turnstile:</b> Verified
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    
    // Log toàn bộ phản hồi để debug trên Vercel
    if (!data.ok) {
      console.error('[TELEGRAM_FULL_ERROR_LOG]', {
        status: response.status,
        description: data.description,
        error_code: data.error_code,
        parameters: data.parameters
      });
      throw new Error(`Telegram API Error: [${data.error_code}] ${data.description}`);
    }

    console.log('[TELEGRAM] Notification sent successfully');
    return data;
  } catch (err: any) {
    console.error('[TELEGRAM_FETCH_ERROR]', err);
    throw err;
  }
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
        <p><strong>Số điện thoại:</strong> ${payload.phone || 'N/A'}</p>
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

/**
 * Gửi Email tự động gửi link tải Sách trắng cho Khách hàng
 */
export async function sendWhitepaperAutoReply(email: string, fullName: string) {
  if (!resend) return;

  await resend.emails.send({
    from: 'FCT Vĩnh Thịnh <system@fct.vn>',
    to: email,
    subject: 'Cảm ơn bạn đã đăng ký nhận Sách trắng từ FCT Vĩnh Thịnh',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb;">Chào ${fullName},</h2>
        <p>Cảm ơn bạn đã quan tâm đến tài liệu <strong>"Bảo vệ chất xám & Tối đa hóa doanh thu phần mềm"</strong> của FCT Vĩnh Thịnh.</p>
        <p>Đây là tài liệu chuyên sâu dành cho các nhà lãnh đạo và phát triển phần mềm nhằm tối ưu hóa mô hình kinh doanh và bảo vệ tài sản trí tuệ.</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://drive.google.com/file/d/example-whitepaper-link/view" 
             style="background-color: #2563eb; color: white; padding: 15px 25px; text-decoration: none; rounded: 8px; font-weight: bold; display: inline-block;">
             TẢI SÁCH TRẮNG (PDF)
          </a>
        </div>
        <p>Nếu bạn cần tư vấn sâu hơn về giải pháp bảo mật và cấp phép bản quyền, đừng ngần ngại phản hồi email này hoặc liên hệ hotline: <strong>0904.59.83.46</strong>.</p>
        <p>Trân trọng,<br/>Đội ngũ FCT Vĩnh Thịnh</p>
      </div>
    `,
  });
}
