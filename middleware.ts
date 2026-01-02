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
  '/admin/login', // Página de login admin é pública
]

function isPublicRoute(pathname: string): boolean {
  // Exact match for public routes
  if (publicRoutes.includes(pathname)) {
    return true
  }
  // Check if pathname starts with a public route (for dynamic routes)
  return publicRoutes.some(route => {
    if (route === '/admin/login') return pathname === '/admin/login'
    return pathname.startsWith(route + '/')
  })
}

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') && pathname !== '/admin/login'
}

function getAdminSessionFromCookie(request: NextRequest): { id: string; role: string } | null {
  try {
    const sessionCookie = request.cookies.get('admin-session')
    if (!sessionCookie?.value) {
      return null
    }
    const session = JSON.parse(sessionCookie.value)
    if (!session || typeof session.id !== 'string' || typeof session.role !== 'string') {
      return null
    }
    return session
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // ADMIN ROUTES - Check admin session first
  if (isAdminRoute(pathname)) {
    const adminSession = getAdminSessionFromCookie(request)
    
    // No session or invalid role -> redirect to admin login
    if (!adminSession || (adminSession.role !== 'ADMIN' && adminSession.role !== 'SUPER_ADMIN')) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Valid admin session, allow access
    return NextResponse.next()
  }
  
  // PUBLIC ROUTES - Allow access
  if (isPublicRoute(pathname)) {
    // For non-admin public routes, still update Supabase session
    if (!pathname.startsWith('/admin')) {
      const { supabaseResponse } = await updateSession(request)
      return supabaseResponse
    }
    return NextResponse.next()
  }
  
  // PROTECTED ROUTES (user area) - Check Supabase auth
  const { supabaseResponse, user } = await updateSession(request)
  
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