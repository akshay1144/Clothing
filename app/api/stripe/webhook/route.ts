import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  const buf = Buffer.from(await req.arrayBuffer())
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    if (userId) {
      const cartItems = await prisma.cartItem.findMany({ where: { userId }, include: { product: true } })
      const order = await prisma.order.create({
        data: {
          userId,
          total: cartItems.reduce((acc, i) => acc + i.quantity * i.product.price, 0),
          currency: 'usd',
          status: 'PAID',
          stripeId: session.id,
          items: {
            create: cartItems.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: i.product.price,
              sizeName: i.sizeName || undefined,
            }))
          }
        }
      })
      await prisma.cartItem.deleteMany({ where: { userId } })
      console.log('Order created', order.id)
    }
  }

  return NextResponse.json({ received: true })
}


