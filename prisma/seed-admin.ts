import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@agriconecta.com'
  const adminPassword = 'Test0102'
  
  console.log('🔐 A criar/atualizar utilizador admin...')
  
  // Hash da password
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  // Criar ou atualizar admin
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'SUPER_ADMIN',
      password: hashedPassword,
      nome: 'Administrador',
    },
    create: {
      email: adminEmail,
      nome: 'Administrador',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  })
  
  console.log('✅ Admin criado/atualizado com sucesso!')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Role: ${admin.role}`)
  console.log('')
  console.log('🔑 Credenciais de acesso:')
  console.log(`   Email: ${adminEmail}`)
  console.log(`   Password: ${adminPassword}`)
  console.log('')
  console.log('🌐 Aceda a: /admin/login')
}

main()
  .catch((error) => {
    console.error('❌ Erro ao criar admin:', error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
