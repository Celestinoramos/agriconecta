import { Sidebar } from '@/components/admin/Sidebar'

/**
 * Admin Layout
 * 
 * Wraps all admin pages with sidebar navigation.
 * TODO: Add authentication check and role verification
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check if user is authenticated and has STAFF+ role
  // For now, allow access (will be properly protected in middleware)
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
