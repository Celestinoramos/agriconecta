import { formatarPreco } from '@/lib/cart'

interface PedidoCanceladoParams {
  clienteNome: string
  numeroPedido: string
  total: number
  motivo?: string
  reembolso: boolean
}

export function templatePedidoCancelado(params: PedidoCanceladoParams): string {
  const { clienteNome, numeroPedido, total, motivo, reembolso } = params

  const textoReembolso = reembolso
    ? `\nSe já efectuou o pagamento, o reembolso de ${formatarPreco(total)} será processado em até 5 dias úteis.`
    : ''

  return `
Olá ${clienteNome},

Lamentamos informar que o seu pedido foi cancelado.

═══════════════════════════════════════
PEDIDO: ${numeroPedido}
Estado: CANCELADO
═══════════════════════════════════════

${motivo ? `Motivo: ${motivo}` : 'O pedido foi cancelado conforme solicitado.'}
${textoReembolso}

Se tiver alguma dúvida, entre em contacto connosco através do WhatsApp.

Esperamos vê-lo novamente em breve!

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()
}

export function assuntoPedidoCancelado(numeroPedido: string): string {
  return `❌ Pedido ${numeroPedido} cancelado - AgriConecta`
}
