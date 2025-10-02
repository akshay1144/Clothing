"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/admin/image-upload'

interface Category {
  id: string
  slug: string
  name: string
}

interface Size {
  id: string
  name: string
}

interface ProductFormProps {
  categories: Category[]
  sizes: Size[]
  product?: any // For editing existing products
}

export function ProductForm({ categories, sizes, product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<string[]>(product?.images?.map((img: any) => img.url) || [])
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>(
    product?.sizes?.reduce((acc: any, ps: any) => ({ ...acc, [ps.size.name]: ps.stock }), {}) || {}
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      price: Math.round(parseFloat(formData.get('price') as string) * 100), // Convert to cents
      categoryId: formData.get('categoryId') as string,
      stock: parseInt(formData.get('stock') as string),
      images: images.map((url, index) => ({ url, position: index })),
      sizes: Object.entries(selectedSizes).map(([sizeName, stock]) => ({
        sizeName,
        stock: Number(stock)
      }))
    }

    try {
      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products'
      const method = product ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const errorData = await res.json()
        setError(errorData.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleSizeToggle = (sizeName: string) => {
    setSelectedSizes(prev => {
      const newSizes = { ...prev }
      if (sizeName in newSizes) {
        delete newSizes[sizeName]
      } else {
        newSizes[sizeName] = 0
      }
      return newSizes
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Product Name</label>
              <Input
                name="name"
                required
                defaultValue={product?.name}
                placeholder="Premium Cotton Tee"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Slug</label>
              <Input
                name="slug"
                required
                defaultValue={product?.slug}
                placeholder="premium-cotton-tee"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              name="description"
              required
              defaultValue={product?.description}
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              rows={3}
              placeholder="Comfortable, stylish, and made from premium materials..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Price ($)</label>
              <Input
                name="price"
                type="number"
                step="0.01"
                required
                defaultValue={product?.price ? (product.price / 100).toFixed(2) : ''}
                placeholder="29.99"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select name="categoryId" required defaultValue={product?.categoryId}>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Total Stock</label>
              <Input
                name="stock"
                type="number"
                required
                defaultValue={product?.stock || 0}
                placeholder="100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload images={images} onChange={setImages} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sizes & Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">Select available sizes and set stock for each:</p>
            <div className="grid grid-cols-2 gap-4">
              {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`size-${size.id}`}
                    checked={size.name in selectedSizes}
                    onChange={() => handleSizeToggle(size.name)}
                    className="rounded"
                  />
                  <label htmlFor={`size-${size.id}`} className="text-sm font-medium">
                    {size.name}
                  </label>
                  {size.name in selectedSizes && (
                    <Input
                      type="number"
                      min="0"
                      value={selectedSizes[size.name]}
                      onChange={(e) => setSelectedSizes(prev => ({
                        ...prev,
                        [size.name]: parseInt(e.target.value) || 0
                      }))}
                      className="w-20"
                      placeholder="0"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
