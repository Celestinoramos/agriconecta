'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption =
  | 'nome-asc'
  | 'nome-desc'
  | 'preco-asc'
  | 'preco-desc'
  | 'recentes';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: 'nome-asc' as SortOption, label: 'Nome: A → Z' },
  { value: 'nome-desc' as SortOption, label: 'Nome: Z → A' },
  { value: 'preco-asc' as SortOption, label: 'Preço: Menor → Maior' },
  { value: 'preco-desc' as SortOption, label: 'Preço: Maior → Menor' },
  { value: 'recentes' as SortOption, label: 'Mais Recentes' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Ordenar por:
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort-select" className="w-full sm:w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
