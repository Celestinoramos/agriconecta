'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthProvider';
import { USER_ROLES, getRoleDisplayName } from '@/lib/auth/roles';

interface User {
  id: string;
  email: string | null;
  nome: string | null;
  telefone: string | null;
  role: string;
  emailVerified: Date | null;
  isGuest: boolean;
  createdAt: Date;
}

export default function AdminUtilizadoresPage() {
  const { userRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const isSuperAdmin = userRole === USER_ROLES.SUPER_ADMIN;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar utilizadores');
      }

      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error((error as Error).message || 'Erro ao carregar utilizadores');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!isSuperAdmin) {
      toast.error('Apenas Super Administradores podem alterar roles');
      return;
    }

    setUpdatingUserId(userId);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao actualizar role');
      }

      toast.success('Role actualizada com sucesso');
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error((error as Error).message || 'Erro ao actualizar role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case USER_ROLES.ADMIN:
        return 'bg-green-100 text-green-800 border-green-300';
      case USER_ROLES.STAFF:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Utilizadores</h1>
        </div>
        <p className="text-gray-600">
          Visualize e gerencie utilizadores do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Utilizadores ({users.length})</CardTitle>
          <CardDescription>
            {isSuperAdmin 
              ? 'Como Super Administrador, pode alterar as roles dos utilizadores'
              : 'Visualização de utilizadores (apenas Super Admin pode alterar roles)'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Utilizador
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Contacto
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Estado
                  </th>
                  {isSuperAdmin && (
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                      Acções
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.nome || 'Sem nome'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email || 'Sem email'}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        {user.telefone || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}
                      >
                        {getRoleDisplayName(user.role as any)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.isGuest ? (
                        <span className="text-xs text-gray-500">Convidado</span>
                      ) : user.emailVerified ? (
                        <span className="text-xs text-green-600">Verificado</span>
                      ) : (
                        <span className="text-xs text-yellow-600">Não verificado</span>
                      )}
                    </td>
                    {isSuperAdmin && (
                      <td className="py-3 px-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={updatingUserId === user.id}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value={USER_ROLES.CUSTOMER}>Cliente</option>
                          <option value={USER_ROLES.STAFF}>Funcionário</option>
                          <option value={USER_ROLES.ADMIN}>Administrador</option>
                          <option value={USER_ROLES.SUPER_ADMIN}>Super Admin</option>
                        </select>
                        {updatingUserId === user.id && (
                          <Loader2 className="inline-block ml-2 h-4 w-4 animate-spin" />
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum utilizador encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

