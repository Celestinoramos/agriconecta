import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, Download, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { obterPedidoPorId } from '@/lib/db/pedidos';
import { formatarPreco } from '@/lib/cart';
import { gerarQRCodePagamento } from '@/lib/qrcode';
import { parseEnderecoEntrega } from '@/types/pedido';
import PaymentInstructions from '@/components/checkout/PaymentInstructions';
import UploadComprovativo from '@/components/checkout/UploadComprovativo';

export const metadata: Metadata = {
  title: 'Confirmação do Pedido - AgriConecta',
  description: 'Detalhes e confirmação do seu pedido',
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PedidoPage({ params }: PageProps) {
  const pedido = await obterPedidoPorId(params.id);

  if (!pedido) {
    notFound();
  }

  // Generate QR Code for payment
  let qrCodeUrl: string | undefined;
  try {
    qrCodeUrl = await gerarQRCodePagamento({
      banco: process.env.NEXT_PUBLIC_BANCO_NOME || 'BFA - Banco de Fomento Angola',
      iban: process.env.NEXT_PUBLIC_BANCO_IBAN || 'AO06000000000000000000000',
      valor: Number(pedido.total),
      referencia: pedido.numero,
    });
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
  }

  const enderecoEntrega = parseEnderecoEntrega(pedido.enderecoEntrega);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <section className="bg-green-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Pedido Realizado com Sucesso!</h1>
          <p className="text-green-100 text-lg">
            Obrigado pela sua compra. O seu pedido foi registado.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Order Number Card */}
          <Card className="border-2 border-green-500">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Número do Pedido</p>
              <p className="text-3xl font-bold text-green-600 mb-1">{pedido.numero}</p>
              <p className="text-sm text-gray-600">
                Guarde este número para acompanhar o seu pedido
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Payment Instructions */}
              <PaymentInstructions 
                total={formatarPreco(Number(pedido.total))}
                numeroPedido={pedido.numero}
                qrCodeUrl={qrCodeUrl}
              />

              {/* Upload Comprovativo */}
              <UploadComprovativo pedidoId={pedido.id} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {pedido.itens.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        {item.produtoImagem && (
                          <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                            <Image
                              src={item.produtoImagem}
                              alt={item.produtoNome}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.produtoNome}</h4>
                          <p className="text-xs text-gray-600">
                            {item.quantidade} x {formatarPreco(Number(item.produtoPreco))}
                          </p>
                          <p className="text-sm font-semibold text-green-600">
                            {formatarPreco(Number(item.subtotal))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatarPreco(Number(pedido.subtotal))}</span>
                    </div>
                    {Number(pedido.taxaEntrega) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Taxa de Entrega</span>
                        <span>{formatarPreco(Number(pedido.taxaEntrega))}</span>
                      </div>
                    )}
                    {Number(pedido.desconto) > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Desconto</span>
                        <span>-{formatarPreco(Number(pedido.desconto))}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-green-600">{formatarPreco(Number(pedido.total))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{pedido.clienteNome}</p>
                    {pedido.clienteEmail && (
                      <p className="text-gray-600">{pedido.clienteEmail}</p>
                    )}
                    <div className="pt-2 border-t mt-2">
                      <p>{enderecoEntrega.rua}</p>
                      <p>{enderecoEntrega.bairro}, {enderecoEntrega.municipio}</p>
                      <p>{enderecoEntrega.provincia}</p>
                      {enderecoEntrega.referencia && (
                        <p className="text-gray-600 text-xs mt-1">
                          Ref: {enderecoEntrega.referencia}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/api/pedido/${pedido.id}/fatura`} target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Descarregar Fatura PDF
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href={`/pedido/${pedido.id}/rastreio`}>
                    <Package className="mr-2 h-4 w-4" />
                    Ver Rastreio do Pedido
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
