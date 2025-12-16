'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/CartContext';
import { ProdutoDetalhado } from '@/types/produto';
import QuantitySelector from './QuantitySelector';

interface AddToCartSectionProps {
  produto: ProdutoDetalhado;
}

export default function AddToCartSection({ produto }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > 99) {
      toast.error('Quantidade inválida', {
        description: 'Por favor, seleccione uma quantidade entre 1 e 99.'
      });
      return;
    }

    // Convert to Produto type for cart compatibility
    const produtoParaCarrinho = {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
      produtor: produto.produtor,
      provincia: produto.provincia,
      disponibilidade: produto.disponibilidade
    };

    addItem(produtoParaCarrinho, quantity);

    // Check if product is unavailable
    const isUnavailable =
      produto.disponibilidade === false ||
      (typeof produto.disponibilidade === 'string' &&
        produto.disponibilidade.toLowerCase() !== 'em stock');

    if (isUnavailable) {
      toast.warning('Produto adicionado ao carrinho', {
        description: 'Este produto pode não estar disponível. Confirme com o vendedor.'
      });
    } else {
      toast.success('Produto adicionado ao carrinho', {
        description: `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} de ${produto.nome} adicionada${quantity === 1 ? '' : 's'} com sucesso.`
      });
    }
  };

  const disponivel =
    typeof produto.disponibilidade === 'boolean'
      ? produto.disponibilidade
      : produto.disponibilidade === 'Em stock';

  return (
    <div className="bg-white rounded-lg border p-6 space-y-4 sticky top-20">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade
          </label>
          <QuantitySelector
            initialQuantity={quantity}
            onChange={setQuantity}
            className="justify-center"
          />
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full h-12 text-base"
          disabled={quantity < 1 || quantity > 99}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Adicionar ao Carrinho
        </Button>

        {!disponivel && (
          <p className="text-sm text-amber-600 text-center">
            ⚠️ Produto temporariamente indisponível. Ainda pode adicionar ao carrinho para consultar disponibilidade.
          </p>
        )}
      </div>

      <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
        <p>✓ Produtos frescos e de qualidade</p>
        <p>✓ Entrega em Luanda e arredores</p>
        <p>✓ Pagamento via WhatsApp</p>
      </div>
    </div>
  );
}
