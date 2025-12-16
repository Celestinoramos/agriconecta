import { CartItem } from '@/types/cart';

/**
 * Formata o preço em AOA (Kwanza Angolano)
 */
export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-AO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor) + ' AOA';
}

/**
 * Calcula o subtotal de um item (preço × quantidade)
 */
export function calcularSubtotal(preco: number, quantidade: number): number {
  return preco * quantidade;
}

/**
 * Calcula o total do carrinho
 */
export function calcularTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
}

/**
 * Calcula o número total de itens no carrinho
 */
export function calcularItemCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.quantidade, 0);
}
