'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from './CartContext';

export default function CartIcon() {
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative min-h-[44px] min-w-[44px]"
      onClick={() => setIsDrawerOpen(true)}
      aria-label={`Carrinho de compras ${itemCount > 0 ? `com ${itemCount} itens` : 'vazio'}`}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge
          variant="default"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600 text-white text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
}
