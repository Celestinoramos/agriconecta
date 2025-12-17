import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Package, Phone, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { obterPedidoPorId } from '@/lib/db/pedidos';
import { parseEnderecoEntrega, EstadoPedido } from '@/types/pedido';
import TrackingTimeline from '@/components/rastreio/TrackingTimeline';
import TrackingStatus from '@/components/rastreio/TrackingStatus';
import OrderDetails from '@/components/rastreio/OrderDetails';
import DeliveryAddress from '@/components/rastreio/DeliveryAddress';
import PaymentInfo from '@/components/rastreio/PaymentInfo';

export const metadata: Metadata = {
  title: 'Rastreio do Pedido | AgriConecta',
  description: 'Acompanhe o estado do seu pedido no AgriConecta',
  robots: 'noindex',
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
  const estadoActual = pedido.estado as EstadoPedido;
  const estadoActualHistorico = pedido.estadoHistorico.find(h => h.estado === estadoActual);

  // WhatsApp link with pre-filled message
  const WHATSAPP_NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_SUPORTE || '244937321982';
  const mensagemWhatsApp = `Olá! Tenho uma dúvida sobre o meu pedido ${pedido.numero}.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagemWhatsApp)}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Package className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Pedido {pedido.numero}</h1>
              <p className="text-green-100 text-sm">
                Criado em {new Date(pedido.criadoEm).toLocaleDateString('pt-AO', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Current Status - Prominent Display */}
          <TrackingStatus 
            estado={estadoActual} 
            nota={estadoActualHistorico?.nota || undefined}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timeline and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timeline */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Histórico do Pedido</h2>
                  <TrackingTimeline
                    estadoActual={estadoActual}
                    estadoHistorico={pedido.estadoHistorico.map(h => ({
                      estado: h.estado as EstadoPedido,
                      criadoEm: h.criadoEm,
                      nota: h.nota,
                    }))}
                  />
                </CardContent>
              </Card>

              {/* Order Details */}
              <OrderDetails
                itens={pedido.itens.map(item => ({
                  id: item.id,
                  produtoNome: item.produtoNome,
                  produtoImagem: item.produtoImagem,
                  produtoUnidade: item.produtoUnidade,
                  quantidade: item.quantidade,
                  produtoPreco: Number(item.produtoPreco),
                  subtotal: Number(item.subtotal),
                }))}
                subtotal={Number(pedido.subtotal)}
                taxaEntrega={Number(pedido.taxaEntrega)}
                desconto={Number(pedido.desconto)}
                total={Number(pedido.total)}
                metodoPagamento={pedido.metodoPagamento}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Payment Info - Only if PENDENTE */}
              {estadoActual === 'PENDENTE' && (
                <PaymentInfo
                  total={Number(pedido.total)}
                  numeroPedido={pedido.numero}
                  pedidoId={pedido.id}
                />
              )}

              {/* Delivery Address */}
              <DeliveryAddress
                clienteNome={pedido.clienteNome}
                rua={enderecoEntrega.rua}
                bairro={enderecoEntrega.bairro}
                municipio={enderecoEntrega.municipio}
                provincia={enderecoEntrega.provincia}
                referencia={enderecoEntrega.referencia}
              />

              {/* Invoice Download - Only if generated */}
              {pedido.faturaUrl && (
                <Card>
                  <CardContent className="p-4">
                    <Button asChild variant="outline" className="w-full">
                      <a href={pedido.faturaUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Descarregar Fatura
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* WhatsApp Contact */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm flex-1">
                      <p className="font-medium text-green-900 mb-1">Dúvidas sobre o pedido?</p>
                      <p className="text-green-700 text-xs mb-3">
                        Entre em contacto connosco via WhatsApp
                      </p>
                      <Button asChild size="sm" className="w-full">
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💬 WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Actions */}
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
