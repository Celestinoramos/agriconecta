import { Home, ShoppingBag, Briefcase, ShoppingCart, PackageSearch, BookOpen } from "lucide-react";

interface MobileNavigationProps {
  currentScreen: "home" | "products" | "services" | "cart" | "tracking" | "conservation";
  onNavigate: (screen: "home" | "products" | "services" | "cart" | "tracking" | "conservation") => void;
}

export function MobileNavigation({ currentScreen, onNavigate }: MobileNavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Início" },
    { id: "products" as const, icon: ShoppingBag, label: "Produtos" },
    { id: "tracking" as const, icon: PackageSearch, label: "Rastreio" },
    { id: "conservation" as const, icon: BookOpen, label: "Dicas" },
    { id: "cart" as const, icon: ShoppingCart, label: "Carrinho" },
  ];

  return (
    <div className="bg-white border-t px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              isActive 
                ? "text-green-600 bg-green-50" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}