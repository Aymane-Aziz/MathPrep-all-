import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="text-xl font-bold text-blue-600">Math World</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/about" className="rounded-md px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100">
            About
          </Link>
          <Link href="/for-parents" className="rounded-md px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100">
            For Parents
          </Link>
          <Link href="/contact" className="rounded-md px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100">
            Contact
          </Link>
          <Link href="/help" className="rounded-md px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100">
            Help
          </Link>
        </nav>
        <div className="text-sm text-slate-500">© 2025 Math World. All rights reserved.</div>
      </div>
    </footer>
  )
}
