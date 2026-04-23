import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Khởi tạo lười ?�?tránh lỗi Build khi thiếu API Key
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

export async function POST(request: Request) {
  console.log('--- CONTACT API CALLED ---');
  console.log('TELEGRAM_BOT_TOKEN exists:', !!TELEGRAM_BOT_TOKEN);
  console.log('TELEGRAM_CHAT_ID exists:', !!TELEGRAM_CHAT_ID);
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    console.log('Request body:', body);
    const { fullName, email, phone, company, industry, solution, projectScale, message, source } = body;

    // 1. Send to Telegram
    const telegramMessage = `
?? *Yêu cầu liên h�?mới t�?website FCT*
---------------------------------------
?�� *Khách h?ng:* ${fullName || 'N/A'}
?�� *Email:* ${email || 'N/A'}
?�� *S�??iện thoại:* ${phone || 'N/A'}
?�� *Công ty:* ${company || 'N/A'}
??�?*Ng?nh:* ${industry || 'N/A'}
?�� *Giải pháp:* ${solution || 'N/A'}
?? *Quy mô:* ${projectScale || 'N/A'}
?�� *Lời nhắn:* ${message || 'N/A'}
---------------------------------------
?? *Nguồn:* ${source || 'Liên h�?trực tiếp'}
`;

    // 1. Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
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
      console.log('Telegram response:', tgData);
    } else {
      console.log('Skipping Telegram: Missing token or chat ID');
    }

    // 2. Send Email via Resend
    const resendInstance = getResend();
    if (resendInstance) {
      const emailRes = await resendInstance.emails.send({
        from: 'FCT Website <system@fct.vn>',
        to: CONTACT_EMAIL,
        subject: `[FCT Website] Yêu cầu t�?${fullName || 'Khách h?ng'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu liên h�?mới</h2>
            <p><strong>Khách h?ng:</strong> ${fullName || 'N/A'}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>S�??iện thoại:</strong> ${phone || 'N/A'}</p>
            <p><strong>Công ty:</strong> ${company || 'N/A'}</p>
            <p><strong>Ng?nh:</strong> ${industry || 'N/A'}</p>
            <p><strong>Giải pháp quan tâm:</strong> ${solution || 'N/A'}</p>
            <p><strong>Quy mô d�?án:</strong> ${projectScale || 'N/A'}</p>
            <div style="margin-top: 20px; padding: 15px; bg-color: #f8fafc; border-radius: 8px;">
              <strong>Yêu cầu chi tiết:</strong><br/>
              ${message || 'Không có yêu cầu chi tiết'}
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Nguồn: ${source || 'Liên h�?t�?website'}</p>
          </div>
        `,
      });
      console.log('Resend response:', emailRes);
    } else {
      console.log('Skipping Email: Missing Resend API Key');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
