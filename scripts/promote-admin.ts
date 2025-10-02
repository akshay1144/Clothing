const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function promoteToAdmin() {
  const email = process.argv[2]
  
  if (!email) {
    console.error('Usage: npx ts-node scripts/promote-admin.ts <email>')
    process.exit(1)
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`User with email ${email} not found`)
      process.exit(1)
    }

    if (user.role === 'ADMIN') {
      console.log(`User ${email} is already an admin`)
      process.exit(0)
    }

    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    })

    console.log(`✅ Successfully promoted ${email} to admin`)
  } catch (error) {
    console.error('Error promoting user:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

promoteToAdmin()
