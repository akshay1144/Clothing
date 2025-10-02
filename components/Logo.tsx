import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">ECHELON</h1>
        <p className="text-xs text-gray-300 tracking-[0.2em] uppercase mt-1">MENSWEAR</p>
      </div>
    </Link>
  )
}
