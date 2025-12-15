import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Thermometer, Droplets, Clock, AlertCircle, Leaf, Sun } from "lucide-react";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const conservationTips = [
  {
    category: "Tomates",
    icon: "🍅",
    image: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MzQ1ODU1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: [
      { icon: Thermometer, text: "Conservar à temperatura ambiente (18-22°C)" },
      { icon: Sun, text: "Manter longe da luz solar direta" },
      { icon: Clock, text: "Duração: 5-7 dias fora do frigorífico" },
      { icon: AlertCircle, text: "Não refrigerar, perde sabor e textura" },
    ],
  },
  {
    category: "Tubérculos (Mandioca, Batata Doce)",
    icon: "🥔",
    image: "https://images.unsplash.com/photo-1757283961570-682154747d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIweXVjYXxlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: [
      { icon: Thermometer, text: "Guardar em local fresco e seco (10-15°C)" },
      { icon: Sun, text: "Proteger da luz para evitar brotação" },
      { icon: Clock, text: "Duração: 1-2 semanas" },
      { icon: Droplets, text: "Evitar humidade excessiva" },
    ],
  },
  {
    category: "Legumes Verdes",
    icon: "🥬",
    image: "https://images.unsplash.com/photo-1558408525-1092038389ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxva3JhJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjM0NTg1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: [
      { icon: Thermometer, text: "Refrigerar entre 4-7°C" },
      { icon: Droplets, text: "Guardar em saco plástico perfurado" },
      { icon: Clock, text: "Duração: 5-10 dias no frigorífico" },
      { icon: Leaf, text: "Lavar apenas antes de consumir" },
    ],
  },
  {
    category: "Banana-da-Terra",
    icon: "🍌",
    image: "https://images.unsplash.com/photo-1632178312052-ab5e36058af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGFpbiUyMGJhbmFuYXxlbnwxfHx8fDE3NjM0NTg1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: [
      { icon: Thermometer, text: "Temperatura ambiente (20-25°C)" },
      { icon: Sun, text: "Manter em local ventilado" },
      { icon: Clock, text: "Duração: 7-10 dias" },
      { icon: AlertCircle, text: "Amadurece rápido, consumir quando amarela" },
    ],
  },
];

const generalTips = [
  {
    title: "Higiene",
    description: "Sempre lave bem os produtos antes de consumir",
    icon: Droplets,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Separação",
    description: "Não misture frutas e legumes no mesmo espaço",
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Verificação",
    description: "Inspecione regularmente e remova produtos estragados",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
];

export function ConservationTipsScreen() {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-gray-800 mb-1">Dicas de Conservação</h1>
        <p className="text-gray-500">Mantenha seus produtos frescos</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-none">
          <CardContent className="p-6">
            <h2 className="text-white mb-2">Conserve Melhor</h2>
            <p className="text-green-100">
              Aprenda a conservar seus produtos agrícolas para mantê-los frescos por mais tempo 
              e reduzir desperdícios.
            </p>
          </CardContent>
        </Card>

        {/* General Tips */}
        <div className="grid grid-cols-3 gap-3">
          {generalTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-3 text-center">
                  <div className={`w-10 h-10 ${tip.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-gray-800 mb-1">{tip.title}</p>
                  <p className="text-gray-500">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Product-specific tips */}
        <div className="space-y-4">
          {conservationTips.map((product, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className="relative h-32">
                <ImageWithFallback
                  src={product.image}
                  alt={product.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-3xl">{product.icon}</span>
                  <h3 className="text-white">{product.category}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {product.tips.map((tip, tipIndex) => {
                    const Icon = tip.icon;
                    return (
                      <div key={tipIndex} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-gray-700 flex-1">{tip.text}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 mb-1">Dica Importante</h3>
                <p className="text-gray-600">
                  Produtos orgânicos têm menor tempo de conservação que produtos convencionais. 
                  Consuma o mais rápido possível para aproveitar ao máximo seus nutrientes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pb-4"></div>
      </div>
    </div>
  );
}
