'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  FileText,
  BarChart3
} from "lucide-react"
import { toast } from 'sonner'

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard", label: "Dashboard Avançado", icon: BarChart3 },
  { href: "/admin/relatorios", label: "Relatórios", icon: FileText },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/utilizadores", label: "Utilizadores", icon: Users },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings }
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/admin-logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        toast.success('Sessão terminada')
        router.push('/admin/login')
        router.refresh()
      } else {
        toast.error('Erro ao terminar sessão')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Erro ao terminar sessão')
    }
  }
  
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="px-6 py-8">
        <div className="text-2xl font-bold text-green-600">
          🌾 AgriConecta
        </div>
        <p className="text-sm text-gray-500 mt-1">Painel Admin</p>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
                           (item.href !== '/admin' && pathname?.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-green-50 text-green-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="px-4 py-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Terminar Sessão
        </button>
      </div>
    </aside>
  )
}