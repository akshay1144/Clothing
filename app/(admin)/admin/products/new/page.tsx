export const dynamic = "force-dynamic"
export const revalidate = 0

import { auth } from '@/lib/authServer'
import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'

export default async function NewProductPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return <div className="mx-auto max-w-6xl px-6 py-10">Forbidden</div>
  }

  const [categories, sizes] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.size.findMany({ orderBy: { name: 'asc' } })
  ])

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <p className="text-neutral-600">Create a new product for your store</p>
      </div>
      
      <ProductForm categories={categories} sizes={sizes} />
    </main>
  )
}
