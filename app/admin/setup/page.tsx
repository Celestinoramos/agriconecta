'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthProvider';

export default function AdminSetupPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [setupNeeded, setSetupNeeded] = useState(false);
  const [setupToken, setSetupToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch('/api/admin/setup');
      const data = await response.json();
      
      setSetupNeeded(data.setupNeeded);
      setLoading(false);
    } catch (error) {
      console.error('Error checking setup status:', error);
      toast.error('Erro ao verificar estado do setup');
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Por favor, faça login primeiro');
      router.push('/login?redirect=/admin/setup');
      return;
    }

    setIsSubmitting(true);

    try {
      const body: any = {};
      
      // Only include token if it's been entered
      if (setupToken.trim()) {
        body.setupToken = setupToken;
      }

      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar Super Administrador');
      }

      toast.success('Super Administrador criado com sucesso!');
      setSetupComplete(true);
      
      // Redirect to admin panel after 2 seconds
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error creating super admin:', error);
      toast.error((error as Error).message || 'Erro ao criar Super Administrador');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
          <p className="mt-2 text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-center">Autenticação Necessária</CardTitle>
            <CardDescription className="text-center">
              Por favor, faça login para continuar com o setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push('/login?redirect=/admin/setup')}
              className="w-full"
            >
              Ir para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (setupComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-center text-green-600">Setup Concluído!</CardTitle>
            <CardDescription className="text-center">
              Super Administrador criado com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-gray-600">
              A redirecionar para o painel admin...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!setupNeeded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-center">Setup Já Concluído</CardTitle>
            <CardDescription className="text-center">
              Já existe um Super Administrador configurado no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Se você é um administrador, faça login para acessar o painel.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push('/admin')}
                className="flex-1"
              >
                Ir para Admin
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="flex-1"
              >
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center">Setup Inicial - AgriConecta</CardTitle>
          <CardDescription className="text-center">
            Crie o primeiro Super Administrador do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Utilizador actual:</strong><br />
                {user.email}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Esta conta será promovida a Super Administrador
              </p>
            </div>

            {/* Optional setup token field */}
            <div>
              <label htmlFor="setupToken" className="block text-sm font-medium mb-2">
                Token de Setup (opcional)
              </label>
              <input
                id="setupToken"
                type="password"
                value={setupToken}
                onChange={(e) => setSetupToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Deixe em branco se não configurado"
              />
              <p className="mt-1 text-xs text-gray-500">
                Token configurado em ADMIN_SETUP_TOKEN (se existir)
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                <strong>Atenção:</strong> Esta operação só pode ser realizada uma vez. 
                Após criar o primeiro Super Administrador, esta página ficará inacessível.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A criar...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Criar Super Administrador
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Cancelar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
