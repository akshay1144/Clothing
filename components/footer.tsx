export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-600">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Echelon Menswear</p>
          <p>Crafted with Next.js, Tailwind, and Stripe</p>
        </div>
      </div>
    </footer>
  )
}


