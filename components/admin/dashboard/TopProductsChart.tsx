'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface TopProductsChartProps {
  data: {
    nome: string
    quantidade: number
    receita: number
  }[]
}

const COLORS = [
  '#22c55e', // green-600
  '#3b82f6', // blue-600
  '#f59e0b', // amber-600
  '#8b5cf6', // violet-600
  '#ec4899', // pink-600
]

export function TopProductsChart({ data }: TopProductsChartProps) {
  const formatCurrency = (value: number) => {
    return `${(value / 1000).toFixed(0)}k Kz`
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis
            type="number"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <YAxis
            type="category"
            dataKey="nome"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'receita') {
                return [`${value.toLocaleString('pt-AO')} Kz`, 'Receita']
              }
              return [value, 'Quantidade']
            }}
          />
          <Bar
            dataKey="receita"
            radius={[0, 8, 8, 0]}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
