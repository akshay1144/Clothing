import { NextResponse } from 'next/server'
import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { name, slug, description, price, categoryId, stock, images, sizes } = data

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }

    // Create product with images and sizes
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        categoryId,
        stock,
        images: {
          create: images.map((img: any) => ({
            url: img.url,
            position: img.position
          }))
        },
        sizes: {
          create: sizes.map((size: any) => ({
            size: { connect: { name: size.sizeName } },
            stock: size.stock
          }))
        }
      },
      include: {
        images: true,
        sizes: { include: { size: true } },
        category: true
      }
    })

    return NextResponse.json(product)

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
