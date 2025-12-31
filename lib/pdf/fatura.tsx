import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Pedido, ItemPedido, parseEnderecoEntrega } from '@/types/pedido';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #22c55e',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  companyDetails: {
    fontSize: 9,
    color: '#666',
    marginBottom: 2,
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 9,
    color: '#666',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid #ddd',
    paddingBottom: 5,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottom: '1 solid #eee',
  },
  col1: { width: '40%' },
  col2: { width: '15%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '25%', textAlign: 'right' },
  totalsSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTop: '1 solid #ddd',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
  },
  totalValue: {
    width: '25%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 5,
  },
  paymentSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 5,
  },
  qrCodeSection: {
    marginTop: 15,
    alignItems: 'center',
  },
  qrCode: {
    width: 120,
    height: 120,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: '1 solid #ddd',
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
  warning: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fef3c7',
    borderLeft: '3 solid #f59e0b',
  },
  warningText: {
    fontSize: 9,
    color: '#92400e',
  },
});

interface FaturaPDFProps {
  pedido: Pedido & { itens: ItemPedido[] };
  qrCodeUrl?: string;
}

const FaturaPDF: React.FC<FaturaPDFProps> = ({ pedido, qrCodeUrl }) => {
  const enderecoEntrega = parseEnderecoEntrega(pedido.enderecoEntrega);
  const dataEmissao = pedido.faturaGeradaEm 
    ? new Date(pedido.faturaGeradaEm).toLocaleDateString('pt-AO')
    : new Date().toLocaleDateString('pt-AO');

  const formatarValor = (valor: number | string) => {
    const num = typeof valor === 'string' ? parseFloat(valor) : valor;
    return new Intl.NumberFormat('pt-AO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num) + ' AOA';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>FATURA</Text>
          <Text style={styles.companyName}>AgriConecta</Text>
          <Text style={styles.companyDetails}>Marketplace Agrícola de Angola</Text>
          <Text style={styles.companyDetails}>Luanda, Angola</Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Número da Fatura</Text>
              <Text style={styles.value}>{pedido.faturaNumero}</Text>
            </View>
            <View>
              <Text style={styles.label}>Número do Pedido</Text>
              <Text style={styles.value}>{pedido.numero}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Data de Emissão</Text>
              <Text style={styles.value}>{dataEmissao}</Text>
            </View>
            <View>
              <Text style={styles.label}>Validade</Text>
              <Text style={styles.value}>48 horas</Text>
            </View>
          </View>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Cliente</Text>
          <Text>{pedido.clienteNome}</Text>
          <Text>{pedido.}</Text>
          {pedido.clienteEmail && <Text>{pedido.clienteEmail}</Text>}
          <View style={{ marginTop: 8 }}>
            <Text style={styles.label}>Endereço de Entrega:</Text>
            <Text>{enderecoEntrega.rua}</Text>
            <Text>{enderecoEntrega.bairro}, {enderecoEntrega.municipio}</Text>
            <Text>{enderecoEntrega.provincia}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itens do Pedido</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Produto</Text>
              <Text style={styles.col2}>Qtd</Text>
              <Text style={styles.col3}>Preço Unit.</Text>
              <Text style={styles.col4}>Subtotal</Text>
            </View>
            {pedido.itens.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.col1}>
                  <Text>{item.produtoNome}</Text>
                  <Text style={{ fontSize: 8, color: '#999' }}>
                    {item.produtoUnidade}
                  </Text>
                </View>
                <Text style={styles.col2}>{item.quantidade}</Text>
                <Text style={styles.col3}>
                  {formatarValor(Number(item.produtoPreco))}
                </Text>
                <Text style={styles.col4}>
                  {formatarValor(Number(item.subtotal))}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              {formatarValor(Number(pedido.subtotal))}
            </Text>
          </View>
          {Number(pedido.taxaEntrega) > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Taxa de Entrega:</Text>
              <Text style={styles.totalValue}>
                {formatarValor(Number(pedido.taxaEntrega))}
              </Text>
            </View>
          )}
          {Number(pedido.desconto) > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Desconto:</Text>
              <Text style={[styles.totalValue, { color: '#22c55e' }]}>
                -{formatarValor(Number(pedido.desconto))}
              </Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 10, paddingTop: 10, borderTop: '2 solid #22c55e' }]}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>TOTAL:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>
              {formatarValor(Number(pedido.total))}
            </Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Dados Bancários para Pagamento</Text>
          <View style={{ marginTop: 5 }}>
            <View style={styles.row}>
              <Text style={styles.label}>Banco:</Text>
              <Text style={styles.value}>
                {process.env.NEXT_PUBLIC_BANCO_NOME || 'BFA - Banco de Fomento Angola'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>IBAN:</Text>
              <Text style={styles.value}>
                {process.env.NEXT_PUBLIC_BANCO_IBAN || 'AO06000000000000000000000'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Titular:</Text>
              <Text style={styles.value}>
                {process.env.NEXT_PUBLIC_BANCO_TITULAR || 'AgriConecta Lda'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Referência:</Text>
              <Text style={styles.value}>{pedido.numero}</Text>
            </View>
          </View>
        </View>

        {/* QR Code */}
        {qrCodeUrl && (
          <View style={styles.qrCodeSection}>
            <Text style={{ fontSize: 9, marginBottom: 8, color: '#666' }}>
              Pague com QR Code:
            </Text>
            <Image src={qrCodeUrl} style={styles.qrCode} />
          </View>
        )}

        {/* Warning */}
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠️ Esta fatura é válida por 48 horas. Após esse período, o pedido pode ser cancelado.
          </Text>
          <Text style={[styles.warningText, { marginTop: 5 }]}>
            ℹ️ Este documento não serve como recibo fiscal. Um recibo oficial será emitido após confirmação do pagamento.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>AgriConecta - Marketplace Agrícola de Angola</Text>
          <Text>Este documento foi gerado automaticamente em {dataEmissao}</Text>
        </View>
      </Page>
    </Document>
  );
};

export function gerarFaturaPDF(props: FaturaPDFProps) {
  return <FaturaPDF {...props} />;
}

export default FaturaPDF;
