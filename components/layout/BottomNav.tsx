'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';

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
    href: '/carrinho',
    label: 'Carrinho',
    icon: ShoppingCart,
    showBadge: true,
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
  const { itemCount } = useCart();

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
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-3 transition-all active:scale-95 relative ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.showBadge && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
