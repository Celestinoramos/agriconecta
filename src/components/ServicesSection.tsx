import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Truck, Thermometer, Package, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Logística Integrada",
    description: "Sistema completo de transporte refrigerado do campo até o consumidor final, garantindo agilidade e qualidade.",
  },
  {
    icon: Thermometer,
    title: "Conservação de Produtos",
    description: "Câmaras frias e tecnologia de conservação para manter seus produtos frescos por mais tempo.",
  },
  {
    icon: Package,
    title: "Embalagem e Preparação",
    description: "Serviço de embalagem adequada para cada tipo de produto, seguindo padrões de qualidade.",
  },
  {
    icon: TrendingUp,
    title: "Gestão de Vendas",
    description: "Plataforma para gerenciar seus produtos, preços e vendas em tempo real.",
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h2 className="text-green-900 mb-4">
              Serviços para Agricultores
            </h2>
            <p className="text-gray-600 mb-6">
              Oferecemos uma solução completa para agricultores que desejam expandir 
              seus negócios. Cuidamos de toda a logística, conservação e distribuição 
              dos seus produtos, permitindo que você foque no que faz de melhor: cultivar 
              alimentos de qualidade.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white">✓</span>
                </div>
                <div>
                  <p className="text-gray-800">Coleta direta na propriedade</p>
                  <p className="text-gray-600">Não se preocupe com transporte</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white">✓</span>
                </div>
                <div>
                  <p className="text-gray-800">Pagamento garantido</p>
                  <p className="text-gray-600">Receba em até 7 dias após a venda</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white">✓</span>
                </div>
                <div>
                  <p className="text-gray-800">Suporte técnico</p>
                  <p className="text-gray-600">Equipe especializada para ajudar</p>
                </div>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" size="lg">
              Cadastrar como Agricultor
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623211268529-69c56e303312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NjMzNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agricultor trabalhando"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
