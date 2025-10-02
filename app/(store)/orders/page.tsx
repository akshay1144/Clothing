import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user?.id) return <div className="mx-auto max-w-6xl px-6 py-10">Sign in to view orders.</div>
  const orders = await prisma.order.findMany({ where: { userId: session.user.id }, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } })
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded border p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium">Order {o.id.slice(0, 8)} · {o.status}</p>
              <p>{formatPrice(o.total)}</p>
            </div>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              {o.items.map((it) => (
                <li key={it.id}>{it.product.name} × {it.quantity}{it.sizeName ? ` · ${it.sizeName}` : ''}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}


