import { OrdersTable } from '@/components/admin/OrdersTable'
import prisma from '@/lib/prisma'

/**
 * Orders Management Page
 * 
 * Lists all orders with filtering and pagination
 */
export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: { estado?: string; pagina?: string }
}) {
  const estado = searchParams.estado
  const pagina = parseInt(searchParams.pagina || '1', 10)
  const limite = 20

  // Fetch orders from database
  const orders = await prisma.pedido.findMany({
    where: estado ? { estado } : undefined,
    orderBy: { criadoEm: 'desc' },
    take: limite,
    skip: (pagina - 1) * limite,
    select: {
      id: true,
      numero: true,
      clienteNome: true,
      total: true,
      estado: true,
      criadoEm: true,
    },
  })

  const totalOrders = await prisma.pedido.count({
    where: estado ? { estado } : undefined,
  })

  const totalPages = Math.ceil(totalOrders / limite)

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
            defaultValue={estado || ''}
            onChange={(e) => {
              const url = new URL(window.location.href)
              if (e.target.value) {
                url.searchParams.set('estado', e.target.value)
              } else {
                url.searchParams.delete('estado')
              }
              url.searchParams.set('pagina', '1')
              window.location.href = url.toString()
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?${new URLSearchParams({ 
                ...(estado && { estado }), 
                pagina: page.toString() 
              })}`}
              className={`px-4 py-2 rounded-lg ${
                page === pagina
                  ? 'bg-green-600 text-white'
                  : 'bg-white border hover:bg-gray-50'
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
