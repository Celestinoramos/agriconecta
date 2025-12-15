import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mobile: Stacked vertically, centered */}
        {/* Desktop: Columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">🌾</span>
              <span>AgriConecta</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Conectando agricultores e consumidores em Angola. Produtos frescos e de qualidade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Início
              </Link>
              <Link
                href="/produtos"
                className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Produtos
              </Link>
              <Link
                href="/servicos"
                className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Serviços
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>📧 info@agriconecta.ao</p>
              <p>📱 +244 923 456 789</p>
              <p>📍 Luanda, Angola</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} AgriConecta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
