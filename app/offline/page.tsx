'use client';

import { WifiOff, Home, Search } from 'lucide-react'
import Link from 'next/link'

/**
 * Offline Page
 * 
 * Displayed when the user is offline
 */
export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <WifiOff className="w-24 h-24 text-gray-400 mx-auto mb-8" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sem Conexão à Internet
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Parece que está offline. Verifique a sua conexão à internet e tente novamente.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Tentar Novamente
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Voltar à Página Inicial
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg border p-6 text-left">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-green-600" />
            Enquanto está offline
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Verifique a sua conexão Wi-Fi ou dados móveis</li>
            <li>• Tente desligar e ligar novamente o modo avião</li>
            <li>• Reinicie o seu router se estiver a usar Wi-Fi</li>
            <li>• Entre em contacto com o seu fornecedor de internet</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
