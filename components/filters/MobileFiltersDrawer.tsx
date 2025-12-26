'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Filter } from 'lucide-react';
import ProductFilters, { ProductFiltersState } from './ProductFilters';

interface MobileFiltersDrawerProps {
  filters: ProductFiltersState;
  onChange: (filters: ProductFiltersState) => void;
  categorias: string[];
  provincias: string[];
  produtores: string[];
}

export default function MobileFiltersDrawer({
  filters,
  onChange,
  categorias,
  provincias,
  produtores,
}: MobileFiltersDrawerProps) {
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative min-h-[44px]">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-600 text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtrar Produtos</DrawerTitle>
          <DrawerDescription>
            Aplique filtros para encontrar os produtos perfeitos
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
          <ProductFilters
            filters={filters}
            onChange={onChange}
            categorias={categorias}
            provincias={provincias}
            produtores={produtores}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full min-h-[44px]">Aplicar Filtros</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
