import { formatarPreco } from '@/lib/cart'

interface PedidoCriadoClienteParams {
  clienteNome: string
  numeroPedido: string
  itens: Array<{
    nome: string
    quantidade: number
    preco: number
    subtotal: number
  }>
  subtotal: number
  taxaEntrega: number
  total: number
  endereco: {
    rua: string
    bairro: string
    municipio: string
    provincia: string
  }
  dadosBancarios: {
    banco: string
    iban: string
    titular: string
  }
  linkRastreio: string
}

export function templatePedidoCriadoCliente(params: PedidoCriadoClienteParams): string {
  const {
    clienteNome,
    numeroPedido,
    itens,
    subtotal,
    taxaEntrega,
    total,
    endereco,
    dadosBancarios,
    linkRastreio,
  } = params

  const listaItens = itens
    .map(item => `  • ${item.nome} x${item.quantidade} - ${formatarPreco(item.subtotal)}`)
    .join('\n')

  return `
Olá ${clienteNome}!

O seu pedido foi recebido com sucesso!

═══════════════════════════════════════
PEDIDO: ${numeroPedido}
═══════════════════════════════════════

ITENS DO PEDIDO:
${listaItens}

───────────────────────────────────────
Subtotal: ${formatarPreco(subtotal)}
Taxa de Entrega: ${formatarPreco(taxaEntrega)}
TOTAL: ${formatarPreco(total)}
───────────────────────────────────────

ENDEREÇO DE ENTREGA:
${endereco.rua}
${endereco.bairro}, ${endereco.municipio}
${endereco.provincia}

═══════════════════════════════════════
DADOS PARA PAGAMENTO
═══════════════════════════════════════

Banco: ${dadosBancarios.banco}
IBAN: ${dadosBancarios.iban}
Titular: ${dadosBancarios.titular}
Valor: ${formatarPreco(total)}
Referência: ${numeroPedido}

Após efectuar a transferência, o pagamento será confirmado automaticamente ou pode enviar o comprovativo para acelerar o processo.

═══════════════════════════════════════

Acompanhe o seu pedido:
${linkRastreio}

Obrigado por escolher o AgriConecta!

---
AgriConecta - Marketplace Agrícola de Angola
Este email foi enviado automaticamente. Por favor não responda.
`.trim()
}

export function assuntoPedidoCriadoCliente(numeroPedido: string): string {
  return `Pedido ${numeroPedido} recebido - AgriConecta`
}
