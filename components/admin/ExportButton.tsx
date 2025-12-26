'use client'

import { Download } from 'lucide-react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'

interface ExportButtonProps {
  title: string
  data: any[]
  columns: {
    header: string
    dataKey: string
    width?: number
  }[]
  summary?: {
    label: string
    value: string | number
  }[]
  fileName?: string
}

export function ExportButton({ title, data, columns, summary, fileName }: ExportButtonProps) {
  const handleExport = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setTextColor(34, 197, 94) // green-600
    doc.text('AgriConecta', 14, 20)
    
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(title, 14, 30)
    
    // Generation date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 37)
    
    let yPosition = 45
    
    // Summary section
    if (summary && summary.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text('Resumo', 14, yPosition)
      yPosition += 5
      
      const summaryData = summary.map(item => [item.label, item.value.toString()])
      
      autoTable(doc, {
        startY: yPosition,
        head: [],
        body: summaryData,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 2,
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 'auto' },
        },
      })
      
      yPosition = (doc as any).lastAutoTable.finalY + 10
    }
    
    // Main data table
    if (data.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text('Dados Detalhados', 14, yPosition)
      yPosition += 5
      
      const headers = columns.map(col => col.header)
      const body = data.map(row => 
        columns.map(col => {
          const value = row[col.dataKey]
          if (value === null || value === undefined) return '-'
          if (typeof value === 'number') {
            // Format numbers with thousands separator
            return value.toLocaleString('pt-AO')
          }
          return value.toString()
        })
      )
      
      autoTable(doc, {
        startY: yPosition,
        head: [headers],
        body: body,
        theme: 'striped',
        headStyles: {
          fillColor: [34, 197, 94], // green-600
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: columns.reduce((acc, col, idx) => {
          if (col.width) {
            acc[idx] = { cellWidth: col.width }
          }
          return acc
        }, {} as any),
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      })
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      )
    }
    
    // Save PDF
    const finalFileName = fileName || `${title.toLowerCase().replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.pdf`
    doc.save(finalFileName)
  }
  
  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <Download className="w-4 h-4" />
      Exportar PDF
    </button>
  )
}
