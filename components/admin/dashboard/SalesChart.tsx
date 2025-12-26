'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SalesChartProps {
  data: {
    date: string
    vendas: number
    pedidos: number
  }[]
  groupBy: 'day' | 'week' | 'month'
}

export function SalesChart({ data, groupBy }: SalesChartProps) {
  const formatCurrency = (value: number) => {
    return `${(value / 1000).toFixed(0)}k Kz`
  }

  const getXAxisLabel = () => {
    switch (groupBy) {
      case 'day':
        return 'Dia'
      case 'week':
        return 'Semana'
      case 'month':
        return 'Mês'
    }
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'vendas') {
                return [`${value.toLocaleString('pt-AO')} Kz`, 'Vendas']
              }
              return [value, 'Pedidos']
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
            formatter={(value) => {
              if (value === 'vendas') return 'Vendas (Kz)'
              if (value === 'pedidos') return 'Número de Pedidos'
              return value
            }}
          />
          <Line
            type="monotone"
            dataKey="vendas"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pedidos"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
