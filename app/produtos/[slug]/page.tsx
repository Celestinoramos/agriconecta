import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import produtos from '@/data/produtos.json';
import { ProdutoDetalhado } from '@/types/produto';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import AddToCartSection from '@/components/product/AddToCartSection';
import ProductTabs from '@/components/product/ProductTabs';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import ShareButtons from '@/components/product/ShareButtons';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all products
export async function generateStaticParams() {
  return produtos.map((p: any) => ({
    slug: p.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const produto = produtos.find((p: any) => p.slug === params.slug) as ProdutoDetalhado | undefined;
  
  if (!produto) {
    return {
      title: 'Produto não encontrado | AgriConecta',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agriconecta.ao';
  const productUrl = `${baseUrl}/produtos/${produto.slug}`;

  return {
    title: `${produto.nome} | AgriConecta`,
    description: produto.descricao,
    keywords: [produto.categoria, produto.provincia, ...produto.tags].join(', '),
    openGraph: {
      title: produto.nome,
      description: produto.descricao,
      images: [
        {
          url: produto.imagens[0],
          width: 1200,
          height: 630,
          alt: produto.nome,
        },
      ],
      type: 'website',
      url: productUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: produto.nome,
      description: produto.descricao,
      images: [produto.imagens[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const produto = produtos.find((p: any) => p.slug === params.slug) as ProdutoDetalhado | undefined;

  if (!produto) {
    notFound();
  }

  // Get related products
  const relatedProducts = produto.produtosRelacionados
    .map((id) => produtos.find((p: any) => String(p.id) === String(id)))
    .filter(Boolean)
    .slice(0, 4)
    .map((p: any) => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      imagem: p.imagem,
      slug: p.slug,
      categoria: p.categoria,
    }));

  // Generate structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agriconecta.ao';
  const productUrl = `${baseUrl}/produtos/${produto.slug}`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produto.nome,
    description: produto.descricaoCompleta,
    image: produto.imagens,
    brand: {
      '@type': 'Brand',
      name: produto.produtorInfo.nome,
    },
    offers: {
      '@type': 'Offer',
      price: produto.preco,
      priceCurrency: 'AOA',
      availability:
        produto.disponibilidade === true || produto.disponibilidade === 'Em stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: productUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: produto.mediaAvaliacoes,
      reviewCount: produto.totalAvaliacoes,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Back Button - Mobile */}
        <div className="bg-white border-b px-4 py-3 md:hidden sticky top-16 z-20">
          <Link href="/produtos">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Produtos
            </Button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
          {/* Breadcrumb */}
          <ProductBreadcrumb produto={produto} />

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Left Column - Gallery (Desktop 2 cols) */}
            <div className="lg:col-span-2">
              <ProductGallery images={produto.imagens} productName={produto.nome} />
            </div>

            {/* Right Column - Product Info & Add to Cart */}
            <div className="space-y-6">
              <ProductInfo produto={produto} />
              <AddToCartSection produto={produto} />
              <ShareButtons productName={produto.nome} productUrl={productUrl} />
            </div>
          </div>

          {/* Product Details Tabs/Accordion */}
          <div className="mb-12">
            <ProductTabs produto={produto} />
          </div>

          {/* Reviews */}
          <div className="mb-12">
            <ProductReviews
              avaliacoes={produto.avaliacoes}
              mediaAvaliacoes={produto.mediaAvaliacoes}
              totalAvaliacoes={produto.totalAvaliacoes}
            />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <RelatedProducts products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
