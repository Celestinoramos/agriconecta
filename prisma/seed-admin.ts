import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@agriconecta.com'
  const adminPassword = 'Test0102'
  
  // Hash da password
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  // Criar ou atualizar admin
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'SUPER_ADMIN',
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      nome: 'Administrador',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  })
  
  console.log('✅ Admin criado/atualizado:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
