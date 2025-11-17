import { NextResponse } from 'next/server'
import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const items = await prisma.cartItem.findMany({ where: { userId: session.user.id }, include: { product: true } })
  if (items.length === 0) return NextResponse.redirect(new URL('/cart', req.url))

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => ({
    quantity: i.quantity,
    price_data: {
      currency: i.product.currency,
      product_data: { name: i.product.name },
      unit_amount: i.product.price,
    },
  }))

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${process.env.NEXTAUTH_URL}/orders?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
    metadata: { userId: session.user.id },
  })

  return NextResponse.redirect(checkout.url!, 303)
}


