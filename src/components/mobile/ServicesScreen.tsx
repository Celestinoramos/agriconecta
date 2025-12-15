import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Truck, Thermometer, Package, TrendingUp, Check } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Logística",
    description: "Transporte refrigerado do campo ao consumidor",
  },
  {
    icon: Thermometer,
    title: "Conservação",
    description: "Câmaras frias para produtos frescos",
  },
  {
    icon: Package,
    title: "Embalagem",
    description: "Preparação e embalagem profissional",
  },
  {
    icon: TrendingUp,
    title: "Vendas",
    description: "Plataforma de gestão em tempo real",
  },
];

const benefits = [
  "Coleta direta na sua propriedade",
  "Pagamento garantido em 7 dias",
  "Suporte técnico especializado",
  "Aumente suas vendas em 300%",
  "Alcance mais clientes",
  "Zero custos iniciais",
];

export function ServicesScreen() {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-gray-800">Serviços para Agricultores</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1687422809617-a7d97879b3b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjMzNzMyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mercado de produtos"
            className="w-full h-40 object-cover"
          />
        </div>

        {/* Description */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <p className="text-gray-600">
              Solução completa para agricultores expandirem seus negócios. 
              Cuidamos da logística, conservação e distribuição.
            </p>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-green-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits */}
        <Card className="border-none shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-gray-800">Benefícios</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
          Cadastrar como Agricultor
        </Button>

        <div className="text-center text-gray-500 pb-4">
          Junte-se a mais de 200 agricultores
        </div>
      </div>
    </div>
  );
}
