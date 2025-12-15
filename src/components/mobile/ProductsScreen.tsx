import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Star, Plus, MapPin, Search } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Tomate Vermelho",
    price: "350 Kz",
    unit: "kg",
    province: "Huíla",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MzQ1ODU1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tomates",
  },
  {
    id: 2,
    name: "Mandioca Fresca",
    price: "120 Kz",
    unit: "kg",
    province: "Malanje",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1757283961570-682154747d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIweXVjYXxlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tubérculos",
  },
  {
    id: 3,
    name: "Batata Doce",
    price: "180 Kz",
    unit: "kg",
    province: "Benguela",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0b3xlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tubérculos",
  },
  {
    id: 4,
    name: "Quiabo Fresco",
    price: "280 Kz",
    unit: "kg",
    province: "Kwanza Sul",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558408525-1092038389ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxva3JhJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjM0NTg1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Legumes",
  },
  {
    id: 5,
    name: "Banana-da-Terra",
    price: "200 Kz",
    unit: "kg",
    province: "Cuanza Norte",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1632178312052-ab5e36058af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGFpbiUyMGJhbmFuYXxlbnwxfHx8fDE3NjM0NTg1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Legumes",
  },
  {
    id: 6,
    name: "Tomate Cereja",
    price: "420 Kz",
    unit: "kg",
    province: "Huíla",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MzQ1ODU1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tomates",
  },
  {
    id: 7,
    name: "Batata Rena",
    price: "150 Kz",
    unit: "kg",
    province: "Huambo",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0b3xlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tubérculos",
  },
  {
    id: 8,
    name: "Couve",
    price: "250 Kz",
    unit: "kg",
    province: "Bié",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558408525-1092038389ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxva3JhJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjM0NTg1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Legumes",
  },
];

export function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["Todos", "Tomates", "Legumes", "Tubérculos"];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.province.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b">
        <h1 className="text-gray-800 mb-3">Produtos</h1>
        
        {/* Search Bar */}
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-3 mb-3">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Procurar por nome ou província..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-800 bg-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === category 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "border-green-600 text-green-600 hover:bg-green-50"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition">
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <h3 className="text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-1">{product.province}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">{product.rating}</span>
                  </div>
                  <p className="text-green-600">{product.price}/{product.unit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}