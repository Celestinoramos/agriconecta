'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem, Produto } from '@/types/cart';
import { calcularTotal, calcularItemCount } from '@/lib/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'agriconecta-cart';
const MAX_QUANTITY = 99;

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carregar do localStorage no mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Validar estrutura dos dados
          if (parsed && Array.isArray(parsed.items)) {
            // Validar cada item do carrinho
            const validItems = parsed.items.filter((item: CartItem) => {
              return (
                item &&
                item.produto &&
                typeof item.produto.id !== 'undefined' &&
                typeof item.produto.nome === 'string' &&
                typeof item.produto.preco === 'number' &&
                typeof item.quantidade === 'number' &&
                item.quantidade > 0 &&
                item.quantidade <= MAX_QUANTITY
              );
            });
            setItems(validItems);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
        // Limpar dados corrompidos
        localStorage.removeItem(STORAGE_KEY);
      }
      setIsHydrated(true);
    }
  }, []);

  // Sincronizar com localStorage quando items mudar
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
      } catch (error) {
        console.error('Erro ao salvar carrinho no localStorage:', error);
      }
    }
  }, [items, isHydrated]);

  const addItem = (produto: Produto, quantidade: number = 1) => {
    setItems((currentItems) => {
      // Normalize ID to string for consistent comparison
      const produtoId = String(produto.id);
      const existingItemIndex = currentItems.findIndex(
        (item) => String(item.produto.id) === produtoId
      );

      if (existingItemIndex > -1) {
        // Item já existe, incrementar quantidade
        const newItems = [...currentItems];
        const currentQuantity = newItems[existingItemIndex].quantidade;
        const newQuantity = Math.min(currentQuantity + quantidade, MAX_QUANTITY);
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantidade: newQuantity,
        };
        return newItems;
      } else {
        // Novo item
        const validQuantity = Math.min(Math.max(1, quantidade), MAX_QUANTITY);
        return [...currentItems, { produto, quantidade: validQuantity }];
      }
    });
  };

  const removeItem = (produtoId: string | number) => {
    const id = String(produtoId);
    setItems((currentItems) =>
      currentItems.filter((item) => String(item.produto.id) !== id)
    );
  };

  const updateQuantity = (produtoId: string | number, quantidade: number) => {
    // Validar quantidade entre 1 e 99
    const validQuantity = Math.min(Math.max(1, quantidade), MAX_QUANTITY);
    const id = String(produtoId);

    setItems((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (item) => String(item.produto.id) === id
      );

      if (itemIndex > -1) {
        const newItems = [...currentItems];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantidade: validQuantity,
        };
        return newItems;
      }

      return currentItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartForCheckout = () => {
    return items.map(item => ({
      produtoId: String(item.produto.id),
      produtoSlug: item.produto.categoria?.toLowerCase() || 'produto',
      produtoNome: item.produto.nome,
      produtoPreco: item.produto.preco,
      produtoImagem: item.produto.imagem,
      produtoUnidade: 'unidade',
      quantidade: item.quantidade,
    }));
  };

  const clearCartAfterPurchase = () => {
    clearCart();
  };

  const total = calcularTotal(items);
  const itemCount = calcularItemCount(items);

  const value: CartContextType = {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartForCheckout,
    clearCartAfterPurchase,
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
