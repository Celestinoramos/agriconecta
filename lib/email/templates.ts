// Formatador de preço
function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-AO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor) + ' AOA'
}

// ==================== TIPOS ====================

export interface ItemEmail {
  nome: string
  quantidade: number
  precoUnitario: number
  subtotal: number
}

export interface EnderecoEmail {
  rua: string
  bairro: string
  municipio: string
  provincia: string
  referencia?: string
}

export interface DadosBancariosEmail {
  banco: string
  iban: string
  titular: string
}

export interface PedidoEmailData {
  id: string
  numero: string
  clienteNome: string
  clienteEmail: string | null
  clienteTelefone: string
  itens: ItemEmail[]
  subtotal: number
  taxaEntrega: number
  total: number
  endereco: EnderecoEmail
  codigoRastreio: string
}

// ==================== TEMPLATE: PEDIDO CRIADO (CLIENTE) ====================

export function emailPedidoCriadoCliente(
  pedido: PedidoEmailData,
  dadosBancarios: DadosBancariosEmail,
  linkRastreio: string
): { subject: string; text: string } {
  const listaItens = pedido.itens
    .map(item => `  • ${item.nome} x${item.quantidade} - ${formatarPreco(item.subtotal)}`)
    .join('\n')

  const subject = `Pedido ${pedido.numero} recebido - AgriConecta`

  const text = `
Olá ${pedido.clienteNome}!

O seu pedido foi recebido com sucesso!

═══════════════════════════════════════
PEDIDO: ${pedido.numero}
═══════════════════════════════════════

ITENS DO PEDIDO:
${listaItens}

───────────────────────────────────────
Subtotal: ${formatarPreco(pedido.subtotal)}
Taxa de Entrega: ${formatarPreco(pedido.taxaEntrega)}
TOTAL: ${formatarPreco(pedido.total)}
───────────────────────────────────────

ENDEREÇO DE ENTREGA:
${pedido.endereco.rua}
${pedido.endereco.bairro}, ${pedido.endereco.municipio}
${pedido.endereco.provincia}
${pedido.endereco.referencia ? `Referência: ${pedido.endereco.referencia}` : ''}

═══════════════════════════════════════
DADOS PARA PAGAMENTO (Transferência Bancária)
═══════════════════════════════════════

Banco: ${dadosBancarios.banco}
IBAN: ${dadosBancarios.iban}
Titular: ${dadosBancarios.titular}
Valor: ${formatarPreco(pedido.total)}
Referência: ${pedido.numero}

⚠️ Importante: Use o número do pedido como referência da transferência.

═══════════════════════════════════════

📦 Acompanhe o seu pedido:
${linkRastreio}

Obrigado por escolher o AgriConecta!

---
AgriConecta - Marketplace Agrícola de Angola
Este email foi enviado automaticamente. Por favor não responda.
`.trim()

  return { subject, text }
}

// ==================== TEMPLATE: PEDIDO CRIADO (ADMIN) ====================

export function emailPedidoCriadoAdmin(
  pedido: PedidoEmailData,
  linkAdmin: string
): { subject: string; text: string } {
  const subject = `🆕 Novo Pedido ${pedido.numero} - AgriConecta`

  const text = `
═══════════════════════════════════════
NOVO PEDIDO RECEBIDO!
═══════════════════════════════════════

Pedido: ${pedido.numero}
Data: ${new Date().toLocaleString('pt-AO')}

CLIENTE:
  Nome: ${pedido.clienteNome}
  Email: ${pedido.clienteEmail || 'Não fornecido'}
  Telefone: ${pedido.clienteTelefone}

ENTREGA:
  ${pedido.endereco.provincia} - ${pedido.endereco.municipio}

RESUMO:
  Itens: ${pedido.itens.length}
  Quantidade Total: ${pedido.itens.reduce((acc, i) => acc + i.quantidade, 0)}
  Valor Total: ${formatarPreco(pedido.total)}

Estado: ⏳ PENDENTE (Aguardando pagamento)

───────────────────────────────────────

🔗 Ver detalhes do pedido:
${linkAdmin}

---
AgriConecta - Sistema de Notificações Admin
`.trim()

  return { subject, text }
}

