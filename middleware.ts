import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for additional request processing
// Security headers are configured in next.config.js
// The request parameter is available for future enhancements like authentication checks
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // Additional middleware logic can be added here
  // Example: authentication, rate limiting, redirects, etc.
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
