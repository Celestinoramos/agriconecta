import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * Order Detail Page
 * 
 * Shows complete order information with timeline
 */
export default async function AdminPedidoDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const pedido = await prisma.pedido.findUnique({
    where: { id: params.id },
    include: {
      itens: true,
      estadoHistorico: {
        orderBy: { criadoEm: 'desc' },
      },
    },
  })

  if (!pedido) {
    notFound()
  }

  const endereco = JSON.parse(pedido.enderecoEntrega)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/pedidos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos pedidos
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Pedido {pedido.numero}
            </h1>
            <p className="text-gray-600 mt-2">
              Criado em {format(pedido.criadoEm, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
          <div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
              {pedido.estado}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Itens do Pedido</h2>
            <div className="divide-y">
              {pedido.itens.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.produtoNome}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantidade} × {item.produtoPreco.toLocaleString('pt-AO')} Kz
                      </p>
                    </div>
                    <div className="text-right font-medium">
                      {item.subtotal.toLocaleString('pt-AO')} Kz
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{pedido.subtotal.toLocaleString('pt-AO')} Kz</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de Entrega</span>
                <span>{pedido.taxaEntrega.toLocaleString('pt-AO')} Kz</span>
              </div>
              {pedido.desconto > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-{pedido.desconto.toLocaleString('pt-AO')} Kz</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>{pedido.total.toLocaleString('pt-AO')} Kz</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Histórico do Pedido</h2>
            <div className="space-y-4">
              {pedido.estadoHistorico.map((historico, index) => (
                <div key={historico.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    {index < pedido.estadoHistorico.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium">{historico.estado}</p>
                    <p className="text-sm text-gray-600">
                      {format(historico.criadoEm, "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                    {historico.nota && (
                      <p className="text-sm text-gray-600 mt-1">{historico.nota}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Informações do Cliente</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Nome</p>
                <p className="font-medium">{pedido.clienteNome}</p>
              </div>
              {pedido.clienteEmail && (
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{pedido.clienteEmail}</p>
                </div>
              )}
              <div>
                <p className="text-gray-600">Telefone</p>
                <p className="font-medium">{pedido.clienteTelefone}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Endereço de Entrega</h2>
            <div className="text-sm space-y-1">
              <p>{endereco.rua}</p>
              <p>{endereco.bairro}</p>
              <p>{endereco.municipio}, {endereco.provincia}</p>
              {endereco.referencia && (
                <p className="text-gray-600 mt-2">Ref: {endereco.referencia}</p>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Pagamento</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Método</p>
                <p className="font-medium">{pedido.metodoPagamento}</p>
              </div>
              {pedido.referenciaPagamento && (
                <div>
                  <p className="text-gray-600">Referência</p>
                  <p className="font-medium">{pedido.referenciaPagamento}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Acções</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Actualizar Estado
              </button>
              <button className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50">
                Imprimir Fatura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
