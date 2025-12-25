import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { USER_ROLES } from '@/lib/auth/roles';

/**
 * Check if setup is needed (no SUPER_ADMIN exists)
 */
export async function GET() {
  try {
    const superAdminExists = await prisma.user.findFirst({
      where: {
        role: USER_ROLES.SUPER_ADMIN,
      },
    });

    return NextResponse.json({
      setupNeeded: !superAdminExists,
      message: superAdminExists 
        ? 'Setup já foi concluído' 
        : 'Nenhum Super Administrador encontrado',
    });
  } catch (error) {
    console.error('Error checking setup status:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar estado do setup' },
      { status: 500 }
    );
  }
}

/**
 * Create first SUPER_ADMIN
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createServerSupabaseClient();
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !supabaseUser || !supabaseUser.email) {
      return NextResponse.json(
        { error: 'Não autenticado. Por favor, faça login primeiro.' },
        { status: 401 }
      );
    }

    // Check if setup is still needed
    const superAdminExists = await prisma.user.findFirst({
      where: {
        role: USER_ROLES.SUPER_ADMIN,
      },
    });

    if (superAdminExists) {
      return NextResponse.json(
        { error: 'Setup já foi concluído. Já existe um Super Administrador.' },
        { status: 400 }
      );
    }

    // Get optional setup token from environment
    const setupToken = process.env.ADMIN_SETUP_TOKEN;
    
    // If setup token is configured, verify it
    if (setupToken) {
      const body = await request.json();
      if (body.setupToken !== setupToken) {
        return NextResponse.json(
          { error: 'Token de setup inválido' },
          { status: 403 }
        );
      }
    }

    // Find or create user in database
    let user = await prisma.user.findFirst({
      where: {
        email: supabaseUser.email,
      },
    });

    if (!user) {
      // Create new user
      const metadata = supabaseUser.user_metadata || {};
      
      user = await prisma.user.create({
        data: {
          email: supabaseUser.email,
          nome: metadata.nome || metadata.full_name || null,
          telefone: metadata.telefone || metadata.phone || null,
          emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : null,
          role: USER_ROLES.SUPER_ADMIN,
        },
      });
    } else {
      // Promote existing user to SUPER_ADMIN
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          role: USER_ROLES.SUPER_ADMIN,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Super Administrador criado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error creating super admin:', error);
    return NextResponse.json(
      { error: 'Erro ao criar Super Administrador' },
      { status: 500 }
    );
  }
}
