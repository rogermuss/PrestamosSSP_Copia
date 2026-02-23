import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('user_session')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // Si no hay sesión y no está en la página de login, redirigir a login
  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si hay sesión y está en la página de login, redirigir a home
  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
