import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { enviarEmailPorMudancaEstado } from '@/lib/email/send'
import type { PedidoEmailData } from '@/lib/email/send'
import { parseEnderecoEntrega } from '@/types/pedido'
import { z } from 'zod'

const actualizarEstadoSchema = z.object({
  estado: z.enum(['PENDENTE', 'PAGO', 'EM_PREPARACAO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO']),
  nota: z.string().optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Validar dados
    const body = await request.json()
    const { estado: novoEstado, nota } = actualizarEstadoSchema.parse(body)

    // Obter pedido actual
    const pedidoActual = await prisma.pedido.findUnique({
      where: { id: params.id },
      include: { itens: true },
    })

    if (!pedidoActual) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    }

    const estadoAnterior = pedidoActual.estado

    // Não actualizar se estado é o mesmo
    if (estadoAnterior === novoEstado) {
      return NextResponse.json({ 
        message: 'Estado já é o actual',
        pedido: pedidoActual 
      })
    }

    // Determinar timestamps a actualizar
    const timestamps: Record<string, Date> = {}
    const now = new Date()

    switch (novoEstado) {
      case 'PAGO':
        timestamps.pagoEm = now
        break
      case 'EM_PREPARACAO':
        timestamps.preparadoEm = now
        break
      case 'EM_TRANSITO':
        timestamps.enviadoEm = now
        break
      case 'ENTREGUE':
        timestamps.entregueEm = now
        break
      case 'CANCELADO':
        timestamps.canceladoEm = now
        break
    }

    // Actualizar pedido
    const pedidoActualizado = await prisma.pedido.update({
      where: { id: params.id },
      data: {
        estado: novoEstado,
        ...timestamps,
        // Adicionar ao histórico
        estadoHistorico: {
          create: {
            estado: novoEstado,
            nota: nota || null,
            criadoPor: user.id,
          },
        },
      },
      include: { itens: true },
    })

    // ===== ENVIO DE EMAIL =====
    try {
      const pedidoParaEmail: PedidoEmailData = {
        id: pedidoActualizado.id,
        numero: pedidoActualizado.numero,
        clienteNome: pedidoActualizado.clienteNome,
        clienteEmail: pedidoActualizado.clienteEmail || '',
        itens: pedidoActualizado.itens.map((item: any) => ({
          nome: item.produtoNome,
          quantidade: item.quantidade,
          precoUnitario: Number(item.produtoPreco),
          subtotal: Number(item.subtotal),
        })),
        subtotal: Number(pedidoActualizado.subtotal),
        taxaEntrega: Number(pedidoActualizado.taxaEntrega),
        total: Number(pedidoActualizado.total),
        endereco: typeof pedidoActualizado.enderecoEntrega === 'string'
          ? parseEnderecoEntrega(pedidoActualizado.enderecoEntrega)
          : pedidoActualizado.enderecoEntrega,
        codigoRastreio: pedidoActualizado.codigoRastreio,
      }

      // Enviar email em background
      enviarEmailPorMudancaEstado(pedidoParaEmail, estadoAnterior, novoEstado, nota)
        .then(result => {
          console.log(`📧 Email enviado para mudança ${estadoAnterior} → ${novoEstado}:`, result)
        })
        .catch(err => {
          console.error('❌ Erro ao enviar email de mudança de estado:', err)
        })
    } catch (emailError) {
      console.error('❌ Erro ao preparar email de mudança de estado:', emailError)
    }
    // ===== FIM ENVIO DE EMAIL =====

    return NextResponse.json({
      message: `Estado actualizado de ${estadoAnterior} para ${novoEstado}`,
      pedido: pedidoActualizado,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('Erro ao actualizar estado:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}