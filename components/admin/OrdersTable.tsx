'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye } from 'lucide-react'

interface Order {
  id: string
  numero: string
  clienteNome: string
  total: number
  estado: string
  criadoEm: Date
}

interface OrdersTableProps {
  orders: Order[]
}

const estadoColors: Record<string, string> = {
  PENDENTE: 'bg-yellow-100 text-yellow-800',
  PAGO: 'bg-blue-100 text-blue-800',
  EM_PREPARACAO: 'bg-purple-100 text-purple-800',
  EM_TRANSITO: 'bg-indigo-100 text-indigo-800',
  ENTREGUE: 'bg-green-100 text-green-800',
  CANCELADO: 'bg-red-100 text-red-800',
}

const estadoLabels: Record<string, string> = {
  PENDENTE: 'Pendente',
  PAGO: 'Pago',
  EM_PREPARACAO: 'Em Preparação',
  EM_TRANSITO: 'Em Trânsito',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum pedido encontrado
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acções
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/pedidos/${order.id}`}
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {order.numero}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.clienteNome}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {order.total.toLocaleString('pt-AO')} Kz
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    estadoColors[order.estado] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {estadoLabels[order.estado] || order.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDistanceToNow(new Date(order.criadoEm), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/admin/pedidos/${order.id}`}
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <Eye className="w-4 h-4" />
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
