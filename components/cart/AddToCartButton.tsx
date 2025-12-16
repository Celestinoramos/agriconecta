'use client';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Produto } from '@/types/cart';
import { useCart } from './CartContext';

interface AddToCartButtonProps {
  produto: Produto;
  className?: string;
}

export default function AddToCartButton({ produto, className }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(produto, 1);
    
    // Verificar se produto está indisponível
    const isUnavailable = 
      produto.disponibilidade === false || 
      (typeof produto.disponibilidade === 'string' && 
       produto.disponibilidade.toLowerCase() !== 'em stock');

    if (isUnavailable) {
      toast.warning('Produto adicionado ao carrinho', {
        description: 'Este produto pode não estar disponível. Confirme com o vendedor.',
      });
    } else {
      toast.success('Produto adicionado ao carrinho', {
        description: `${produto.nome} foi adicionado com sucesso.`,
      });
    }

    // Opcional: abrir o drawer após adicionar
    // setIsDrawerOpen(true);
  };

  return (
    <Button 
      onClick={handleAddToCart}
      className={className}
      aria-label={`Adicionar ${produto.nome} ao carrinho`}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Adicionar ao Carrinho
    </Button>
  );
}
