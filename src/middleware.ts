import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n-config'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Loại trừ các tệp tin tĩnh và API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Xử lý chuyển hướng /news sang /posts
  if (pathname.includes('/news')) {
    const newPathname = pathname.replace('/news', '/posts')
    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // 3. Kiểm tra mã ngôn ngữ
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


