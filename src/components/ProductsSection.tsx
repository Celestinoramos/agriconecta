import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Tomates Orgânicos",
    price: "R$ 8,90",
    unit: "kg",
    farmer: "Fazenda São José",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MzQ1NTA3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Orgânico",
  },
  {
    id: 2,
    name: "Alface Hidropônica",
    price: "R$ 4,50",
    unit: "unidade",
    farmer: "Horta Verde",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1612776573170-6e72ebca79d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJ1aXRzJTIwbWFya2V0fGVufDF8fHx8MTc2MzM1MTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Fresco",
  },
  {
    id: 3,
    name: "Cenouras Orgânicas",
    price: "R$ 6,50",
    unit: "kg",
    farmer: "Sítio Boa Vista",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MzQ1NTA3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Orgânico",
  },
  {
    id: 4,
    name: "Batatas Frescas",
    price: "R$ 5,90",
    unit: "kg",
    farmer: "Fazenda Santa Clara",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612776573170-6e72ebca79d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJ1aXRzJTIwbWFya2V0fGVufDF8fHx8MTc2MzM1MTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Novo",
  },
  {
    id: 5,
    name: "Morangos Orgânicos",
    price: "R$ 12,90",
    unit: "kg",
    farmer: "Fazenda Morango Feliz",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MzQ1NTA3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Destaque",
  },
  {
    id: 6,
    name: "Abóbora Cabotiá",
    price: "R$ 4,90",
    unit: "kg",
    farmer: "Sítio Bom Jardim",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1612776573170-6e72ebca79d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJ1aXRzJTIwbWFya2V0fGVufDF8fHx8MTc2MzM1MTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Orgânico",
  },
];

export function ProductsSection() {
  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-green-900 mb-4">Produtos Frescos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha entre centenas de produtos frescos, orgânicos e de qualidade, 
            vindos diretamente dos melhores agricultores da região.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-600">
                  {product.badge}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2">{product.name}</h3>
                <p className="text-gray-500 mb-3">{product.farmer}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-700">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-600 mr-1">{product.price}</span>
                    <span className="text-gray-500">/{product.unit}</span>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
}
