'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function DicasPage() {
  const tips = [
    {
      id: 1,
      title: 'Benefícios da Agricultura Orgânica',
      description: 'Aprenda sobre os benefícios nutricionais dos alimentos orgânicos e como eles podem melhorar sua saúde.',
      category: 'Nutrição',
    },
    {
      id: 2,
      title: 'Alimentos Sazonais e Suas Vantagens',
      description: 'Descubra quais alimentos estão em estação e por que consumi-los oferece maior valor nutricional.',
      category: 'Sazonalidade',
    },
    {
      id: 3,
      title: 'Como Conservar Alimentos Frescos',
      description: 'Dicas práticas para manter seus alimentos frescos e preservar os nutrientes por mais tempo.',
      category: 'Armazenamento',
    },
    {
      id: 4,
      title: 'Receitas com Produtos Locais',
      description: 'Explore receitas deliciosas utilizando produtos frescos e locais de sua região.',
      category: 'Culinária',
    },
  ];

  return (
    <>
      <Head>
        <title>Dicas de Nutrição - AgriConecta</title>
        <meta name="description" content="Dicas e informações sobre nutrição e agricultura sustentável" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Dicas de Nutrição
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra informações valiosas sobre nutrição, alimentos e agricultura sustentável
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {tips.map((tip) => (
              <article
                key={tip.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="bg-green-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    {tip.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {tip.description}
                  </p>
                  <Link
                    href={`/dicas/${tip.id}`}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition-colors"
                  >
                    Ler mais
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <section className="bg-green-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Receba Dicas Semanais
            </h2>
            <p className="mb-6 text-green-100">
              Inscreva-se em nossa newsletter para receber dicas exclusivas de nutrição e agricultura sustentável
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-3 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-800 text-white font-semibold rounded hover:bg-green-900 transition-colors"
              >
                Inscrever
              </button>
            </form>
          </section>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition-colors"
            >
              ← Voltar à página inicial
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
