import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { obterPedidoPorId } from '@/lib/db/pedidos';
import { gerarQRCodePagamento } from '@/lib/qrcode';
import FaturaPDF from '@/lib/pdf/fatura';

export async function GET(
  request: NextRequest,
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
    const stream = await renderToStream(
      <FaturaPDF pedido={pedido} qrCodeUrl={qrCodeUrl} />
    );

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return PDF
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="fatura-${pedido.numero}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar fatura PDF' },
      { status: 500 }
    );
  }
}
