import QRCode from 'qrcode';

export async function gerarQRCodePagamento(dados: {
  banco: string;
  iban: string;
  valor: number;
  referencia: string;
}): Promise<string> {
  // Gerar QR Code como data URL (base64)
  // Formato: dados estruturados para facilitar pagamento
  const conteudo = `
${dados.banco}
IBAN: ${dados.iban}
Valor: ${dados.valor} AOA
Ref: ${dados.referencia}
  `.trim();
  
  return QRCode.toDataURL(conteudo, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: 'M',
  });
}
