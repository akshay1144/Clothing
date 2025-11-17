export const dynamic = "force-dynamic"
export const revalidate = 0

import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'ADMIN') return <div className="mx-auto max-w-6xl px-6 py-10">Forbidden</div>
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } })
  const orders = await prisma.order.count()
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded border p-4 text-sm"><p className="font-medium">Products</p><p>{products.length}</p></div>
        <div className="rounded border p-4 text-sm"><p className="font-medium">Orders</p><p>{orders}</p></div>
        <Link href="/admin/products/new" className="rounded border p-4 text-center text-sm">Add Product</Link>
      </div>
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-medium">Recent Products</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-neutral-600"><th className="py-2">Name</th><th>Category</th><th>Price</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.name}</td><td>{p.category.name}</td><td>${(p.price/100).toFixed(2)}</td><td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}