// ==================== TEMPLATE: PAGAMENTO CONFIRMADO ====================

export function emailPagamentoConfirmado(
  pedido: Pick<PedidoEmailData, 'numero' | 'clienteNome' | 'total'>,
  linkRastreio: string
): { subject: string; text: string } {
  const subject = `✅ Pagamento confirmado - Pedido ${pedido.numero}`

  const text = `
Olá ${pedido.clienteNome}!

Óptimas notícias! O pagamento do seu pedido foi confirmado.

═══════════════════════════════════════
PEDIDO: ${pedido.numero}
Valor: ${formatarPreco(pedido.total)}
Estado: ✅ PAGO
═══════════════════════════════════════

PRÓXIMOS PASSOS:
1. A nossa equipa vai preparar o seu pedido
2. Receberá uma notificação quando for enviado
3. Acompanhe o estado em tempo real

📦 Acompanhe o seu pedido:
${linkRastreio}

Obrigado pela sua compra!

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()

  return { subject, text }
}

// ==================== TEMPLATE: ESTADO ALTERADO ====================

const ESTADOS_INFO: Record<string, { emoji: string; titulo: string; mensagem: string }> = {
  EM_PREPARACAO: {
    emoji: '📦',
    titulo: 'Pedido em Preparação',
    mensagem: 'A nossa equipa está a preparar os seus produtos com todo o cuidado. Em breve estará pronto para envio!',
  },
  EM_TRANSITO: {
    emoji: '🚚',
    titulo: 'Pedido a Caminho',
    mensagem: 'O seu pedido foi enviado e está a caminho! Prepare-se para receber produtos frescos.',
  },
  ENTREGUE: {
    emoji: '✅',
    titulo: 'Pedido Entregue',
    mensagem: 'O seu pedido foi entregue com sucesso! Esperamos que desfrute dos nossos produtos.',
  },
}

export function emailEstadoAlterado(
  pedido: Pick<PedidoEmailData, 'numero' | 'clienteNome'>,
  novoEstado: string,
  nota: string | null,
  linkRastreio: string
): { subject: string; text: string } {
  const info = ESTADOS_INFO[novoEstado] || {
    emoji: '📋',
    titulo: `Estado: ${novoEstado}`,
    mensagem: 'O estado do seu pedido foi actualizado.',
  }

  const subject = `${info.emoji} ${info.titulo} - Pedido ${pedido.numero}`

  const text = `
Olá ${pedido.clienteNome}!

${info.emoji} ${info.titulo}

═══════════════════════════════════════
PEDIDO: ${pedido.numero}
═══════════════════════════════════════

${info.mensagem}

${nota ? `📝 Nota: ${nota}` : ''}

📦 Acompanhe o seu pedido:
${linkRastreio}

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()

  return { subject, text }
}

// ==================== TEMPLATE: PEDIDO CANCELADO ====================

export function emailPedidoCancelado(
  pedido: Pick<PedidoEmailData, 'numero' | 'clienteNome' | 'total'>,
  motivo: string | null,
  jaFoiPago: boolean
): { subject: string; text: string } {
  const subject = `❌ Pedido ${pedido.numero} cancelado - AgriConecta`

  const textoReembolso = jaFoiPago
    ? `\n💰 REEMBOLSO:\nComo o pagamento já foi efectuado, o valor de ${formatarPreco(pedido.total)} será reembolsado em até 5 dias úteis.\n`
    : ''

  const text = `
Olá ${pedido.clienteNome},

Lamentamos informar que o seu pedido foi cancelado.

═══════════════════════════════════════
PEDIDO: ${pedido.numero}
Estado: ❌ CANCELADO
═══════════════════════════════════════

${motivo ? `Motivo: ${motivo}` : 'O pedido foi cancelado conforme solicitado ou por indisponibilidade de produtos.'}
${textoReembolso}
Se tiver alguma dúvida, entre em contacto connosco através do WhatsApp.

Esperamos vê-lo novamente em breve!

---
AgriConecta - Marketplace Agrícola de Angola
`.trim()

  return { subject, text }
}
