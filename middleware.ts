import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

const publicRoutes = [
  '/',
  '/produtos',
  '/rastreio',
  '/servicos',
  '/sobre',
  '/contacto',
  '/faq',
  '/termos',
  '/privacidade',
  '/login',
  '/registar',
  '/recuperar-password',
  '/reset-password',
  '/offline',
  '/auth/callback',
]

const adminRoutes = ['/admin']

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    return pathname === route || pathname.startsWith(route + '/')
  })
}

function isAdminRoute(pathname: string): boolean {
  return adminRoutes.some(route => pathname.startsWith(route))
}

async function checkAdminSession(request: NextRequest): Promise<boolean> {
  try {
    const sessionCookie = request.cookies.get('admin-session')
    if (!sessionCookie?.value) {
      return false
    }
    const session = JSON.parse(sessionCookie.value)
    return !!(session && session.id && (session.role === 'ADMIN' || session.role === 'SUPER_ADMIN'))
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check admin routes first
  if (isAdminRoute(pathname)) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Check admin session for all other admin routes
    const hasAdminSession = await checkAdminSession(request)
    if (!hasAdminSession) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    return NextResponse.next()
  }
  
  const { supabaseResponse, user } = await updateSession(request)
  
  if (isPublicRoute(pathname)) {
    return supabaseResponse
  }
  
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}