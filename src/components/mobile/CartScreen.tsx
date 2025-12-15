import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Plus, Minus, Trash2, MapPin } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  province: string;
}

export function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Tomate Vermelho",
      price: 350,
      unit: "kg",
      quantity: 2,
      province: "Huíla",
      image: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MzQ1ODU1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Mandioca Fresca",
      price: 120,
      unit: "kg",
      quantity: 3,
      province: "Malanje",
      image: "https://images.unsplash.com/photo-1757283961570-682154747d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIweXVjYXxlbnwxfHx8fDE3NjM0NTg1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 100;
  const total = subtotal + delivery;

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-gray-800">Carrinho</h1>
        <p className="text-gray-500">{cartItems.length} itens</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500">Seu carrinho está vazio</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-800">{item.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.province}</span>
                        </div>
                        <p className="text-green-600">{item.price} Kz/{item.unit}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="ml-auto text-gray-800">
                        {item.price * item.quantity} Kz
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white border-t p-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{subtotal} Kz</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Entrega</span>
            <span>{delivery} Kz</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span>Total</span>
            <span className="text-green-600">{total} Kz</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  );
}