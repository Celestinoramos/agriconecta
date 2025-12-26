import { useEffect, useState } from 'react';

const STORAGE_KEY = 'agriconecta_recently_viewed';
const MAX_ITEMS = 10;

interface RecentlyViewedProduct {
  id: string | number;
  slug: string;
  nome: string;
  imagem: string;
  preco: number;
  categoria: string;
  viewedAt: number;
}

/**
 * Hook to manage recently viewed products in localStorage
 * @returns Object with recently viewed products and methods to add/clear them
 */
export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }, []);

  const addProduct = (product: Omit<RecentlyViewedProduct, 'viewedAt'>) => {
    try {
      setRecentlyViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter(
          (p) => p.id.toString() !== product.id.toString()
        );
        
        // Add to beginning with current timestamp
        const updated = [
          { ...product, viewedAt: Date.now() },
          ...filtered,
        ].slice(0, MAX_ITEMS);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        return updated;
      });
    } catch (error) {
      console.error('Error adding to recently viewed:', error);
    }
  };

  const clearAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (error) {
      console.error('Error clearing recently viewed:', error);
    }
  };

  return {
    recentlyViewed,
    addProduct,
    clearAll,
  };
}
