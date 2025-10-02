import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function WishlistPage() {
  const session = await auth()
  if (!session?.user?.id) return <div className="mx-auto max-w-6xl px-6 py-10">Sign in to view wishlist.</div>
  const items = await prisma.wishlist.findMany({ where: { userId: session.user.id }, include: { product: true } })
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-sm">No items yet. <Link className="underline" href="/products">Browse products</Link></p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((i) => (
            <li key={i.id} className="rounded border p-3 text-sm">
              <Link href={`/products/${i.product.slug}`} className="font-medium">{i.product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}


