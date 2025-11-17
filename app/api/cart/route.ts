import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.formData()
  const productId = String(data.get('productId'))

  // Keep sizeName compatible with your Prisma schema (String?).
  // Use `null` when no size provided.
  const rawSize = data.get('sizeName')
  const sizeName = rawSize ? String(rawSize) : null

  // Use findFirst so queries work when sizeName is null (optional field).
  const existing = await prisma.cartItem.findFirst({
    where: {
      userId: session.user.id,
      productId,
      sizeName, // can be string or null; matches schema String?
    },
  })

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: { increment: 1 } },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId,
        sizeName, // null or string — allowed for String?
        quantity: 1,
      },
    })
  }

  return NextResponse.redirect(new URL('/cart', req.url))
}
