'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { UserRole } from '@/lib/auth/roles'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

/**
 * Higher-Order Component for protecting client-side routes
 * 
 * Usage:
 * <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
 *   <AdminContent />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!user) {
        router.push(redirectTo)
        return
      }

      // Check role if required
      if (requiredRole && userRole !== requiredRole) {
        // TODO: Implement proper role hierarchy checking
        // For now, redirect to home if role doesn't match
        router.push('/')
      }
    }
  }, [user, userRole, loading, requiredRole, router, redirectTo])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Don't render children until we've verified authentication
  if (!user) {
    return null
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    return null
  }

  return <>{children}</>
}
