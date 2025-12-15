import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer id="contato" className="bg-green-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                🌱
              </div>
              <span>AgroConnect</span>
            </div>
            <p className="text-green-100 mb-4">
              Conectando agricultores e consumidores para uma alimentação mais saudável 
              e sustentável.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-green-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-green-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-green-800">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#produtos" className="text-green-100 hover:text-white transition">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-green-100 hover:text-white transition">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-green-100 hover:text-white transition">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white transition">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-100">(11) 98765-4321</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-100">contato@agroconnect.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-100">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="text-green-100 mb-4">
              Receba ofertas e novidades diretamente no seu e-mail.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-green-800 border-green-700 text-white placeholder:text-green-300"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center">
          <p className="text-green-100">
            © 2025 AgroConnect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
