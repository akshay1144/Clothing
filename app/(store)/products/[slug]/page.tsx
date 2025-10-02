import { prisma } from '@/lib/prisma'
import Image from 'next/image'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { position: 'asc' } }, sizes: { include: { size: true } } }
  })
  if (!product) return <div className="mx-auto max-w-6xl px-6 py-10">Not found</div>

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((img) => (
            <div key={img.id} className="relative aspect-[4/5] overflow-hidden rounded">
              <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-1 text-neutral-600">{formatPrice(product.price)}</p>
          <p className="mt-4 text-sm text-neutral-700">{product.description}</p>
          <form action="/api/cart" method="post" className="mt-6 space-y-3">
            <input type="hidden" name="productId" value={product.id} />
            <label className="block text-sm">Size</label>
            <select name="sizeName" className="w-full rounded border p-2">
              {product.sizes.map((ps) => (
                <option key={ps.sizeId} value={ps.size.name}>{ps.size.name}</option>
              ))}
            </select>
            <button className="w-full rounded bg-black px-4 py-2 text-white">Add to cart</button>
          </form>
        </div>
      </div>
    </main>
  )
}


