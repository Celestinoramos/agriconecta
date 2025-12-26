'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, X } from 'lucide-react';

export interface ProductFiltersState {
  categoria: string;
  precoMin: string;
  precoMax: string;
  provincia: string;
  produtor: string;
  emStock: boolean;
  avaliacao: number;
}

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onChange: (filters: ProductFiltersState) => void;
  categorias: string[];
  provincias: string[];
  produtores: string[];
}

export default function ProductFilters({
  filters,
  onChange,
  categorias,
  provincias,
  produtores,
}: ProductFiltersProps) {
  const updateFilter = (key: keyof ProductFiltersState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({
      categoria: '',
      precoMin: '',
      precoMax: '',
      provincia: '',
      produtor: '',
      emStock: false,
      avaliacao: 0,
    });
  };

  const activeFiltersCount = [
    filters.categoria,
    filters.precoMin,
    filters.precoMax,
    filters.provincia,
    filters.produtor,
    filters.emStock,
    filters.avaliacao > 0,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header with clear button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoria</Label>
        <Select
          value={filters.categoria}
          onValueChange={(value) => updateFilter('categoria', value)}
        >
          <SelectTrigger id="categoria">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as categorias</SelectItem>
            {categorias.map((categoria) => (
              <SelectItem key={categoria} value={categoria}>
                {categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label>Faixa de Preço (AOA)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Mínimo"
              value={filters.precoMin}
              onChange={(e) => updateFilter('precoMin', e.target.value)}
              min="0"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Máximo"
              value={filters.precoMax}
              onChange={(e) => updateFilter('precoMax', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Province Filter */}
      <div className="space-y-2">
        <Label htmlFor="provincia">Província</Label>
        <Select
          value={filters.provincia}
          onValueChange={(value) => updateFilter('provincia', value)}
        >
          <SelectTrigger id="provincia">
            <SelectValue placeholder="Todas as províncias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as províncias</SelectItem>
            {provincias.map((provincia) => (
              <SelectItem key={provincia} value={provincia}>
                {provincia}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Producer Filter */}
      <div className="space-y-2">
        <Label htmlFor="produtor">Produtor</Label>
        <Select
          value={filters.produtor}
          onValueChange={(value) => updateFilter('produtor', value)}
        >
          <SelectTrigger id="produtor">
            <SelectValue placeholder="Todos os produtores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os produtores</SelectItem>
            {produtores.map((produtor) => (
              <SelectItem key={produtor} value={produtor}>
                {produtor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* In Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="emStock"
          checked={filters.emStock}
          onCheckedChange={(checked) => updateFilter('emStock', checked === true)}
        />
        <Label
          htmlFor="emStock"
          className="text-sm font-normal cursor-pointer"
        >
          Apenas produtos em stock
        </Label>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <Label>Avaliação Mínima</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilter('avaliacao', rating === filters.avaliacao ? 0 : rating)}
              className="p-1 hover:scale-110 transition-transform"
              aria-label={`${rating} estrelas`}
            >
              <Star
                className={`h-6 w-6 ${
                  rating <= filters.avaliacao
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {filters.avaliacao > 0 && (
          <p className="text-xs text-gray-500">
            {filters.avaliacao}+ estrelas
          </p>
        )}
      </div>
    </div>
  );
}
