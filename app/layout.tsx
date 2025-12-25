import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AgriConecta - Marketplace Agrícola de Angola",
  description: "Conectando agricultores e consumidores em Angola. Compre produtos frescos diretamente dos produtores locais.",
  keywords: ["agricultura", "Angola", "marketplace", "produtos frescos", "agricultores", "Luanda"],
  authors: [{ name: "AgriConecta" }],
  creator: "AgriConecta",
  publisher: "AgriConecta",
  metadataBase: new URL('https://agriconecta.ao'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AgriConecta - Marketplace Agrícola de Angola",
    description: "Conectando agricultores e consumidores em Angola. Compre produtos frescos diretamente dos produtores locais.",
    url: "https://agriconecta.ao",
    siteName: "AgriConecta",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgriConecta - Marketplace Agrícola de Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriConecta - Marketplace Agrícola de Angola",
    description: "Conectando agricultores e consumidores em Angola. Compre produtos frescos diretamente dos produtores locais.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AgriConecta',
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#16a34a' },
    { media: '(prefers-color-scheme: dark)', color: '#166534' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <ServiceWorkerRegistration />
            <Header />
            {children}
            <Footer />
            <BottomNav />
            <CartDrawer />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
