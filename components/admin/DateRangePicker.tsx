'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface DateRange {
  start: Date
  end: Date
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

const presets = [
  { label: 'Hoje', getValue: () => ({ start: new Date(), end: new Date() }) },
  { label: '7 dias', getValue: () => ({ start: subDays(new Date(), 6), end: new Date() }) },
  { label: '30 dias', getValue: () => ({ start: subDays(new Date(), 29), end: new Date() }) },
  { 
    label: 'Este mês', 
    getValue: () => ({ 
      start: startOfMonth(new Date()), 
      end: endOfMonth(new Date()) 
    }) 
  },
  { 
    label: 'Mês passado', 
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1)
      return { 
        start: startOfMonth(lastMonth), 
        end: endOfMonth(lastMonth) 
      }
    }
  },
  { label: '3 meses', getValue: () => ({ start: subMonths(new Date(), 3), end: new Date() }) },
  { label: '12 meses', getValue: () => ({ start: subMonths(new Date(), 12), end: new Date() }) },
]

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [startInput, setStartInput] = useState(format(value.start, 'yyyy-MM-dd'))
  const [endInput, setEndInput] = useState(format(value.end, 'yyyy-MM-dd'))

  const handlePresetClick = (preset: typeof presets[0]) => {
    const range = preset.getValue()
    onChange(range)
    setShowCustom(false)
  }

  const handleCustomApply = () => {
    try {
      const start = new Date(startInput)
      const end = new Date(endInput)
      
      if (start > end) {
        alert('A data de início deve ser anterior à data de fim')
        return
      }
      
      onChange({ start, end })
      setShowCustom(false)
    } catch (error) {
      alert('Datas inválidas')
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">
            {format(value.start, 'dd/MM/yyyy', { locale: ptBR })} - {format(value.end, 'dd/MM/yyyy', { locale: ptBR })}
          </span>
        </div>
        
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {preset.label}
          </button>
        ))}
        
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Personalizado
        </button>
      </div>
      
      {showCustom && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border rounded-lg shadow-lg z-10">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início
              </label>
              <input
                type="date"
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Fim
              </label>
              <input
                type="date"
                value={endInput}
                onChange={(e) => setEndInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCustomApply}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Aplicar
              </button>
              <button
                onClick={() => setShowCustom(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
