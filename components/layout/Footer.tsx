import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span>AgriConecta</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Conectando agricultores e consumidores em Angola. Produtos frescos e de qualidade.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/agriconecta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/agriconecta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/244923456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegação</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Início
              </Link>
              <Link
                href="/produtos"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Produtos
              </Link>
              <Link
                href="/servicos"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Serviços
              </Link>
              <Link
                href="/dicas"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Dicas
              </Link>
              <Link
                href="/sobre"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Sobre Nós
              </Link>
            </nav>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Suporte</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Perguntas Frequentes
              </Link>
              <Link
                href="/contacto"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contacto
              </Link>
              <Link
                href="/rastreio"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Rastreio de Pedidos
              </Link>
              <Link
                href="/termos"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Termos de Uso
              </Link>
              <Link
                href="/privacidade"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Política de Privacidade
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Luanda, Angola</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+244923456789" className="text-gray-400 hover:text-white transition-colors">
                  +244 923 456 789
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@agriconecta.ao" className="text-gray-400 hover:text-white transition-colors">
                  info@agriconecta.ao
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} AgriConecta. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
