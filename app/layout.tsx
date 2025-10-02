import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Echelon Menswear',
    template: '%s | Echelon Menswear'
  },
  description: 'Modern men\'s clothing store. Premium fits, fast checkout.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-white text-neutral-900 antialiased', inter.className)}>
        {children}
      </body>
    </html>
  )
}


