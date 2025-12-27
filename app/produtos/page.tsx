export const dynamic = "force-dynamic";

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductFilters, { ProductFiltersState } from '@/components/filters/ProductFilters';
import MobileFiltersDrawer from '@/components/filters/MobileFiltersDrawer';
import SortSelect, { SortOption } from '@/components/filters/SortSelect';
import InfiniteProductGrid from '@/components/products/InfiniteProductGrid';
import RecentlyViewed from '@/components/products/RecentlyViewed';
import EmptyState, { defaultIcons } from '@/components/ui/EmptyState';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useSearchParams } from 'next/navigation';
import produtos from '@/data/produtos.json';

const PAGE_SIZE = 12;

export default function ProdutosPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Extract unique values for filters
  const categorias = useMemo(() => Array.from(new Set(produtos.map(p => p.categoria))), []);
  const provincias = useMemo(() => Array.from(new Set(produtos.map(p => p.provincia))), []);
  const produtores = useMemo(() => Array.from(new Set(produtos.map(p => p.produtor))), []);

  const [filters, setFilters] = useState<ProductFiltersState>({
    categoria: '',
    precoMin: '',
    precoMax: '',
    provincia: '',
    produtor: '',
    emStock: false,
    avaliacao: 0,
  });

  const [sortBy, setSortBy] = useState<SortOption>('nome-asc');

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    let filtered = [...produtos];

    // Search filter
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.nome.toLowerCase().includes(queryLower) ||
        p.categoria.toLowerCase().includes(queryLower) ||
        p.produtor.toLowerCase().includes(queryLower) ||
        p.descricao.toLowerCase().includes(queryLower)
      );
    }

    // Category filter
    if (filters.categoria) {
      filtered = filtered.filter(p => p.categoria === filters.categoria);
    }

    // Price range filter
    if (filters.precoMin) {
      filtered = filtered.filter(p => p.preco >= Number(filters.precoMin));
    }
    if (filters.precoMax) {
      filtered = filtered.filter(p => p.preco <= Number(filters.precoMax));
    }

    // Province filter
    if (filters.provincia) {
      filtered = filtered.filter(p => p.provincia === filters.provincia);
    }

    // Producer filter
    if (filters.produtor) {
      filtered = filtered.filter(p => p.produtor === filters.produtor);
    }

    // In stock filter
    if (filters.emStock) {
      filtered = filtered.filter(p => p.disponibilidade === true);
    }

    // Rating filter
    if (filters.avaliacao > 0) {
      filtered = filtered.filter(p => {
        // @ts-ignore - mediaAvaliacoes might not exist in JSON
        const rating = p.mediaAvaliacoes || 0;
        return rating >= filters.avaliacao;
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'nome-asc':
        sorted.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
        break;
      case 'nome-desc':
        sorted.sort((a, b) => b.nome.localeCompare(a.nome, 'pt'));
        break;
      case 'preco-asc':
        sorted.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-desc':
        sorted.sort((a, b) => b.preco - a.preco);
        break;
      case 'recentes':
        // Assuming products with higher IDs are more recent
        sorted.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  // Pagination for infinite scroll
  const initialProducts = sortedProducts.slice(0, PAGE_SIZE);

  const handleLoadMore = async (page: number): Promise<any[]> => {
    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    
    // Simulate async load (in real app, this would be an API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sortedProducts.slice(startIndex, endIndex));
      }, 300);
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-green-100 hover:text-white mb-3 inline-flex items-center min-h-[44px] active:scale-95 transition-transform sm:mb-4">
            <span className="mr-2">←</span>
            <span>Voltar para Início</span>
          </Link>
          <h1 className="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl md:mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Catálogo de Produtos'}
          </h1>
          <p className="text-base text-green-100 sm:text-lg md:text-xl">
            {searchQuery
              ? `${sortedProducts.length} ${sortedProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`
              : 'Produtos frescos e de qualidade diretamente dos agricultores angolanos'}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Produtos', href: '/produtos' },
          ]}
        />
      </div>

      {/* Main Content */}
      <section className="py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
                <ProductFilters
                  filters={filters}
                  onChange={setFilters}
                  categorias={categorias}
                  provincias={provincias}
                  produtores={produtores}
                />
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar - Mobile Filters + Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div className="lg:hidden">
                  <MobileFiltersDrawer
                    filters={filters}
                    onChange={setFilters}
                    categorias={categorias}
                    provincias={provincias}
                    produtores={produtores}
                  />
                </div>
                <div className="flex-1 sm:flex sm:justify-end">
                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {/* Products Grid or Empty State */}
              {sortedProducts.length === 0 ? (
                <EmptyState
                  title={searchQuery ? 'Nenhum resultado encontrado' : 'Nenhum produto disponível'}
                  description={
                    searchQuery
                      ? 'Tente ajustar os filtros ou usar termos de pesquisa diferentes.'
                      : 'Não há produtos que correspondam aos filtros selecionados.'
                  }
                  icon={searchQuery ? defaultIcons.search : defaultIcons.filter}
                  action={{
                    label: searchQuery ? 'Ver Todos os Produtos' : 'Limpar Filtros',
                    onClick: () => {
                      if (searchQuery) {
                        window.location.href = '/produtos';
                      } else {
                        setFilters({
                          categoria: '',
                          precoMin: '',
                          precoMax: '',
                          provincia: '',
                          produtor: '',
                          emStock: false,
                          avaliacao: 0,
                        });
                      }
                    },
                  }}
                />
              ) : (
                <InfiniteProductGrid
                  initialProducts={initialProducts}
                  totalProducts={sortedProducts.length}
                  onLoadMore={handleLoadMore}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Info Section */}
      <section className="py-10 px-4 bg-white sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3 sm:text-2xl md:mb-4">Precisa de ajuda?</h2>
          <p className="text-gray-600 mb-5 text-sm sm:text-base md:mb-6">
            Entre em contacto connosco para mais informações sobre os produtos ou para fazer pedidos em quantidade.
          </p>
        </div>
      </section>
    </main>
  );
}