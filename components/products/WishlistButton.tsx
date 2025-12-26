'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  product: {
    id: string | number;
    slug: string;
    nome: string;
    descricao?: string;
    imagem: string;
    preco: number;
    categoria: string;
    produtor: string;
    provincia: string;
    disponibilidade?: string | boolean;
  };
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export default function WishlistButton({
  product,
  className,
  size = 'default',
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    default: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        sizeClasses[size],
        'rounded-full hover:bg-gray-100 transition-all',
        inWishlist && 'hover:bg-red-50',
        className
      )}
      aria-label={inWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={cn(
          iconSizes[size],
          'transition-all',
          inWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-500'
        )}
      />
    </Button>
  );
}
