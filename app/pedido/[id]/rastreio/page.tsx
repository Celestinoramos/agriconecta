import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Package, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { obterPedidoPorId } from '@/lib/db/pedidos';
import { formatarPreco } from '@/lib/cart';
import { parseEnderecoEntrega, EstadoPedido } from '@/types/pedido';
import TrackingTimeline from '@/components/rastreio/TrackingTimeline';

export const metadata: Metadata = {
  title: 'Rastreio do Pedido - AgriConecta',
  description: 'Acompanhe o estado do seu pedido',
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function RastreioPage({ params }: PageProps) {
  const pedido = await obterPedidoPorId(params.id);

  if (!pedido) {
    notFound();
  }

  const enderecoEntrega = parseEnderecoEntrega(pedido.enderecoEntrega);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Rastreio do Pedido</h1>
              <p className="text-green-100 text-sm">{pedido.numero}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Estado do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrackingTimeline
                    estadoActual={pedido.estado as EstadoPedido}
                    estadoHistorico={pedido.estadoHistorico.map(h => ({
                      estado: h.estado as EstadoPedido,
                      criadoEm: h.criadoEm,
                      nota: h.nota,
                    }))}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Número do Pedido</p>
                    <p className="font-semibold">{pedido.numero}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total</p>
                    <p className="font-semibold text-green-600">
                      {formatarPreco(Number(pedido.total))}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Data do Pedido</p>
                    <p className="font-semibold">
                      {new Date(pedido.criadoEm).toLocaleDateString('pt-AO')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Método de Pagamento</p>
                    <p className="font-semibold">Transferência Bancária</p>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p className="font-medium">{pedido.clienteNome}</p>
                  <p>{enderecoEntrega.rua}</p>
                  <p>{enderecoEntrega.bairro}</p>
                  <p>{enderecoEntrega.municipio}, {enderecoEntrega.provincia}</p>
                  {enderecoEntrega.referencia && (
                    <p className="text-gray-600 text-xs mt-2">
                      Ref: {enderecoEntrega.referencia}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Items Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pedido.itens.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      {item.produtoImagem && (
                        <div className="relative w-12 h-12 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                          <Image
                            src={item.produtoImagem}
                            alt={item.produtoNome}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.produtoNome}</p>
                        <p className="text-xs text-gray-600">
                          Qtd: {item.quantidade}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900 mb-1">Dúvidas sobre o pedido?</p>
                      <p className="text-green-700 text-xs mb-2">
                        Entre em contacto connosco via WhatsApp
                      </p>
                      <Button asChild size="sm" variant="outline" className="text-xs">
                        <a
                          href="https://wa.me/244923456789"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Contactar Suporte
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/pedido/${pedido.id}`}>
                    Ver Detalhes Completos
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/">Voltar para Início</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
