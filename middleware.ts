import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/produtos',
  '/produtos/[slug]',
  '/rastreio',
  '/rastreio/[codigo]',
  '/servicos',
  '/sobre',
  '/contacto',
  '/faq',
  '/termos',
  '/privacidade',
  '/login',
  '/offline',
]

// Protected routes requiring authentication
const protectedRoutes = [
  '/carrinho',
  '/checkout',
  '/pedido',
  '/minha-conta',
]

// Admin routes requiring STAFF or higher
const adminRoutes = [
  '/admin',
]

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    // Exact match or pattern match for dynamic routes
    if (route.includes('[')) {
      const pattern = route.replace(/\[.*?\]/g, '[^/]+')
      return new RegExp(`^${pattern}$`).test(pathname)
    }
    return pathname === route || pathname.startsWith(route + '/')
  })
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route))
}

function isAdminRoute(pathname: string): boolean {
  return adminRoutes.some(route => pathname.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Update session using Supabase middleware
  let response = await updateSession(request)
  
  // Skip auth check for public routes
  if (isPublicRoute(pathname)) {
    return response
  }
  
  // For protected routes, check if user is authenticated
  // TODO: Implement full authentication check when Supabase is configured
  if (isProtectedRoute(pathname)) {
    // For now, allow access (will be properly implemented in Phase 2)
    return response
  }
  
  // For admin routes, check if user has appropriate role
  // TODO: Implement role-based access control when auth is fully set up
  if (isAdminRoute(pathname)) {
    // For now, allow access (will be properly implemented in Phase 2)
    return response
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg).*)',
  ],
}