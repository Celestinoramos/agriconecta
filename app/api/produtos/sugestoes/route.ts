import { NextRequest, NextResponse } from 'next/server';
import produtos from '@/data/produtos.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const queryLower = query.toLowerCase().trim();

  // Search in product name, category, and producer
  const filteredProducts = produtos
    .filter((produto) => {
      const nomeLower = produto.nome.toLowerCase();
      const categoriaLower = produto.categoria.toLowerCase();
      const produtorLower = produto.produtor.toLowerCase();
      
      return (
        nomeLower.includes(queryLower) ||
        categoriaLower.includes(queryLower) ||
        produtorLower.includes(queryLower)
      );
    })
    .slice(0, 5) // Limit to 5 suggestions
    .map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      slug: produto.slug,
    }));

  return NextResponse.json({ suggestions: filteredProducts });
}
