import { formatarPreco } from '@/lib/cart'

interface PagamentoConfirmadoParams {
  clienteNome: string
  numeroPedido: string
  total: number
  linkRastreio: string
}

export function templatePagamentoConfirmado(params: PagamentoConfirmadoParams): string {
  const { clienteNome, numeroPedido, total, linkRastreio } = params

  return `
Olá ${clienteNome}!

Boas notícias! O pagamento do seu pedido foi confirmado.

═══════════════════════════════════════
PEDIDO: ${numeroPedido}
Valor: ${formatarPreco(total)}
Estado: PAGO ✓
═══════════════════════════════════════

PRÓXIMOS PASSOS:
1. A nossa equipa vai preparar o seu pedido
2. Receberá uma notificação quando for enviado
3. Acompanhe o estado em tempo real

Acompanhe o seu pedido:
${linkRastreio}

Obrigado pela sua compra!

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()
}

export function assuntoPagamentoConfirmado(numeroPedido: string): string {
  return `✅ Pagamento confirmado - Pedido ${numeroPedido}`
}
