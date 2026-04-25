import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendTelegramNotification, sendEmailNotification, sendWhitepaperAutoReply } from '@/lib/mail';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request: Request) {
  // ── Tầng 3: Rate Limiting ──────────
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

  // ── Diagnostic Logging (Vercel Logs) ──
  console.log('[CONFIG_CHECK] Checking environment variables...');
  console.log(`- RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'Present (OK)' : 'MISSING ❌'}`);
  console.log(`- TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? 'Present (OK)' : 'MISSING ❌'}`);
  console.log(`- TURNSTILE_SECRET_KEY: ${process.env.TURNSTILE_SECRET_KEY ? 'Present (OK)' : 'MISSING ❌'}`);

  try {
    const body = await request.json();
    const { fullName, email, phone, company, industry, solution, projectScale, message, source, turnstileToken } = body;

    // ── Lớp kiểm duyệt (Server-side validation) ───────────────────
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 });
    }

    const phoneRegex = /^[0-9+]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, error: 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.' }, { status: 400 });
    }

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
      if (!verifyData.success) {
        console.log('[TURNSTILE] Failed verification:', verifyData['error-codes']);
        return NextResponse.json(
          { success: false, error: 'Xác thực Bot thất bại. Bạn có phải là người thật không?' },
          { status: 403 }
        );
      }
      console.log('[TURNSTILE] Verified successfully');
    } else {
      console.warn('[TURNSTILE] Secret key not configured — skipping verification');
    }

    // ── Business Logic: Gửi Telegram + Email ──────────────────────
    const payload = {
      fullName,
      email,
      phone,
      company,
      industry,
      solution,
      projectScale,
      message,
      source,
      ip
    };

    // Chạy song song cả 2 tác vụ thông báo
    const results = await Promise.allSettled([
      sendTelegramNotification(payload),
      sendEmailNotification(payload),
      ...((source === 'whitepaper' || source === 'whitepaper-guardsquare' || source === 'whitepaper-canary') ? [sendWhitepaperAutoReply(email, fullName, source)] : [])
    ]);

    const errors: string[] = [];
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const provider = index === 0 ? 'Telegram' : 'Email';
        console.error(`[NOTIFICATION_ERROR] ${provider} failed:`, result.reason);
        errors.push(`${provider} failed`);
      }
    });

    // Nếu CẢ HAI đều thất bại, trả về lỗi 500 (Tránh Silent Failure)
    if (errors.length === 2) {
      return NextResponse.json({ 
        success: false, 
        error: 'Hệ thống thông báo gặp sự cố. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Phone.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      partialFailure: errors.length > 0 ? errors : undefined,
      rateLimit: { remaining: rateLimit.remaining, resetIn: rateLimit.resetIn }
    });
  } catch (error: any) {
    console.error('[API_ERROR] Contact Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

