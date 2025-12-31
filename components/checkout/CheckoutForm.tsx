'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkoutSchema } from '@/lib/validations/checkout';
import { PROVINCIAS_ANGOLA } from '@/lib/constants/provincias';
import OrderSummary from './OrderSummary';

export default function CheckoutForm() {
  const router = useRouter();
  const { items, total, getCartForCheckout, clearCartAfterPurchase } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    clienteNome: '',
    clienteEmail: '',
    endereco: {
      rua: '',
      bairro: '',
      municipio: '',
      provincia: '',
      referencia: '',
    },
    notas: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if cart is empty
  // if (items.length === 0) {
  //   router.push('/carrinho');
  //   return null;
  // }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    const errorKey = `endereco.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Get cart items for checkout
      const cartItems = getCartForCheckout();

      // Prepare data for validation
      const dataToValidate = {
        ...formData,
        metodoPagamento: 'TRANSFERENCIA_BANCARIA' as const,
        itens: cartItems,
      };

      // Validate with Zod
      const validatedData = checkoutSchema.parse(dataToValidate);

      // Submit to API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar pedido');
      }

      // Show success message e REDIRECIONA PARA O RASTREIO PRIMEIRO
      toast.success('Pedido criado com sucesso!');
      router.push(`/pedido/${result.pedidoId}/rastreio`);

      // Só então limpa o carrinho para evitar redirect indesejado
      setTimeout(() => {
        clearCartAfterPurchase();
      }, 800);

    } catch (error) {
      console.error('Erro no checkout:', error);

      if ((error as any).errors) {
        // Zod validation errors
        const newErrors: Record<string, string> = {};
        (error as any).errors.forEach((err: any) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        toast.error('Por favor, corrija os erros no formulário');
      } else {
        toast.error((error as Error).message || 'Erro ao processar pedido');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back Button */}
          <Link 
            href="/carrinho" 
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Carrinho
          </Link>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="clienteNome" className="block text-sm font-medium mb-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="clienteNome"
                  type="text"
                  value={formData.clienteNome}
                  onChange={(e) => handleInputChange('clienteNome', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.clienteNome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seu nome completo"
                  required
                />
                {errors.clienteNome && (
                  <p className="mt-1 text-sm text-red-500">{errors.clienteNome}</p>
                )}
              </div>

              <div>
                <label htmlFor="clienteEmail" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="clienteEmail"
                  type="email"
                  value={formData.clienteEmail}
                  onChange={(e) => handleInputChange('clienteEmail', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.clienteEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seuemail@exemplo.com"
                  required
                />
                {errors.clienteEmail && (
                  <p className="mt-1 text-sm text-red-500">{errors.clienteEmail}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Para receber confirmação e fatura por email</p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="rua" className="block text-sm font-medium mb-1">
                  Rua/Avenida <span className="text-red-500">*</span>
                </label>
                <input
                  id="rua"
                  type="text"
                  value={formData.endereco.rua}
                  onChange={(e) => handleEnderecoChange('rua', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors['endereco.rua'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Rua da Missão, nº 123"
                  required
                />
                {errors['endereco.rua'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['endereco.rua']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bairro" className="block text-sm font-medium mb-1">
                    Bairro <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bairro"
                    type="text"
                    value={formData.endereco.bairro}
                    onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors['endereco.bairro'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Maianga"
                    required
                  />
                  {errors['endereco.bairro'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['endereco.bairro']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="municipio" className="block text-sm font-medium mb-1">
                    Município <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="municipio"
                    type="text"
                    value={formData.endereco.municipio}
                    onChange={(e) => handleEnderecoChange('municipio', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors['endereco.municipio'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Luanda"
                    required
                  />
                  {errors['endereco.municipio'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['endereco.municipio']}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="provincia" className="block text-sm font-medium mb-1">
                  Província <span className="text-red-500">*</span>
                </label>
                <select
                  id="provincia"
                  value={formData.endereco.provincia}
                  onChange={(e) => handleEnderecoChange('provincia', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors['endereco.provincia'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Selecione uma província</option>
                  {PROVINCIAS_ANGOLA.map((provincia) => (
                    <option key={provincia} value={provincia}>
                      {provincia}
                    </option>
                  ))}
                </select>
                {errors['endereco.provincia'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['endereco.provincia']}</p>
                )}
              </div>

              <div>
                <label htmlFor="referencia" className="block text-sm font-medium mb-1">
                  Ponto de Referência (opcional)
                </label>
                <input
                  id="referencia"
                  type="text"
                  value={formData.endereco.referencia}
                  onChange={(e) => handleEnderecoChange('referencia', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Próximo ao Hospital X"
                />
                <p className="mt-1 text-xs text-gray-500">Ajuda-nos a encontrar o seu endereço mais facilmente</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas do Pedido (opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                id="notas"
                value={formData.notas}
                onChange={(e) => handleInputChange('notas', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Informações adicionais sobre o seu pedido..."
              />
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 p-4 border-2 border-green-500 rounded-lg bg-green-50">
                <input
                  type="radio"
                  id="transferencia"
                  name="pagamento"
                  checked
                  readOnly
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="transferencia" className="flex-1">
                  <div className="font-medium">Transferência Bancária</div>
                  <div className="text-sm text-gray-600">Banco BFA - Banco de Fomento Angola</div>
                </label>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Após confirmar o pedido, receberá os dados bancários para efectuar a transferência.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <OrderSummary items={items} total={total} />
            
            <Button
              type="submit"
              size="lg"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A processar...
                </>
              ) : (
                'Confirmar Pedido'
              )}
            </Button>

            <p className="mt-4 text-xs text-center text-gray-500">
              Ao confirmar, concorda com os nossos termos de serviço
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}