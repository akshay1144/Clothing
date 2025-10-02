"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/membership', label: 'Membership' },
    { href: '/wishlist', label: 'Wishlist' },
    { href: '/orders', label: 'Orders' },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-black/80 backdrop-blur border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Echelon Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">ECHELON</h1>
            <p className="text-xs text-gray-300 tracking-[0.2em] uppercase mt-0.5">MENSWEAR</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <Link 
              key={n.href} 
              href={n.href} 
              className={cn(
                'text-gray-300 hover:text-white transition-colors duration-200 font-medium tracking-wide',
                pathname === n.href && 'text-white border-b-2 border-blue-500 pb-1'
              )}
            >
              {n.label}
            </Link>
          ))}
          
          {/* Cart Button */}
          <Link 
            href="/cart" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          >
            Cart
          </Link>

          {/* Admin Link - Only show if needed */}
          {pathname.startsWith('/admin') && (
            <Link 
              href="/admin" 
              className="text-gray-400 hover:text-white transition-colors text-xs border border-gray-600 px-2 py-1 rounded"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
