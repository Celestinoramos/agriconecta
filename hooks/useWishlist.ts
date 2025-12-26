import { useEffect, useState } from 'react';

const STORAGE_KEY = 'agriconecta_wishlist';

interface WishlistProduct {
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
  addedAt: number;
}

/**
 * Hook to manage wishlist/favorites in localStorage
 * @returns Object with wishlist products and methods to add/remove/toggle them
 */
export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWishlist(parsed);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  }, []);

  const isInWishlist = (productId: string | number): boolean => {
    return wishlist.some((p) => p.id.toString() === productId.toString());
  };

  const addToWishlist = (product: Omit<WishlistProduct, 'addedAt'>) => {
    try {
      setWishlist((prev) => {
        // Don't add if already exists
        if (prev.some((p) => p.id.toString() === product.id.toString())) {
          return prev;
        }

        const updated = [...prev, { ...product, addedAt: Date.now() }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = (productId: string | number) => {
    try {
      setWishlist((prev) => {
        const updated = prev.filter(
          (p) => p.id.toString() !== productId.toString()
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const toggleWishlist = (product: Omit<WishlistProduct, 'addedAt'>) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setWishlist([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
