export const dynamic = "force-dynamic"
export const revalidate = 0

import Link from 'next/link'
import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export default async function CartPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm">Please <Link className="underline" href="/api/auth/signin">sign in</Link> to view your cart.</p>
      </main>
    )
  }
  const items = await prisma.cartItem.findMany({ where: { userId: session.user.id }, include: { product: true } })
  const total = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Cart</h1>
      {items.length === 0 ? (
        <p className="text-sm">Your cart is empty. <Link className="underline" href="/products">Continue shopping</Link></p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded border p-3 text-sm">
                <div>
                  <p className="font-medium">{i.product.name}</p>
                  <p className="text-neutral-600">Size {i.sizeName} · Qty {i.quantity}</p>
                </div>
                <div>{formatPrice(i.product.price * i.quantity)}</div>
              </div>
            ))}
          </div>
          <form action="/api/checkout" method="post" className="h-fit rounded border p-4">
            <div className="flex items-center justify-between text-sm">
              <p>Subtotal</p>
              <p className="font-medium">{formatPrice(total)}</p>
            </div>
            <button className="mt-4 w-full rounded bg-black px-4 py-2 text-white">Checkout</button>
          </form>
        </div>
      )}
    </main>
  )
}


