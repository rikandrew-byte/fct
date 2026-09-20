import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'andrew@fct.vn';

// Kh廙 t廕︽ Resend instance
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
 * G廙虹 th繫ng b獺o qua Telegram
 */
export async function sendTelegramNotification(payload: NotificationPayload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('[TELEGRAM] Error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    throw new Error('Telegram configuration missing on server');
  }

  const title = payload.source === 'whitepaper' 
    ? '? <b>[C? LEAD M廙 T廕＠ S?CH TR廕奘G]</b>' 
    : payload.source === 'whitepaper-guardsquare'
      ? '? <b>[C? LEAD M廙 T廕＠ S?CH TR廕奘G GUARDSQUARE]</b>'
      : payload.source === 'whitepaper-canary'
        ? '? <b>[C? LEAD M廙 T廕＠ S?CH TR廕奘G CANARY HISTORIAN]</b>'
        : '?? <b>Y礙u c廕吟 li礙n h廙?m廙 t廙?website FCT</b>';

  // Chuy廙 sang ?廙h d廕》g HTML ?廙?廙 ?廙h hn, tr獺nh l廙 k羸 t廙??廕搾 bi廙 c廙吧 Markdown
  const message = `
${title}
---------------------------------------
? <b>Kh獺ch h?ng:</b> ${payload.fullName || 'N/A'}
? <b>Email:</b> ${payload.email || 'N/A'}
? <b>S廙??i廙 tho廕【:</b> ${payload.phone || 'N/A'}
? <b>C繫ng ty:</b> ${payload.company || 'N/A'}
??儭?<b>Ng?nh:</b> ${payload.industry || 'N/A'}
? <b>Gi廕ξ ph獺p:</b> ${payload.solution || 'N/A'}
?? <b>Quy m繫:</b> ${payload.projectScale || 'N/A'}
? <b>L廙 nh廕疸:</b> ${payload.message || 'N/A'}
---------------------------------------
?? <b>Ngu廙:</b> ${payload.source || 'Li礙n h廙?tr廙帷 ti廕穆'}
?? <b>IP:</b> ${payload.ip || 'Unknown'}
??<b>Turnstile:</b> Verified
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
    
    // Log to?n b廙?ph廕τ h廙 ?廙?debug tr礙n Vercel
    if (!data.ok) {
      console.error('[TELEGRAM_FULL_ERROR_LOG]', {
        status: response.status,
        description: data.description,
        error_code: data.error_code,
        parameters: data.parameters
      });
      throw new Error(`Telegram API Error: [${data.error_code}] ${data.description}`);
    }

    return data;
  } catch (err: any) {
    console.error('[TELEGRAM_FETCH_ERROR]', err);
    throw err;
  }
}


/**
 * G廙虹 Email qua Resend
 */
export async function sendEmailNotification(payload: NotificationPayload) {
  if (!resend) {
    console.error('[RESEND] Error: Missing RESEND_API_KEY');
    throw new Error('Resend API key missing on server');
  }

  const { data, error } = await resend.emails.send({
    from: 'FCT Website <system@fct.vn>',
    to: CONTACT_EMAIL,
    subject: `[FCT Website] Y礙u c廕吟 t廙?${payload.fullName || 'Kh獺ch h?ng'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Y礙u c廕吟 li礙n h廙?m廙</h2>
        <p><strong>Kh獺ch h?ng:</strong> ${payload.fullName || 'N/A'}</p>
        <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
        <p><strong>S廙??i廙 tho廕【:</strong> ${payload.phone || 'N/A'}</p>
        <p><strong>C繫ng ty:</strong> ${payload.company || 'N/A'}</p>
        <p><strong>Ng?nh:</strong> ${payload.industry || 'N/A'}</p>
        <p><strong>Gi廕ξ ph獺p quan t璽m:</strong> ${payload.solution || 'N/A'}</p>
        <p><strong>Quy m繫 d廙?獺n:</strong> ${payload.projectScale || 'N/A'}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
          <strong>Y礙u c廕吟 chi ti廕篙:</strong><br/>
          ${payload.message || 'Kh繫ng c籀 y礙u c廕吟 chi ti廕篙'}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Ngu廙: ${payload.source || 'Li礙n h廙?t廙?website'} | IP: ${payload.ip || 'Unknown'} | Turnstile: ??/p>
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
 * G廙虹 Email t廙??廙g g廙虹 link t廕ξ S獺ch tr廕疸g cho Kh獺ch h?ng
 */
export async function sendWhitepaperAutoReply(email: string, fullName: string, source: string = 'whitepaper') {
  if (!resend) return;

  const isGuardsquare = source === 'whitepaper-guardsquare';
  const isCanary = source === 'whitepaper-canary';

  const docTitle = isGuardsquare 
    ? '"B廕υ m廕負 廙盯g d廙叩g Di ?廙g & Ch廙g M瓊 ?廙"' 
    : isCanary
      ? '"T廙 u h籀a d廙?li廙 v廕要 h?nh v廙 Canary Historian"'
      : '"B廕υ v廙?ch廕另 x獺m & T廙 ?a h籀a doanh thu ph廕吵 m廙"';
  
  const docDescription = isGuardsquare
    ? '?璽y l? t?i li廙 chuy礙n s璽u d?nh cho c獺c nh? ph獺t tri廙 廙姊g d廙叩g di ?廙g (Mobile App) v? kh廙 T?i ch穩nh - Ng璽n h?ng nh廕彩 ng?n ch廕搖 k廙?thu廕負 d廙h ng廙θ v? m瓊 ?廙 chi廕禦 quy廙 (Overlay).'
    : isCanary
      ? '?璽y l? t?i li廙 chuy礙n s璽u d?nh cho kh廙 Nh? m獺y v? H廕?t廕吵g OT nh廕彩 gi廕ξ quy廕篙 b?i to獺n lu tr廙?d廙?li廙 t廙 ?廙?cao, b廙孤 ph獺 gi廙 h廕》 SQL truy廙 th廙g v? tr廙帷 quan h籀a h?ng tri廙 ?i廙 d廙?li廙.'
      : '?璽y l? t?i li廙 chuy礙n s璽u d?nh cho c獺c nh? l瓊nh ?廕︽ v? ph獺t tri廙 ph廕吵 m廙 nh廕彩 t廙 u h籀a m繫 h穫nh kinh doanh v? b廕υ v廙?t?i s廕τ tr穩 tu廙?';
    
  const docLink = isGuardsquare
    ? 'https://drive.google.com/file/d/1xiDPxWdLEwfNOoGC_xLWqG3fBknH3U-x/view?usp=sharing'
    : isCanary
      ? 'https://drive.google.com/file/d/18KHNW_gqb8Os2zYrPJuxxUkjkQkD8VB7/view?usp=sharing'
      : 'https://drive.google.com/file/d/1HZqOX7w-DKJGbjqv2kyjqrZ12Y64R-zv/view?usp=sharing';

  await resend.emails.send({
    from: 'FCT V藺nh Th廙h <system@fct.vn>',
    to: email,
    subject: 'C廕σ n b廕》 ?瓊 ??ng k羸 nh廕要 S獺ch tr廕疸g t廙?FCT V藺nh Th廙h',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb;">Ch?o ${fullName},</h2>
        <p>C廕σ n b廕》 ?瓊 quan t璽m ?廕積 t?i li廙 <strong>${docTitle}</strong> c廙吧 FCT V藺nh Th廙h.</p>
        <p>${docDescription}</p>
        <div style="margin: 30px 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="border-radius: 8px;" bgcolor="#2563eb">
                      <a href="${docLink}" 
                         target="_blank" 
                         style="font-size: 16px; font-family: sans-serif; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 8px; border: 1px solid #2563eb; display: inline-block; font-weight: bold;">
                        T廕＠ S?CH TR廕奘G (PDF)
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-top: 20px;">
          Ho廕搾 truy c廕計 tr廙帷 ti廕穆 t廕【 ?廙g d廕南 sau ?廙?t廕ξ t?i li廙: <br/>
          <a href="${docLink}" style="color: #2563eb; word-break: break-all;">
            ${docLink}
          </a>
        </p>
        <p>N廕簑 b廕》 c廕吵 t v廕叩 s璽u hn v廙?gi廕ξ ph獺p b廕υ m廕負 v? c廕叼 ph矇p b廕τ quy廙, ?廙南g ng廕吵 ng廕【 ph廕τ h廙 email n?y ho廕搾 li礙n h廙?hotline: <strong>0904.59.83.46</strong>.</p>
        <p>Tr璽n tr廙g,<br/>?廙 ng觼 FCT V藺nh Th廙h</p>
      </div>
    `,
  });
}
