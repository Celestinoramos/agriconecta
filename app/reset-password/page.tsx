'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return 'A palavra-passe deve ter pelo menos 8 caracteres'
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos uma letra maiúscula'
    }
    if (!/[a-z]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos uma letra minúscula'
    }
    if (!/[0-9]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos um número'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem')
      return
    }

    // Validate password strength
    const validationError = validatePassword(password)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) throw updateError

      setSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir palavra-passe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="text-5xl">🌾</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Redefinir palavra-passe
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Escolha uma nova palavra-passe segura
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Palavra-passe redefinida com sucesso!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        A sua palavra-passe foi atualizada. Será redirecionado para a página de login em instantes...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Ir para login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                <p className="font-medium mb-2">Requisitos da palavra-passe:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mínimo de 8 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos uma letra minúscula</li>
                  <li>Pelo menos um número</li>
                </ul>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Nova palavra-passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nova palavra-passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'A redefinir...' : 'Redefinir palavra-passe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
