import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { USER_ROLES, isValidRole } from '@/lib/auth/roles';

/**
 * Get all users (ADMIN and SUPER_ADMIN only)
 */
export async function GET() {
  try {
    // Verify authentication and role
    const supabase = await createServerSupabaseClient();
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !supabaseUser) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Get user from database with role
    const dbUser = await prisma.user.findFirst({
      where: { email: supabaseUser.email },
    });

    if (!dbUser || (dbUser.role !== USER_ROLES.ADMIN && dbUser.role !== USER_ROLES.SUPER_ADMIN)) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });
    }

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        telefone: true,
        role: true,
        emailVerified: true,
        isGuest: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Erro ao obter utilizadores' },
      { status: 500 }
    );
  }
}

/**
 * Update user role (SUPER_ADMIN only)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createServerSupabaseClient();
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !supabaseUser) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Get user from database with role
    const dbUser = await prisma.user.findFirst({
      where: { email: supabaseUser.email },
    });

    // Only SUPER_ADMIN can change roles
    if (!dbUser || dbUser.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: 'Apenas Super Administradores podem alterar roles' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'userId e newRole são obrigatórios' },
        { status: 400 }
      );
    }

    if (!isValidRole(newRole)) {
      return NextResponse.json(
        { error: 'Role inválida' },
        { status: 400 }
      );
    }

    // Don't allow changing own role
    if (userId === dbUser.id) {
      return NextResponse.json(
        { error: 'Não pode alterar a sua própria role' },
        { status: 400 }
      );
    }

    // Prevent removing the last SUPER_ADMIN
    if (newRole !== USER_ROLES.SUPER_ADMIN) {
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (targetUser?.role === USER_ROLES.SUPER_ADMIN) {
        const superAdminCount = await prisma.user.count({
          where: { role: USER_ROLES.SUPER_ADMIN },
        });

        if (superAdminCount <= 1) {
          return NextResponse.json(
            { error: 'Não pode remover o último Super Administrador' },
            { status: 400 }
          );
        }
      }
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Role actualizada com sucesso',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Erro ao actualizar role' },
      { status: 500 }
    );
  }
}
