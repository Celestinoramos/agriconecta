'use client';

import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { gerarMensagemPedido, gerarLinkWhatsApp, converterCartItems } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export default function WhatsAppButton({ 
  disabled = false,
  variant = 'default',
  size = 'default',
  className 
}: WhatsAppButtonProps) {
  const { items, total, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error('Carrinho vazio', {
        description: 'Adicione produtos ao carrinho antes de finalizar o pedido.',
      });
      return;
    }

    try {
      // Gerar mensagem formatada
      const cartItemsForMessage = converterCartItems(items);
      const mensagem = gerarMensagemPedido(cartItemsForMessage, total);
      const whatsappLink = gerarLinkWhatsApp(mensagem);

      // Abrir WhatsApp em nova aba
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');

      // Perguntar se deseja limpar o carrinho
      toast.success('Pedido enviado para WhatsApp!', {
        description: 'Continue a comprar ou limpe o carrinho.',
        action: {
          label: 'Limpar Carrinho',
          onClick: () => {
            clearCart();
            toast.success('Carrinho limpo');
          },
        },
      });
    } catch (error) {
      console.error('Erro ao gerar link WhatsApp:', error);
      toast.error('Erro ao processar pedido', {
        description: 'Tente novamente ou entre em contacto connosco.',
      });
    }
  };

  return (
    <Button
      onClick={handleWhatsAppCheckout}
      disabled={disabled || items.length === 0}
      variant={variant}
      size={size}
      className={className}
      aria-label="Finalizar pedido via WhatsApp"
    >
      <MessageCircle className="h-5 w-5 mr-2" />
      Finalizar via WhatsApp
    </Button>
  );
}
