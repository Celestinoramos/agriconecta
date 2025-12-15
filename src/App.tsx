import { useState } from "react";
import { HomeScreen } from "./components/mobile/HomeScreen";
import { ProductsScreen } from "./components/mobile/ProductsScreen";
import { ServicesScreen } from "./components/mobile/ServicesScreen";
import { CartScreen } from "./components/mobile/CartScreen";
import { OrderTrackingScreen } from "./components/mobile/OrderTrackingScreen";
import { ConservationTipsScreen } from "./components/mobile/ConservationTipsScreen";
import { MobileNavigation } from "./components/mobile/MobileNavigation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "products" | "services" | "cart" | "tracking" | "conservation">("home");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[380px] h-[800px] bg-black rounded-[3rem] p-3 shadow-2xl">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        
        {/* Phone Screen */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="bg-green-600 text-white px-6 py-3 flex items-center justify-between">
            <span className="text-xs">9:41</span>
            <span className="text-xs">●●●●●</span>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto">
            {currentScreen === "home" && <HomeScreen onNavigate={setCurrentScreen} />}
            {currentScreen === "products" && <ProductsScreen />}
            {currentScreen === "services" && <ServicesScreen />}
            {currentScreen === "cart" && <CartScreen />}
            {currentScreen === "tracking" && <OrderTrackingScreen />}
            {currentScreen === "conservation" && <ConservationTipsScreen />}
          </div>

          {/* Bottom Navigation */}
          <MobileNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      </div>
    </div>
  );
}