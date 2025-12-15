import type { Metadata } from "next";
import "./globals.css";

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
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
