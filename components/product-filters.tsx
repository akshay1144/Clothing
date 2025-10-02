"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Category {
  id: string
  slug: string
  name: string
}

interface Size {
  id: string
  name: string
}

interface ProductFiltersProps {
  categories: Category[]
  sizes: Size[]
  searchParams: { category?: string; size?: string; min?: string; max?: string }
}

export function ProductFilters({ categories, sizes, searchParams }: ProductFiltersProps) {
  const router = useRouter()
  const params = useSearchParams()

  const updateFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params.toString())
    
    if (value && value !== '') {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    
    router.push(`/products?${newParams.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasActiveFilters = searchParams.category || searchParams.size || searchParams.min || searchParams.max

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select
            value={searchParams.category || ''}
            onChange={(e) => updateFilters('category', e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Size</label>
          <Select
            value={searchParams.size || ''}
            onChange={(e) => updateFilters('size', e.target.value)}
          >
            <option value="">All sizes</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.name}>
                {size.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={searchParams.min || ''}
              onChange={(e) => updateFilters('min', e.target.value)}
              min="0"
            />
            <Input
              type="number"
              placeholder="Max"
              value={searchParams.max || ''}
              onChange={(e) => updateFilters('max', e.target.value)}
              min="0"
            />
          </div>
          <div className="mt-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilters('min', '0')
                updateFilters('max', '50')
              }}
            >
              Under $50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilters('min', '50')
                updateFilters('max', '100')
              }}
            >
              $50-$100
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
