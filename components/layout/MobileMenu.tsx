'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}

/**
 * Mobile Menu Drawer Component
 * Displays navigation links in a slide-in drawer on mobile devices
 */
export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 md:hidden z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Drawer */}
      <div
        className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl md:hidden z-50 transform transition-transform duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <span className="text-xl font-bold text-green-600">Menu</span>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all py-3 px-4 rounded-lg min-h-[44px] flex items-center active:scale-95"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
