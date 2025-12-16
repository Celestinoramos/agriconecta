import { CartItem } from '@/types/cart';
import { formatarPreco, calcularSubtotal } from './cart';

const WHATSAPP_NUMBER = '244937321982';

interface CartItemForMessage {
  nome: string;
  preco: number;
  quantidade: number;
}

/**
 * Gera a mensagem formatada do pedido para WhatsApp
 */
export function gerarMensagemPedido(items: CartItemForMessage[], total: number): string {
  // Sanitizar dados para evitar XSS
  const sanitizeText = (text: string) => {
    return text.replace(/[<>]/g, '');
  };

  let mensagem = 'Olá! Gostaria de fazer um pedido no AgriConecta:\n\n';
  mensagem += '📦 *PEDIDO*\n';
  mensagem += '─────────────────\n';

  items.forEach((item) => {
    const nomeSeguro = sanitizeText(item.nome);
    const subtotal = calcularSubtotal(item.preco, item.quantidade);
    
    mensagem += `• ${nomeSeguro} - ${formatarPreco(item.preco)}\n`;
    mensagem += `  Qtd: ${item.quantidade} | Subtotal: ${formatarPreco(subtotal)}\n\n`;
  });

  mensagem += '─────────────────\n';
  mensagem += `💰 *TOTAL: ${formatarPreco(total)}*\n\n`;
  mensagem += '📍 Localização para entrega: [A preencher]\n';
  mensagem += '📞 Contacto: [A preencher]\n\n';
  mensagem += 'Aguardo confirmação. Obrigado!';

  return mensagem;
}

/**
 * Gera o link do WhatsApp com a mensagem codificada
 */
export function gerarLinkWhatsApp(mensagem: string): string {
  const mensagemCodificada = encodeURIComponent(mensagem);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;
}

/**
 * Converte CartItems para o formato necessário para a mensagem
 */
export function converterCartItems(items: CartItem[]): CartItemForMessage[] {
  return items.map(item => ({
    nome: item.produto.nome,
    preco: item.produto.preco,
    quantidade: item.quantidade,
  }));
}
