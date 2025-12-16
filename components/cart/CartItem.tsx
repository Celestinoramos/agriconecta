'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart';
import { formatarPreco, calcularSubtotal } from '@/lib/cart';
import { useCart } from './CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { produto, quantidade } = item;
  const subtotal = calcularSubtotal(produto.preco, quantidade);

  const handleDecrement = () => {
    if (quantidade > 1) {
      updateQuantity(produto.id, quantidade - 1);
      toast.success('Quantidade actualizada');
    }
  };

  const handleIncrement = () => {
    if (quantidade < 99) {
      updateQuantity(produto.id, quantidade + 1);
      toast.success('Quantidade actualizada');
    }
  };

  const handleRemove = () => {
    removeItem(produto.id);
    toast.success('Produto removido do carrinho');
  };

  return (
    <div className="flex gap-3 py-4 border-b">
      {/* Imagem */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Detalhes */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{produto.nome}</h3>
        <p className="text-sm text-gray-600">{formatarPreco(produto.preco)}</p>
        
        {/* Controlos de Quantidade */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrement}
            disabled={quantidade <= 1}
            aria-label="Diminuir quantidade"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center font-medium" aria-label={`Quantidade: ${quantidade}`}>
            {quantidade}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrement}
            disabled={quantidade >= 99}
            aria-label="Aumentar quantidade"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleRemove}
            aria-label={`Remover ${produto.nome} do carrinho`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Subtotal */}
        <p className="text-sm font-semibold text-green-600 mt-1">
          Subtotal: {formatarPreco(subtotal)}
        </p>
      </div>
    </div>
  );
}
