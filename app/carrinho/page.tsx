'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/components/cart/CartContext';
import WhatsAppButton from '@/components/cart/WhatsAppButton';
import { formatarPreco, calcularSubtotal } from '@/lib/cart';

export default function CarrinhoPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const handleClearCart = () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      clearCart();
      toast.success('Carrinho limpo');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-8 px-4 sm:py-10">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="text-green-100 hover:text-white mb-3 inline-flex items-center min-h-[44px] active:scale-95 transition-transform"
          >
            <span className="mr-2">←</span>
            <span>Voltar para Início</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2 sm:text-4xl">Carrinho de Compras</h1>
          <p className="text-green-100">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            // Empty Cart
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="h-20 w-20 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold mb-2">O seu carrinho está vazio</h2>
                <p className="text-gray-600 mb-6">
                  Adicione produtos para começar as suas compras
                </p>
                <Button asChild size="lg">
                  <Link href="/produtos">Ver Produtos</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Cart with Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-xl font-bold mb-4">Itens no Carrinho</h2>
                    
                    {/* Mobile/Tablet View */}
                    <div className="space-y-4 lg:hidden">
                      {items.map((item) => {
                        const subtotal = calcularSubtotal(item.produto.preco, item.quantidade);
                        
                        return (
                          <div key={item.produto.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                              <Image
                                src={item.produto.imagem}
                                alt={item.produto.nome}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium mb-1">{item.produto.nome}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {formatarPreco(item.produto.preco)}
                              </p>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    if (item.quantidade > 1) {
                                      updateQuantity(item.produto.id, item.quantidade - 1);
                                      toast.success('Quantidade actualizada');
                                    }
                                  }}
                                  disabled={item.quantidade <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                
                                <span className="w-8 text-center font-medium">
                                  {item.quantidade}
                                </span>
                                
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    if (item.quantidade < 99) {
                                      updateQuantity(item.produto.id, item.quantidade + 1);
                                      toast.success('Quantidade actualizada');
                                    }
                                  }}
                                  disabled={item.quantidade >= 99}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 ml-auto text-red-600"
                                  onClick={() => {
                                    removeItem(item.produto.id);
                                    toast.success('Produto removido');
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <p className="font-semibold text-green-600">
                                Subtotal: {formatarPreco(subtotal)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="pb-4 font-semibold">Produto</th>
                            <th className="pb-4 font-semibold text-right">Preço</th>
                            <th className="pb-4 font-semibold text-center">Quantidade</th>
                            <th className="pb-4 font-semibold text-right">Subtotal</th>
                            <th className="pb-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => {
                            const subtotal = calcularSubtotal(item.produto.preco, item.quantidade);
                            
                            return (
                              <tr key={item.produto.id} className="border-b">
                                <td className="py-4">
                                  <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                      <Image
                                        src={item.produto.imagem}
                                        alt={item.produto.nome}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                      />
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{item.produto.nome}</h3>
                                      <p className="text-sm text-gray-600">{item.produto.provincia}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 text-right">
                                  {formatarPreco(item.produto.preco)}
                                </td>
                                <td className="py-4">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => {
                                        if (item.quantidade > 1) {
                                          updateQuantity(item.produto.id, item.quantidade - 1);
                                          toast.success('Quantidade actualizada');
                                        }
                                      }}
                                      disabled={item.quantidade <= 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    
                                    <span className="w-8 text-center font-medium">
                                      {item.quantidade}
                                    </span>
                                    
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => {
                                        if (item.quantidade < 99) {
                                          updateQuantity(item.produto.id, item.quantidade + 1);
                                          toast.success('Quantidade actualizada');
                                        }
                                      }}
                                      disabled={item.quantidade >= 99}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                                <td className="py-4 text-right font-semibold text-green-600">
                                  {formatarPreco(subtotal)}
                                </td>
                                <td className="py-4 text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600"
                                    onClick={() => {
                                      removeItem(item.produto.id);
                                      toast.success('Produto removido');
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                        <span>{formatarPreco(total)}</span>
                      </div>
                      
                      <div className="border-t pt-3 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">{formatarPreco(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <WhatsAppButton className="w-full" size="lg" />
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link href="/produtos">Continuar a Comprar</Link>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleClearCart}
                      >
                        Limpar Carrinho
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        💬 Ao finalizar via WhatsApp, você receberá confirmação do vendedor com detalhes de entrega e pagamento.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
