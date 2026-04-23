import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // 0. Bypassing Social Media Crawlers to avoid 403 errors
  if (
    userAgent.includes('facebookexternalhit') || 
    userAgent.includes('LinkedInBot') || 
    userAgent.includes('Twitterbot')
  ) {
    return NextResponse.next()
  }

  // 1. Handle legacy /news to /posts redirection
  if (pathname.includes('/news/')) {
    const newPathname = pathname.replace('/news/', '/posts/')
    return NextResponse.redirect(new URL(newPathname, request.url))
  }
  if (pathname.endsWith('/news')) {
     const newPathname = pathname.replace('/news', '/posts')
     return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // 2. Exclude public files and images
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/logo.webp',
      '/og-image.webp',
      '/icon.png',
      '/sentinelLDK1.webp',
      '/robots.txt',
      '/sitemap.xml',
    ].includes(pathname) ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return
  }

  // 3. Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 4. Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
}
