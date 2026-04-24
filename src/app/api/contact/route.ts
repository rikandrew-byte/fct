import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

// Khởi tạo lười để tránh lỗi Build khi thiếu API Key
let resend: Resend | null = null;
const getResend = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'andrew@fct.vn';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request: Request) {
  // ── Tầng 3: Rate Limiting (3 requests / 10 phút / IP) ──────────
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

  const rateLimit = checkRateLimit(ip, { maxRequests: 3, windowMs: 10 * 60 * 1000 });

  if (!rateLimit.allowed) {
    console.log(`[RATE_LIMIT] Blocked IP: ${ip}, reset in ${rateLimit.resetIn}s`);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
        retryAfter: rateLimit.resetIn 
      },
      { 
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetIn) }
      }
    );
  }

  try {
    const body = await request.json();
    const { fullName, email, phone, company, industry, solution, projectScale, message, source, turnstileToken } = body;

    // ── Tầng 2: Cloudflare Turnstile Verification ─────────────────
    if (TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        console.log('[TURNSTILE] Missing token from client');
        return NextResponse.json(
          { success: false, error: 'Xác thực bảo mật thất bại. Vui lòng tải lại trang.' },
          { status: 403 }
        );
      }

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip,
        }),
      });

      const verifyData = await verifyRes.json();
      console.log('[TURNSTILE] Verification result:', verifyData.success);

      if (!verifyData.success) {
        console.log('[TURNSTILE] Failed verification:', verifyData['error-codes']);
        return NextResponse.json(
          { success: false, error: 'Xác thực Bot thất bại. Bạn có phải là người thật không?' },
          { status: 403 }
        );
      }
    } else {
      console.log('[TURNSTILE] Secret key not configured — skipping verification');
    }

    // ── Business Logic: Gửi Telegram + Email ──────────────────────
    const telegramMessage = `
🚀 *Yêu cầu liên hệ mới từ website FCT*
---------------------------------------
👤 *Khách hàng:* ${fullName || 'N/A'}
📧 *Email:* ${email || 'N/A'}
📱 *Số điện thoại:* ${phone || 'N/A'}
🏢 *Công ty:* ${company || 'N/A'}
🏗️ *Ngành:* ${industry || 'N/A'}
💡 *Giải pháp:* ${solution || 'N/A'}
📊 *Quy mô:* ${projectScale || 'N/A'}
💬 *Lời nhắn:* ${message || 'N/A'}
---------------------------------------
📍 *Nguồn:* ${source || 'Liên hệ trực tiếp'}
🌐 *IP:* ${ip}
✅ *Turnstile:* Verified
`;

    // 1. Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      console.log('[TELEGRAM] Sending to Chat ID:', TELEGRAM_CHAT_ID);
      const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });
      const tgData = await tgRes.json();
      if (!tgData.ok) {
        console.error('[TELEGRAM] Failed to send message:', tgData.description);
      } else {
        console.log('[TELEGRAM] Message sent successfully!');
      }
    } else {
      console.warn('[TELEGRAM] Skipping: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID on Server');
    }

    // 2. Send Email via Resend
    const resendInstance = getResend();
    if (resendInstance) {
      const emailRes = await resendInstance.emails.send({
        from: 'FCT Website <system@fct.vn>',
        to: CONTACT_EMAIL,
        subject: `[FCT Website] Yêu cầu từ ${fullName || 'Khách hàng'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu liên hệ mới</h2>
            <p><strong>Khách hàng:</strong> ${fullName || 'N/A'}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Số điện thoại:</strong> ${phone || 'N/A'}</p>
            <p><strong>Công ty:</strong> ${company || 'N/A'}</p>
            <p><strong>Ngành:</strong> ${industry || 'N/A'}</p>
            <p><strong>Giải pháp quan tâm:</strong> ${solution || 'N/A'}</p>
            <p><strong>Quy mô dự án:</strong> ${projectScale || 'N/A'}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
              <strong>Yêu cầu chi tiết:</strong><br/>
              ${message || 'Không có yêu cầu chi tiết'}
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Nguồn: ${source || 'Liên hệ từ website'} | IP: ${ip} | Turnstile: ✅</p>
          </div>
        `,
      });
      console.log('Resend response:', emailRes);
    } else {
      console.log('Skipping Email: Missing Resend API Key');
    }

    return NextResponse.json({ 
      success: true,
      rateLimit: { remaining: rateLimit.remaining, resetIn: rateLimit.resetIn }
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
