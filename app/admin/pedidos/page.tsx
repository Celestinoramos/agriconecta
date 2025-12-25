'use client'

import { OrdersTable } from '@/components/admin/OrdersTable'
import { useEffect, useState } from 'react'

/**
 * Orders Management Page
 * 
 * Lists all orders with filtering and pagination
 */
export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [estado, setEstado] = useState('')
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    // TODO: Fetch orders from API
    // For now, just set empty array
    setOrders([])
    setLoading(false)
  }, [estado, pagina])

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
        <p className="text-gray-600 mt-2">
          Visualize e gerencie todos os pedidos
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value)
              setPagina(1)
            }}
          >
            <option value="">Todos os estados</option>
            <option value="PENDENTE">Pendente</option>
            <option value="PAGO">Pago</option>
            <option value="EM_PREPARACAO">Em Preparação</option>
            <option value="EM_TRANSITO">Em Trânsito</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
          </select>

          <input
            type="search"
            placeholder="Pesquisar por número ou cliente..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border">
        <OrdersTable orders={orders} />
      </div>
    </div>
  )
}
