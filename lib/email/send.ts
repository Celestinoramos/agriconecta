import { resend, EMAIL_CONFIG, isEmailEnabled } from './resend'
import {
  emailPedidoCriadoCliente,
  emailPedidoCriadoAdmin,
  emailPagamentoConfirmado,
  emailEstadoAlterado,
  emailPedidoCancelado,
  PedidoEmailData,
} from './templates'

// Re-export PedidoEmailData for convenience
export type { PedidoEmailData } from './templates'

interface SendResult {
  success: boolean
  messageId?: string
  error?: string
}

// Função base de envio
async function sendEmail(to: string, subject: string, text: string): Promise<SendResult> {
  // Log para debug
  console.log(`📧 Enviando email para: ${to}`)
  console.log(`   Assunto: ${subject}`)

  // Se Resend não está configurado, apenas logar
  if (!isEmailEnabled() || !resend) {
    console.warn('⚠️ Resend não configurado - email logado mas não enviado')
    console.log('--- CONTEÚDO DO EMAIL ---')
    console.log(text)
    console.log('--- FIM DO EMAIL ---')
    return { success: true, messageId: 'dev-mode-no-send' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject,
      text,
    })

    if (error) {
      console.error('❌ Erro ao enviar email:', error)
      return { success: false, error: error.message }
    }

    console.log(`✅ Email enviado com sucesso! ID: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (err) {
    console.error('❌ Erro ao enviar email:', err)
    return { success: false, error: String(err) }
  }
}

// ==================== FUNÇÕES DE ENVIO ESPECÍFICAS ====================

/**
 * Envia emails quando um pedido é criado
 * - Email para cliente com confirmação e dados de pagamento
 * - Email para admin com alerta de novo pedido
 */
export async function enviarEmailsPedidoCriado(pedido: PedidoEmailData): Promise<{
  cliente: SendResult
  admin: SendResult
}> {
  const linkRastreio = `${EMAIL_CONFIG.appUrl}/pedido/${pedido.id}/rastreio`
  const linkAdmin = `${EMAIL_CONFIG.appUrl}/admin/pedidos/${pedido.id}`

  // Email para cliente (se tiver email)
  let clienteResult: SendResult = { success: false, error: 'Email do cliente não fornecido' }

  if (pedido.clienteEmail) {
    const { subject, text } = emailPedidoCriadoCliente(
      pedido,
      EMAIL_CONFIG.banco,
      linkRastreio
    )
    clienteResult = await sendEmail(pedido.clienteEmail, subject, text)
  }

  // Email para admin
  const { subject: adminSubject, text: adminText } = emailPedidoCriadoAdmin(pedido, linkAdmin)
  const adminResult = await sendEmail(EMAIL_CONFIG.adminEmail, adminSubject, adminText)

  return { cliente: clienteResult, admin: adminResult }
}

/**
 * Envia email quando pagamento é confirmado
 */
export async function enviarEmailPagamentoConfirmado(
  pedido: Pick<PedidoEmailData, 'id' | 'numero' | 'clienteNome' | 'clienteEmail' | 'total'>
): Promise<SendResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email do cliente não fornecido' }
  }

  const linkRastreio = `${EMAIL_CONFIG.appUrl}/pedido/${pedido.id}/rastreio`
  const { subject, text } = emailPagamentoConfirmado(pedido, linkRastreio)

  return sendEmail(pedido.clienteEmail, subject, text)
}

/**
 * Envia email quando estado do pedido é alterado
 * (EM_PREPARACAO, EM_TRANSITO, ENTREGUE)
 */
export async function enviarEmailEstadoAlterado(
  pedido: Pick<PedidoEmailData, 'id' | 'numero' | 'clienteNome' | 'clienteEmail'>,
  novoEstado: string,
  nota?: string | null
): Promise<SendResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email do cliente não fornecido' }
  }

  const linkRastreio = `${EMAIL_CONFIG.appUrl}/pedido/${pedido.id}/rastreio`
  const { subject, text } = emailEstadoAlterado(pedido, novoEstado, nota || null, linkRastreio)

  return sendEmail(pedido.clienteEmail, subject, text)
}

/**
 * Envia email quando pedido é cancelado
 */
export async function enviarEmailPedidoCancelado(
  pedido: Pick<PedidoEmailData, 'numero' | 'clienteNome' | 'clienteEmail' | 'total'>,
  motivo?: string | null,
  jaFoiPago = false
): Promise<SendResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email do cliente não fornecido' }
  }

  const { subject, text } = emailPedidoCancelado(pedido, motivo || null, jaFoiPago)

  return sendEmail(pedido.clienteEmail, subject, text)
}

/**
 * Função principal para enviar email baseado na mudança de estado
 * Chamada quando o estado de um pedido é alterado
 */
export async function enviarEmailPorMudancaEstado(
  pedido: PedidoEmailData,
  estadoAnterior: string,
  estadoNovo: string,
  nota?: string | null
): Promise<SendResult> {
  // Não enviar se estado não mudou
  if (estadoAnterior === estadoNovo) {
    return { success: true, messageId: 'no-change' }
  }

  // Enviar email específico baseado no novo estado
  switch (estadoNovo) {
    case 'PAGO':
      return enviarEmailPagamentoConfirmado(pedido)

    case 'EM_PREPARACAO':
    case 'EM_TRANSITO':
    case 'ENTREGUE':
      return enviarEmailEstadoAlterado(pedido, estadoNovo, nota)

    case 'CANCELADO':
      const jaFoiPago = ['PAGO', 'EM_PREPARACAO', 'EM_TRANSITO'].includes(estadoAnterior)
      return enviarEmailPedidoCancelado(pedido, nota, jaFoiPago)

    default:
      console.log(`Estado ${estadoNovo} não requer email`)
      return { success: true, messageId: 'no-email-required' }
  }
}

// ==================== MANTER COMPATIBILIDADE COM CÓDIGO EXISTENTE ====================

/**
 * Dados do pedido formatados para envio de emails.
 * Serve como camada de abstração entre o modelo Prisma e os templates de email.
 * @deprecated Use PedidoEmailData do arquivo templates.ts
 */
export interface PedidoParaEmail {
  id: string
  numero: string
  clienteNome: string
  clienteEmail?: string | null
  clienteTelefone: string
  total: number
  subtotal: number
  taxaEntrega: number
  itens: Array<{
    produtoNome: string
    quantidade: number
    produtoPreco: number
    subtotal: number
  }>
  enderecoEntrega: {
    rua: string
    bairro: string
    municipio: string
    provincia: string
  }
  codigoRastreio: string
}

/**
 * @deprecated Use enviarEmailsPedidoCriado com PedidoEmailData
 */
export async function enviarEmailPedidoCriado(
  pedido: PedidoParaEmail
): Promise<{ cliente: SendResult; admin: SendResult }> {
  // Converter para o novo formato
  const pedidoNovo: PedidoEmailData = {
    id: pedido.id,
    numero: pedido.numero,
    clienteNome: pedido.clienteNome,
    clienteEmail: pedido.clienteEmail || null,
    clienteTelefone: pedido.clienteTelefone,
    itens: pedido.itens.map(item => ({
      nome: item.produtoNome,
      quantidade: item.quantidade,
      precoUnitario: item.produtoPreco,
      subtotal: item.subtotal,
    })),
    subtotal: pedido.subtotal,
    taxaEntrega: pedido.taxaEntrega,
    total: pedido.total,
    endereco: pedido.enderecoEntrega,
    codigoRastreio: pedido.codigoRastreio,
  }

  return enviarEmailsPedidoCriado(pedidoNovo)
}
