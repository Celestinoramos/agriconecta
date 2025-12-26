'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

interface ProductViewTrackerProps {
  product: {
    id: string | number;
    slug: string;
    nome: string;
    imagem: string;
    preco: number;
    categoria: string;
  };
}

/**
 * Client component to track product views in localStorage
 * Use this in server components to add recently viewed tracking
 */
export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    // Add product to recently viewed when component mounts
    addProduct(product);
  }, [product.id]); // Only re-run if product ID changes

  return null; // This component doesn't render anything
}
