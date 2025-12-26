import { resend, EMAIL_FROM, ADMIN_EMAIL } from './resend'
import {
  templatePedidoCriadoCliente,
  assuntoPedidoCriadoCliente,
} from './templates/pedido-criado-cliente'
import {
  templatePedidoCriadoAdmin,
  assuntoPedidoCriadoAdmin,
} from './templates/pedido-criado-admin'
import {
  templatePagamentoConfirmado,
  assuntoPagamentoConfirmado,
} from './templates/pagamento-confirmado'
import {
  templateEstadoAlterado,
  assuntoEstadoAlterado,
} from './templates/estado-alterado'
import {
  templatePedidoCancelado,
  assuntoPedidoCancelado,
} from './templates/pedido-cancelado'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Dados bancários (configuráveis via env)
const DADOS_BANCARIOS = {
  banco: process.env.BANCO_NOME || 'BFA - Banco de Fomento Angola',
  iban: process.env.BANCO_IBAN || 'AO06.0000.0000.0000.0000.0000.0',
  titular: process.env.BANCO_TITULAR || 'AgriConecta Lda',
}

interface EnviarEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

async function enviarEmail(
  to: string,
  subject: string,
  text: string
): Promise<EnviarEmailResult> {
  try {
    if (!process.env.RESEND_API_KEY || !resend) {
      console.warn('RESEND_API_KEY não configurada - email não enviado:', subject)
      return { success: false, error: 'API key não configurada' }
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      text,
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return { success: false, error: error.message }
    }

    console.log('Email enviado:', { to, subject, messageId: data?.id })
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: String(error) }
  }
}

// ==================== FUNÇÕES ESPECÍFICAS ====================

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

export async function enviarEmailPedidoCriado(
  pedido: PedidoParaEmail
): Promise<{ cliente: EnviarEmailResult; admin: EnviarEmailResult }> {
  const linkRastreio = `${APP_URL}/pedido/${pedido.id}/rastreio`
  const linkAdmin = `${APP_URL}/admin/pedidos/${pedido.id}`

  // Email para cliente (se tiver email)
  let clienteResult: EnviarEmailResult = { success: false, error: 'Email não fornecido' }
  
  if (pedido.clienteEmail) {
    const textoCliente = templatePedidoCriadoCliente({
      clienteNome: pedido.clienteNome,
      numeroPedido: pedido.numero,
      itens: pedido.itens.map(item => ({
        nome: item.produtoNome,
        quantidade: item.quantidade,
        preco: item.produtoPreco,
        subtotal: item.subtotal,
      })),
      subtotal: pedido.subtotal,
      taxaEntrega: pedido.taxaEntrega,
      total: pedido.total,
      endereco: pedido.enderecoEntrega,
      dadosBancarios: DADOS_BANCARIOS,
      linkRastreio,
    })

    clienteResult = await enviarEmail(
      pedido.clienteEmail,
      assuntoPedidoCriadoCliente(pedido.numero),
      textoCliente
    )
  }

  // Email para admin
  const textoAdmin = templatePedidoCriadoAdmin({
    numeroPedido: pedido.numero,
    clienteNome: pedido.clienteNome,
    clienteEmail: pedido.clienteEmail || '',
    clienteTelefone: pedido.clienteTelefone,
    total: pedido.total,
    totalItens: pedido.itens.reduce((acc, item) => acc + item.quantidade, 0),
    provincia: pedido.enderecoEntrega.provincia,
    linkAdmin,
  })

  const adminResult = await enviarEmail(
    ADMIN_EMAIL,
    assuntoPedidoCriadoAdmin(pedido.numero),
    textoAdmin
  )

  return { cliente: clienteResult, admin: adminResult }
}

export async function enviarEmailPagamentoConfirmado(
  pedido: Pick<PedidoParaEmail, 'id' | 'numero' | 'clienteNome' | 'clienteEmail' | 'total'>
): Promise<EnviarEmailResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email não fornecido' }
  }

  const linkRastreio = `${APP_URL}/pedido/${pedido.id}/rastreio`

  const texto = templatePagamentoConfirmado({
    clienteNome: pedido.clienteNome,
    numeroPedido: pedido.numero,
    total: pedido.total,
    linkRastreio,
  })

  return enviarEmail(
    pedido.clienteEmail,
    assuntoPagamentoConfirmado(pedido.numero),
    texto
  )
}

export async function enviarEmailEstadoAlterado(
  pedido: Pick<PedidoParaEmail, 'id' | 'numero' | 'clienteNome' | 'clienteEmail'>,
  estadoAnterior: string,
  estadoNovo: string,
  mensagem?: string
): Promise<EnviarEmailResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email não fornecido' }
  }

  const linkRastreio = `${APP_URL}/pedido/${pedido.id}/rastreio`

  const texto = templateEstadoAlterado({
    clienteNome: pedido.clienteNome,
    numeroPedido: pedido.numero,
    estadoAnterior,
    estadoNovo,
    mensagem: mensagem || '',
    linkRastreio,
  })

  return enviarEmail(
    pedido.clienteEmail,
    assuntoEstadoAlterado(pedido.numero, estadoNovo),
    texto
  )
}

export async function enviarEmailPedidoCancelado(
  pedido: Pick<PedidoParaEmail, 'numero' | 'clienteNome' | 'clienteEmail' | 'total'>,
  motivo?: string,
  reembolso = false
): Promise<EnviarEmailResult> {
  if (!pedido.clienteEmail) {
    return { success: false, error: 'Email não fornecido' }
  }

  const texto = templatePedidoCancelado({
    clienteNome: pedido.clienteNome,
    numeroPedido: pedido.numero,
    total: pedido.total,
    motivo,
    reembolso,
  })

  return enviarEmail(
    pedido.clienteEmail,
    assuntoPedidoCancelado(pedido.numero),
    texto
  )
}
