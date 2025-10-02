import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { ProductFilters } from '@/components/product-filters'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; size?: string; min?: string; max?: string } }) {
  const where: any = { active: true }
  if (searchParams.category) {
    where.category = { slug: searchParams.category }
  }
  if (searchParams.size) {
    where.sizes = { some: { size: { name: searchParams.size } } }
  }
  if (searchParams.min || searchParams.max) {
    where.price = {}
    if (searchParams.min) where.price.gte = Number(searchParams.min) * 100
    if (searchParams.max) where.price.lte = Number(searchParams.max) * 100
  }
  
  const [products, categories, sizes] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { position: 'asc' }, take: 1 }, category: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.size.findMany({ orderBy: { name: 'asc' } })
  ])

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Shop</h1>
          <p className="text-neutral-600">Explore our latest collection ({products.length} items)</p>
        </div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <ProductFilters 
          categories={categories}
          sizes={sizes}
          searchParams={searchParams}
        />
        
        <div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">No products found matching your filters.</p>
              <Link href="/products" className="text-sm underline mt-2 inline-block">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group rounded-lg border p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded">
                    {p.images[0] && (
                      <Image src={p.images[0].url} alt={p.name} fill className="object-cover transition group-hover:scale-105" />
                    )}
                  </div>
                  <div className="mt-3 text-sm">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-neutral-600">{formatPrice(p.price)}</p>
                    <p className="text-xs text-neutral-500">{p.category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


