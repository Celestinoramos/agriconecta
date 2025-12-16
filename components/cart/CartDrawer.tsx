'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import WhatsAppButton from './WhatsAppButton';
import { formatarPreco } from '@/lib/cart';

export default function CartDrawer() {
  const { items, total, itemCount, isDrawerOpen, setIsDrawerOpen } = useCart();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md flex flex-col p-0"
        aria-describedby="cart-description"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="text-xl font-bold">
            Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
          </SheetTitle>
          <p id="cart-description" className="sr-only">
            Seu carrinho de compras com {itemCount} itens
          </p>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium mb-2">O seu carrinho está vazio</h3>
              <p className="text-gray-600 mb-6">
                Adicione produtos para começar as suas compras
              </p>
              <Button asChild onClick={() => setIsDrawerOpen(false)}>
                <Link href="/produtos">Ver Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="py-4">
              {items.map((item) => (
                <CartItem key={item.produto.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="p-6 border-t flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">{formatarPreco(total)}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <WhatsAppButton className="w-full" size="lg" />
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}
                asChild
              >
                <Link href="/produtos">Continuar a Comprar</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
