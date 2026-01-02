'use client'

import { useAuth } from '@/components/auth/AuthProvider'

export function useSession() {
  const { user, userRole, loading } = useAuth()
  
  return {
    session: user ? {
      user: {
        id: user.id,
        email: user.email,
        role: userRole,
      }
    } : null,
    loading,
    isAuthenticated: !!user,
    isAdmin: userRole === 'ADMIN' || userRole === 'SUPER_ADMIN',
    isStaff: userRole === 'STAFF' || userRole === 'ADMIN' || userRole === 'SUPER_ADMIN',
  }
}
