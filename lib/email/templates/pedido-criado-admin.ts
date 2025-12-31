import { formatarPreco } from '@/lib/cart'

interface PedidoCriadoAdminParams {
  numeroPedido: string
  clienteNome: string
  clienteEmail: string
  : string
  total: number
  totalItens: number
  provincia: string
  linkAdmin: string
}

export function templatePedidoCriadoAdmin(params: PedidoCriadoAdminParams): string {
  const {
    numeroPedido,
    clienteNome,
    clienteEmail,
    ,
    total,
    totalItens,
    provincia,
    linkAdmin,
  } = params

  return `
NOVO PEDIDO RECEBIDO!

═══════════════════════════════════════
PEDIDO: ${numeroPedido}
═══════════════════════════════════════

Cliente: ${clienteNome}
Email: ${clienteEmail || 'Não fornecido'}
Telefone: ${}
Província: ${provincia}

Total de Itens: ${totalItens}
Valor Total: ${formatarPreco(total)}

Estado: PENDENTE (Aguardando pagamento)

───────────────────────────────────────

Ver detalhes do pedido:
${linkAdmin}

---
AgriConecta - Sistema de Notificações
`.trim()
}

export function assuntoPedidoCriadoAdmin(numeroPedido: string): string {
  return `🆕 Novo Pedido ${numeroPedido} - AgriConecta`
}
