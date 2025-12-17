import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { obterPedidoPorId } from '@/lib/db/pedidos';
import { gerarQRCodePagamento } from '@/lib/qrcode';
import { gerarFaturaPDF } from '@/lib/pdf/fatura';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pedido = await obterPedidoPorId(params.id);

    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Generate QR Code
    let qrCodeUrl: string | undefined;
    try {
      qrCodeUrl = await gerarQRCodePagamento({
        banco: process.env.NEXT_PUBLIC_BANCO_NOME || 'BFA - Banco de Fomento Angola',
        iban: process.env.NEXT_PUBLIC_BANCO_IBAN || 'AO06000000000000000000000',
        valor: Number(pedido.total),
        referencia: pedido.numero,
      });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }

    // Generate PDF
    const pdfDoc = gerarFaturaPDF({ pedido, qrCodeUrl });
    const buffer = await renderToBuffer(pdfDoc);

    // Return PDF
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="fatura-${pedido.numero}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar fatura PDF' },
      { status: 500 }
    );
  }
}
