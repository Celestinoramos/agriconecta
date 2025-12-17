'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatarPreco } from '@/lib/cart';
import { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.produto.id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                <Image
                  src={item.produto.imagem}
                  alt={item.produto.nome}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{item.produto.nome}</h4>
                <p className="text-xs text-gray-600">
                  Qtd: {item.quantidade}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  {formatarPreco(item.produto.preco * item.quantidade)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatarPreco(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de Entrega</span>
            <span>A calcular</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-green-600">{formatarPreco(total)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-gray-700">
            ℹ️ A taxa de entrega será calculada após a confirmação do pedido baseado na sua localização.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
