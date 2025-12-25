'use client'

import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="text-5xl">🌾</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Criar conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Junte-se ao AgriConecta e compre produtos frescos
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Verificação de email necessária
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Após criar a sua conta, irá receber um email de verificação. Por favor, verifique o seu email antes de fazer login.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
