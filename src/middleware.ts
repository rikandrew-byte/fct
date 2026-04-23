import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n-config'

// Regex nhận diện tất cả Bot crawler phổ biến
// Facebook: facebookexternalhit, Facebot | Twitter/X: Twitterbot
// LinkedIn: LinkedInBot | Google: Googlebot | Bing: bingbot
// Telegram, WhatsApp, Discord, Slack, Pinterest, Kakao, Naver
const BOT_USER_AGENTS = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Googlebot|bingbot|TelegramBot|WhatsApp|Discordbot|Slackbot|PinterestBot|kakaotalk-scrap|Yeti\//i

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // 1. ĐẶC CÁCH CHO BOT: Cho phép mọi bot/crawler đi thẳng
  //    KHÔNG qua bất kỳ bộ lọc i18n, redirect, hay logic nào khác.
  //    Điều này ngăn chặn lỗi 403/redirect loop khi bot quét OG meta.
  if (BOT_USER_AGENTS.test(userAgent)) {
    return NextResponse.next()
  }

  // 2. Loại trừ các tệp tin tĩnh và API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 3. Xử lý chuyển hướng /news sang /posts
  if (pathname.includes('/news')) {
    const newPathname = pathname.replace('/news', '/posts')
    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // 4. Kiểm tra mã ngôn ngữ
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Luôn mặc định về 'vi' nếu không xác định được
    return NextResponse.redirect(
      new URL(`/vi${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  // Nhận mọi yêu cầu để Middleware tự xử lý logic loại trừ
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

