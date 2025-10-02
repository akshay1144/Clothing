import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { slug: 'tops', name: 'Tops' },
      { slug: 'bottoms', name: 'Bottoms' },
      { slug: 'outerwear', name: 'Outerwear' },
      { slug: 'accessories', name: 'Accessories' },
    ],
    skipDuplicates: true,
  })

  const sizes = await prisma.size.createMany({
    data: [
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
    ],
    skipDuplicates: true,
  })

  const tee = await prisma.product.upsert({
    where: { slug: 'premium-tee' },
    update: {},
    create: {
      slug: 'premium-tee',
      name: 'Premium Tee',
      description: 'Ultra-soft cotton tee with tailored fit.',
      price: 3900,
      category: { connect: { slug: 'tops' } },
      stock: 200,
      images: {
        create: [
          { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1720000000/men/tee1.jpg', position: 0 },
          { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1720000000/men/tee2.jpg', position: 1 },
        ],
      },
      sizes: {
        create: [
          { size: { connect: { name: 'S' } }, stock: 50 },
          { size: { connect: { name: 'M' } }, stock: 60 },
          { size: { connect: { name: 'L' } }, stock: 50 },
        ],
      },
    },
    include: { images: true, sizes: true },
  })

  console.log('Seeded:', { categories, sizes, tee })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


