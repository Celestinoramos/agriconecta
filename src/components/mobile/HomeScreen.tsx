import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

interface HomeScreenProps {
  onNavigate: (screen: "home" | "products" | "services" | "cart" | "tracking" | "conservation") => void;
}

const featuredProducts = [
  {
    id: 1,
    name: "Tomate Fresco",
    price: "350 Kz",
    unit: "kg",
    province: "Huíla",
    image: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MzQ1ODU1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Mandioca",
    price: "120 Kz",
    unit: "kg",
    province: "Malanje",
    image: "https://images.unsplash.com/photo-1757283961570-682154747d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIweXVjYXxlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "Batata Doce",
    price: "180 Kz",
    unit: "kg",
    province: "Benguela",
    image: "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0b3xlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-green-100">Bem-vindo à</p>
            <h1 className="text-white">AgroConecta</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            👤
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-full px-4 py-3 flex items-center gap-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Procurar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => onNavigate("products")}
            className="flex-1 outline-none text-gray-800"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-4 text-green-100">
          <MapPin className="h-4 w-4" />
          <span>Luanda, Angola</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-gray-800 mb-3">Categorias</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-green-200 cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🍅</div>
                <p className="text-gray-700">Tomates</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🥬</div>
                <p className="text-gray-700">Legumes</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🥔</div>
                <p className="text-gray-700">Tubérculos</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800">Produtos em Destaque</h2>
            <button
              onClick={() => onNavigate("products")}
              className="text-green-600"
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition">
                <CardContent className="p-0">
                  <div className="flex gap-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 py-3 pr-3">
                      <h3 className="text-gray-800 mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{product.province}</span>
                      </div>
                      <p className="text-green-600 mb-2">{product.price}/{product.unit}</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none cursor-pointer hover:shadow-lg transition" 
            onClick={() => onNavigate("tracking")}
          >
            <CardContent className="p-4">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="text-white mb-1">Rastrear Pedido</h3>
              <p className="text-blue-100">Acompanhe em tempo real</p>
            </CardContent>
          </Card>
          <Card 
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none cursor-pointer hover:shadow-lg transition" 
            onClick={() => onNavigate("conservation")}
          >
            <CardContent className="p-4">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="text-white mb-1">Dicas</h3>
              <p className="text-purple-100">Como conservar produtos</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Banner */}
        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-none cursor-pointer" onClick={() => onNavigate("services")}>
          <CardContent className="p-6">
            <h3 className="text-white mb-2">É Agricultor?</h3>
            <p className="text-green-100 mb-4">
              Oferecemos logística e conservação dos seus produtos
            </p>
            <Button variant="secondary" size="sm">
              Saber mais
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}