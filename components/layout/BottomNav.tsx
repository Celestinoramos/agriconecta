'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Briefcase, Truck } from 'lucide-react';

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
    icon: Truck,
  },
  {
    href: '/servicos',
    label: 'Serviços',
    icon: Briefcase,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

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
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-4 transition-all active:scale-95 ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
