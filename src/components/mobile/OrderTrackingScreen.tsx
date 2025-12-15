import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Package, Truck, CheckCircle2, Phone, Navigation } from "lucide-react";
import { Button } from "../ui/button";

const trackingSteps = [
  {
    status: "completed",
    title: "Pedido Confirmado",
    description: "Seu pedido foi confirmado",
    time: "10:30",
    icon: CheckCircle2,
  },
  {
    status: "completed",
    title: "Produto Coletado",
    description: "Produto coletado da fazenda",
    time: "11:45",
    icon: Package,
  },
  {
    status: "active",
    title: "Em Trânsito",
    description: "Seu pedido está a caminho",
    time: "13:20",
    icon: Truck,
  },
  {
    status: "pending",
    title: "Entregue",
    description: "Produto será entregue",
    time: "Previsto 15:00",
    icon: CheckCircle2,
  },
];

export function OrderTrackingScreen() {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-gray-800 mb-1">Rastreamento</h1>
        <p className="text-gray-500">Pedido #1847</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Simulation */}
        <Card className="overflow-hidden border-none shadow-md">
          <div className="relative bg-gradient-to-br from-green-100 to-green-200 h-48">
            {/* Simulated Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <path
                    d="M 50 180 Q 80 140, 120 120 T 200 80 T 280 60"
                    stroke="#22c55e"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,4"
                  />
                </svg>
                
                {/* Start point (Farm) */}
                <div className="absolute bottom-8 left-8 flex flex-col items-center" style={{ zIndex: 2 }}>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white">🌾</span>
                  </div>
                  <Badge className="mt-2 bg-white text-gray-800 shadow-sm">Fazenda</Badge>
                </div>

                {/* Truck (Current position) */}
                <div className="absolute top-20 right-20 flex flex-col items-center animate-pulse" style={{ zIndex: 3 }}>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="mt-2 bg-green-600 text-white shadow-md">Em Trânsito</Badge>
                </div>

                {/* Destination */}
                <div className="absolute top-8 right-8 flex flex-col items-center" style={{ zIndex: 2 }}>
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <Badge className="mt-2 bg-white text-gray-800 shadow-sm">Sua Casa</Badge>
                </div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg" style={{ zIndex: 4 }}>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span>Ao Vivo</span>
            </div>
          </div>
        </Card>

        {/* Driver Info */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍✈️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800">João Silva</h3>
                <p className="text-gray-500">Motorista</p>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  <span>⭐</span>
                  <span className="text-gray-700">4.9</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" className="bg-green-600 hover:bg-green-700 rounded-full">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-800">Informações da Entrega</h3>
              <Badge className="bg-green-100 text-green-700">Em andamento</Badge>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Rua da Missão, 123 - Luanda</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span>2 produtos - 5 kg</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-400" />
                <span>Distância estimada: 8.5 km</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Timeline */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <h3 className="text-gray-800 mb-4">Status do Pedido</h3>
            <div className="space-y-4">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";
                
                return (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-600"
                            : isActive
                            ? "bg-green-600 animate-pulse"
                            : "bg-gray-300"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isCompleted || isActive ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            isCompleted ? "bg-green-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={
                            isCompleted || isActive ? "text-gray-800" : "text-gray-500"
                          }
                        >
                          {step.title}
                        </h4>
                        <span className="text-gray-500">{step.time}</span>
                      </div>
                      <p className="text-gray-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="pb-4"></div>
      </div>
    </div>
  );
}
