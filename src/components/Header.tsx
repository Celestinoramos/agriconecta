import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
              🌱
            </div>
            <span className="text-green-800">AgroConnect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#produtos" className="text-gray-700 hover:text-green-600 transition">
              Produtos
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-green-600 transition">
              Serviços
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-green-600 transition">
              Como Funciona
            </a>
            <a href="#contato" className="text-gray-700 hover:text-green-600 transition">
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button className="hidden md:inline-flex bg-green-600 hover:bg-green-700">
              Entrar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <a href="#produtos" className="text-gray-700 hover:text-green-600 transition py-2">
              Produtos
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-green-600 transition py-2">
              Serviços
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-green-600 transition py-2">
              Como Funciona
            </a>
            <a href="#contato" className="text-gray-700 hover:text-green-600 transition py-2">
              Contato
            </a>
            <Button className="bg-green-600 hover:bg-green-700">Entrar</Button>
          </nav>
        )}
      </div>
    </header>
  );
}
