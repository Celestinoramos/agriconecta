'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatarPreco } from '@/lib/cart';

interface OrderItem {
  id: string;
  produtoNome: string;
  produtoImagem?: string | null;
  produtoUnidade: string;
  quantidade: number;
  produtoPreco: number;
  subtotal: number;
}

interface OrderDetailsProps {
  itens: OrderItem[];
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
  metodoPagamento: string;
}

const METODO_PAGAMENTO_LABELS: Record<string, string> = {
  TRANSFERENCIA_BANCARIA: 'Transferência Bancária',
  MULTICAIXA_EXPRESS: 'Multicaixa Express',
};

export default function OrderDetails({
  itens,
  subtotal,
  taxaEntrega,
  desconto,
  total,
  metodoPagamento,
}: OrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-3">
          {itens.map((item) => (
            <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
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
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{item.produtoNome}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {item.quantidade} {item.produtoUnidade} × {formatarPreco(item.produtoPreco)}
                </p>
                <p className="text-sm font-semibold text-green-600 mt-1">
                  {formatarPreco(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatarPreco(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de Entrega</span>
            <span className="font-medium">
              {taxaEntrega > 0 ? formatarPreco(taxaEntrega) : 'A calcular'}
            </span>
          </div>
          {desconto > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Desconto</span>
              <span className="font-medium text-green-600">
                -{formatarPreco(desconto)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-green-600">{formatarPreco(total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600">Método de Pagamento</p>
          <p className="font-medium">
            {METODO_PAGAMENTO_LABELS[metodoPagamento] || metodoPagamento}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
