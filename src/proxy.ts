import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n-config'

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // 1. ?廕詆 C?CH T廙 CAO CHO BOT (V廙ㄅ 403 v? fix 404)
  // Ch廙?rewrite n廕簑 l? trang web, KH?NG rewrite n廕簑 l? file 廕τh/t藺nh
  const isStaticFile = pathname.startsWith('/images') || pathname.startsWith('/_next') || pathname.includes('.');

  if (/facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Googlebot|bingbot/i.test(userAgent)) {
    if (isStaticFile) {
      return NextResponse.next();
    }

    // N廕簑 bot v?o trang ch廙?g廙 (/) ho廕搾 thi廕簑 locale, rewrite v廙?/vi
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    
    if (pathnameIsMissingLocale) {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = `/vi${pathname}`
      return NextResponse.rewrite(rewriteUrl)
    }
    return NextResponse.next()
  }


  // 2. Lo廕【 tr廙?c獺c t廙 tin t藺nh v? API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 3. X廙?l羸 chuy廙 h廙g /news sang /posts
  if (pathname.includes('/news')) {
    const newPathname = pathname.replace('/news', '/posts')
    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // 4. Ki廙 tra m瓊 ng繫n ng廙?
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale
    // Quay l廕【 d羅ng Redirect (307) cho ng廙 d羅ng th廕負 ?廙??廕σ b廕υ chu廕姊 SEO
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}




