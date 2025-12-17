export interface Produto {
  id: string | number;
  nome: string;
  descricao: string;
  preco: number; // Em AOA
  categoria: string;
  imagem: string;
  produtor: string;
  provincia: string;
  disponibilidade: string | boolean;
}

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (produto: Produto, quantidade?: number) => void;
  removeItem: (produtoId: string | number) => void;
  updateQuantity: (produtoId: string | number, quantidade: number) => void;
  clearCart: () => void;
  getCartForCheckout: () => {
    produtoId: string;
    produtoSlug: string;
    produtoNome: string;
    produtoPreco: number;
    produtoImagem?: string;
    produtoUnidade: string;
    quantidade: number;
  }[];
  clearCartAfterPurchase: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}
