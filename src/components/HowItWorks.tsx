import { Card, CardContent } from "./ui/card";
import { Search, ShoppingBag, Truck, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Escolha seus produtos",
    description: "Navegue pelo catálogo e selecione os produtos frescos que deseja comprar.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Adicione ao carrinho",
    description: "Adicione os produtos ao carrinho e escolha a quantidade desejada.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Entregaremos para você",
    description: "Nossa logística garante que os produtos cheguem frescos na sua casa.",
  },
  {
    icon: Home,
    number: "04",
    title: "Receba em casa",
    description: "Produtos frescos direto do campo para sua mesa com toda segurança.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-green-900 mb-4">Como Funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprar produtos frescos nunca foi tão fácil. Veja como funciona nosso processo 
            de entrega do campo direto para sua casa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="absolute -top-4 left-6 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-green-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
