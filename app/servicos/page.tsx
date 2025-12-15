import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Serviços para Agricultores - AgriConecta",
  description: "Serviços especializados para apoiar agricultores angolanos: logística, conservação, embalagem e gestão",
};

export default function ServicosPage() {
  const servicos = [
    {
      id: 1,
      titulo: "Logística e Transporte",
      icon: "🚚",
      descricao: "Transporte seguro e eficiente dos seus produtos desde a fazenda até os consumidores.",
      beneficios: [
        "Veículos refrigerados para produtos perecíveis",
        "Cobertura em todas as províncias de Angola",
        "Rastreamento em tempo real",
        "Seguros incluídos"
      ]
    },
    {
      id: 2,
      titulo: "Conservação e Armazenamento",
      icon: "🏭",
      descricao: "Soluções profissionais de armazenamento para manter seus produtos frescos por mais tempo.",
      beneficios: [
        "Câmaras frigoríficas modernas",
        "Armazéns climatizados",
        "Controlo de humidade e temperatura",
        "Gestão de stock integrada"
      ]
    },
    {
      id: 3,
      titulo: "Embalagem e Rotulagem",
      icon: "📦",
      descricao: "Embalagens profissionais que protegem seus produtos e valorizam sua marca.",
      beneficios: [
        "Design de embalagens personalizadas",
        "Materiais eco-friendly",
        "Rotulagem com código de barras",
        "Certificação de qualidade"
      ]
    },
    {
      id: 4,
      titulo: "Gestão e Consultoria",
      icon: "📊",
      descricao: "Apoio especializado para melhorar a produtividade e rentabilidade da sua fazenda.",
      beneficios: [
        "Análise de solo e clima",
        "Planeamento de culturas",
        "Gestão financeira",
        "Formação e capacitação"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Voltar para Início
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Serviços para Agricultores
          </h1>
          <p className="text-xl text-blue-100">
            Soluções completas para apoiar o crescimento do seu negócio agrícola
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços para ajudar os agricultores angolanos a maximizar a sua produção e rentabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicos.map((servico) => (
              <Card key={servico.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-5xl">{servico.icon}</div>
                    <CardTitle className="text-2xl">{servico.titulo}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-gray-900">Benefícios:</h4>
                  <ul className="space-y-2">
                    {servico.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">Solicitar Orçamento</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600">
              Processo simples em 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contacte-nos</h3>
              <p className="text-gray-600">
                Entre em contacto através do formulário ou telefone para discutir as suas necessidades
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Avaliação</h3>
              <p className="text-gray-600">
                Nossa equipa avalia as suas necessidades e prepara uma proposta personalizada
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Implementação</h3>
              <p className="text-gray-600">
                Iniciamos a prestação do serviço com acompanhamento contínuo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para levar o seu negócio ao próximo nível?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contacto connosco hoje mesmo para uma consulta gratuita
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Solicitar Contacto
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
