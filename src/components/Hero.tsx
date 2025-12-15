import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full">
              Do campo direto para sua mesa
            </div>
            <h1 className="text-green-900">
              Conectando Agricultores e Consumidores
            </h1>
            <p className="text-gray-600">
              Compre produtos frescos e orgânicos diretamente dos agricultores locais. 
              Oferecemos serviços completos de logística e conservação para garantir a 
              qualidade dos produtos da terra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                Comprar Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                Sou Agricultor
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-green-600">500+</div>
                <p className="text-gray-600">Produtos</p>
              </div>
              <div>
                <div className="text-green-600">200+</div>
                <p className="text-gray-600">Agricultores</p>
              </div>
              <div>
                <div className="text-green-600">5000+</div>
                <p className="text-gray-600">Clientes</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MzQ1NTA3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Produtos frescos da fazenda"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <p className="text-gray-500">100% Orgânico</p>
                  <p className="text-green-600">Certificado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
