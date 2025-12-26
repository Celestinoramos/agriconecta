import { EstadoPedido } from '@/types/pedido'

interface EstadoAlteradoParams {
  clienteNome: string
  numeroPedido: string
  estadoAnterior: string
  estadoNovo: string
  mensagem: string
  linkRastreio: string
}

const ESTADOS_MENSAGENS: Record<EstadoPedido, { emoji: string; titulo: string; descricao: string }> = {
  PENDENTE: {
    emoji: '⏳',
    titulo: 'Pedido Pendente',
    descricao: 'O seu pedido está aguardando pagamento.',
  },
  PAGO: {
    emoji: '✅',
    titulo: 'Pagamento Confirmado',
    descricao: 'O pagamento do seu pedido foi confirmado.',
  },
  EM_PREPARACAO: {
    emoji: '📦',
    titulo: 'Pedido em Preparação',
    descricao: 'A nossa equipa está a preparar os seus produtos com todo o cuidado.',
  },
  EM_TRANSITO: {
    emoji: '🚚',
    titulo: 'Pedido Enviado',
    descricao: 'O seu pedido está a caminho! Em breve chegará ao destino.',
  },
  ENTREGUE: {
    emoji: '✅',
    titulo: 'Pedido Entregue',
    descricao: 'O seu pedido foi entregue com sucesso. Obrigado por escolher o AgriConecta!',
  },
  CANCELADO: {
    emoji: '❌',
    titulo: 'Pedido Cancelado',
    descricao: 'Lamentamos informar que o seu pedido foi cancelado.',
  },
}

export function templateEstadoAlterado(params: EstadoAlteradoParams): string {
  const { clienteNome, numeroPedido, estadoNovo, mensagem, linkRastreio } = params

  const estadoInfo = ESTADOS_MENSAGENS[estadoNovo as EstadoPedido] || {
    emoji: '📋',
    titulo: `Estado: ${estadoNovo}`,
    descricao: 'O estado do seu pedido foi actualizado.',
  }

  return `
Olá ${clienteNome}!

${estadoInfo.emoji} ${estadoInfo.titulo}

═══════════════════════════════════════
PEDIDO: ${numeroPedido}
═══════════════════════════════════════

${estadoInfo.descricao}

${mensagem ? `Nota: ${mensagem}` : ''}

Acompanhe o seu pedido:
${linkRastreio}

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()
}

export function assuntoEstadoAlterado(numeroPedido: string, estadoNovo: string): string {
  const estadoInfo = ESTADOS_MENSAGENS[estadoNovo as EstadoPedido]
  const emoji = estadoInfo?.emoji || '📋'
  return `${emoji} Actualização do Pedido ${numeroPedido}`
}
