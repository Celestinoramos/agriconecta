'use client';

import Link from 'next/link';
import { User, LogOut, ShoppingBag, MapPin, Settings } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    nome?: string;
    email?: string;
    isAdmin?: boolean;
  };
  onSignOut: () => void;
}

/**
 * User Menu Dropdown Component
 * Displays user account options in a dropdown menu
 */
export default function UserMenu({ isOpen, onClose, user, onSignOut }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20"
      role="menu"
      aria-orientation="vertical"
    >
      {/* User Info */}
      <div className="p-4 border-b">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.nome || user.email?.split('@')[0] || 'Utilizador'}
        </p>
        {user.email && (
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        )}
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          href="/minha-conta"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
          role="menuitem"
        >
          <User className="w-4 h-4" />
          Minha Conta
        </Link>

        <Link
          href="/pedido"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
          role="menuitem"
        >
          <ShoppingBag className="w-4 h-4" />
          Meus Pedidos
        </Link>

        <Link
          href="/minha-conta#enderecos"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
          role="menuitem"
        >
          <MapPin className="w-4 h-4" />
          Meus Endereços
        </Link>

        {user.isAdmin && (
          <>
            <div className="border-t my-2"></div>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors font-medium"
              onClick={onClose}
              role="menuitem"
            >
              <Settings className="w-4 h-4" />
              Painel Admin
            </Link>
          </>
        )}

        <div className="border-t my-2"></div>

        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          role="menuitem"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}
