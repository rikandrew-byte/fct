import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n-config'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // 1. ĐẶC CÁCH TỐI CAO CHO BOT (Vượt 403 và fix 404)
  // Chỉ rewrite nếu là trang web, KHÔNG rewrite nếu là file ảnh/tĩnh
  const isStaticFile = pathname.startsWith('/images') || pathname.startsWith('/_next') || pathname.includes('.');

  if (/facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Googlebot|bingbot/i.test(userAgent)) {
    if (isStaticFile) {
      return NextResponse.next();
    }

    // Nếu bot vào trang chủ gốc (/) hoặc thiếu locale, rewrite về /vi
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
    const locale = i18n.defaultLocale
    // Quay lại dùng Redirect (307) cho người dùng thật để đảm bảo chuẩn SEO
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}




