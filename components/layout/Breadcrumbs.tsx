'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4">
      <ol className="flex items-center gap-2 text-sm">
        {/* Home Link */}
        <li>
          <Link
            href="/"
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
            aria-label="Início"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Início</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === '/') {
    return [];
  }

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Map of paths to labels (Portuguese)
  const labelMap: Record<string, string> = {
    produtos: 'Produtos',
    produto: 'Produto',
    carrinho: 'Carrinho',
    checkout: 'Finalizar Compra',
    pedido: 'Pedidos',
    'minha-conta': 'Minha Conta',
    dicas: 'Dicas',
    servicos: 'Serviços',
    sobre: 'Sobre',
    contacto: 'Contacto',
    faq: 'Perguntas Frequentes',
    rastreio: 'Rastreio',
    admin: 'Administração',
    pedidos: 'Pedidos',
    utilizadores: 'Utilizadores',
    configuracoes: 'Configurações',
    login: 'Entrar',
    registar: 'Registar',
    termos: 'Termos de Uso',
    privacidade: 'Privacidade',
  };

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip IDs (dynamic routes) - they're typically after a known segment
    if (index > 0 && !isNaN(Number(segment)) || segment.length > 20) {
      return;
    }

    const label = labelMap[segment] || capitalizeFirst(segment);
    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
