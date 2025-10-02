import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.formData()
  const productId = String(data.get('productId'))
  const sizeName = data.get('sizeName') ? String(data.get('sizeName')) : null
  const existing = await prisma.cartItem.findUnique({ where: { userId_productId_sizeName: { userId: session.user.id, productId, sizeName } } })
  if (existing) {
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: { increment: 1 } } })
  } else {
    await prisma.cartItem.create({ data: { userId: session.user.id, productId, sizeName, quantity: 1 } })
  }
  return NextResponse.redirect(new URL('/cart', req.url))
}


