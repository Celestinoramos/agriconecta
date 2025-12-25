'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, Package, ShoppingBag, User } from 'lucide-react';

const navItems = [
  {
    href: '/',
    label: 'Início',
    icon: Home,
  },
  {
    href: '/produtos',
    label: 'Produtos',
    icon: ShoppingBag,
  },
  {
    href: '/rastreio',
    label: 'Rastreio',
    icon: Package,
  },
  {
    href: '/dicas',
    label: 'Dicas',
    icon: BookOpen
  },
  {
    href: '/minha-conta',
    label: 'Conta',
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 pb-[env(safe-area-inset-bottom,0)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-3 transition-all active:scale-95 ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
