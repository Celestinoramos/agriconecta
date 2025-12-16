import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProdutoDetalhado } from '@/types/produto';

interface ProductBreadcrumbProps {
  produto: ProdutoDetalhado;
}

export default function ProductBreadcrumb({ produto }: ProductBreadcrumbProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link 
            href="/" 
            className="hover:text-green-600 transition-colors"
          >
            Início
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li>
          <Link 
            href="/produtos" 
            className="hover:text-green-600 transition-colors"
          >
            Produtos
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li>
          <Link 
            href={`/produtos?categoria=${produto.categoria}`}
            className="hover:text-green-600 transition-colors"
          >
            {produto.categoria}
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li className="text-gray-900 font-medium truncate">
          <span className="hidden sm:inline">{produto.nome}</span>
          <span className="sm:hidden">{truncateText(produto.nome, 20)}</span>
        </li>
      </ol>
    </nav>
  );
}
