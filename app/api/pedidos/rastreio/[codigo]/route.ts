import { NextRequest, NextResponse } from 'next/server';
import { obterPedidoPorCodigoRastreio } from '@/lib/db/pedidos';

export async function GET(
  _request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const pedido = await obterPedidoPorCodigoRastreio(params.codigo);
    
    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }
    
    // Retornar apenas dados públicos para rastreio
    return NextResponse.json({
      id: pedido.id,
      numero: pedido.numero,
      estado: pedido.estado,
      estadoHistorico: pedido.estadoHistorico,
      criadoEm: pedido.criadoEm,
      pagoEm: pedido.pagoEm,
      enviadoEm: pedido.enviadoEm,
      entregueEm: pedido.entregueEm,
      itens: pedido.itens.map(item => ({
        nome: item.produtoNome,
        quantidade: item.quantidade,
      })),
    });
  } catch (error) {
    console.error('Erro ao rastrear pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao rastrear pedido' },
      { status: 500 }
    );
  }
}
