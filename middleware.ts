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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const { supabaseResponse, user } = await updateSession(request)
  
  if (isPublicRoute(pathname)) {
    return supabaseResponse
  }
  
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  if (isAdminRoute(pathname)) {
    return supabaseResponse
  }
  
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}