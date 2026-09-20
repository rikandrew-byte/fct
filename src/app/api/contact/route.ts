import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendTelegramNotification, sendEmailNotification, sendWhitepaperAutoReply } from '@/lib/mail';
import { saveLeadLog } from '@/lib/leads-logger';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request: Request) {
  // ?? T廕吵g 3: Rate Limiting ??????????
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

  const rateLimit = checkRateLimit(ip, { maxRequests: 3, windowMs: 10 * 60 * 1000 });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Qu獺 nhi廙 y礙u c廕吟. Vui l簷ng th廙?l廕【 sau.',
        retryAfter: rateLimit.resetIn 
      },
      { 
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetIn) }
      }
    );
  }

  // ?? Diagnostic Logging (Vercel Logs) ??

  try {
    const body = await request.json();
    const { fullName, email, phone, company, industry, solution, projectScale, message, source, turnstileToken } = body;

    // ?? L廙 ki廙 duy廙 (Server-side validation) ???????????????????
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Vui l簷ng ?i廙 ?廕囤 ?廙?th繫ng tin b廕眩 bu廙.' }, { status: 400 });
    }

    const phoneRegex = /^[0-9+]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, error: 'S廙??i廙 tho廕【 kh繫ng h廙φ l廙? Vui l簷ng ki廙 tra l廕【.' }, { status: 400 });
    }

    // ?? T廕吵g 2: Cloudflare Turnstile Verification ?????????????????
    if (TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json(
          { success: false, error: 'X獺c th廙帷 b廕υ m廕負 th廕另 b廕【. Vui l簷ng t廕ξ l廕【 trang.' },
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
        return NextResponse.json(
          { success: false, error: 'X獺c th廙帷 Bot th廕另 b廕【. B廕》 c籀 ph廕ξ l? ng廙 th廕負 kh繫ng?' },
          { status: 403 }
        );
      }
    } else {
      console.warn('[TURNSTILE] Secret key not configured ??skipping verification');
    }

    // ?? Business Logic: G廙虹 Telegram + Email & Lu Log ??????????
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

    // 1. Lu Lead v?o file log c籀 c廕只 tr繳c (b廕υ to?n d廙?li廙 c廙卉 b廙?
    const savedLead = await saveLeadLog(payload);

    // 2. Ch廕『 song song c獺c t獺c v廙?th繫ng b獺o Telegram & Email
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

    // N廕簑 C廕?HAI ?廙 th廕另 b廕【, tr廕?v廙?l廙 500 (Tr獺nh Silent Failure)
    if (errors.length === 2) {
      return NextResponse.json({ 
        success: false, 
        error: 'H廙?th廙g th繫ng b獺o g廕搆 s廙?c廙? Vui l簷ng th廙?l廕【 ho廕搾 li礙n h廙?tr廙帷 ti廕穆 qua Zalo/Phone.' 
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

