const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  const email = 'akshaysahadevan1414@gmail.com'
  const password = 'admin123' // You can change this
  const name = 'Akshay Sahadevan'

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' }
      })
      console.log('✅ Updated existing user to admin:', updatedUser.email)
    } else {
      // Create new admin user
      const passwordHash = await bcrypt.hash(password, 12)
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          role: 'ADMIN'
        }
      })
      
      console.log('✅ Created new admin user:', user.email)
      console.log('📧 Email:', email)
      console.log('🔑 Password:', password)
    }
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
