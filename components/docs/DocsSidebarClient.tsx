"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface SidebarCategory {
  slug: string
  title: string
  order: number
  docs: { slug: string; title: string }[]
}

interface DocsSidebarClientProps {
  categories: SidebarCategory[]
}

/**
 * Editorial docs sidebar. Hairline rules between categories, mono labels,
 * an underlined active state in tungsten amber.
 */
export function DocsSidebarClient({ categories }: DocsSidebarClientProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentSlug = pathname.replace("/docs/", "").replace("/docs", "")

  const sidebarContent = (
    <nav aria-label="Documentation navigation">
      <Link
        href="/docs"
        className="block mb-10 group"
      >
        <p className="eyebrow group-hover:text-amber-tungsten transition-colors">
          Documentation
        </p>
        <span className="font-display text-paper text-2xl leading-tight group-hover:text-amber-tungsten transition-colors mt-1 block">
          Index ↗
        </span>
      </Link>

      <div className="space-y-10">
        {categories.map((category, ci) => (
          <div key={category.slug} className="hairline pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4 tabular-nums">
              <span className="text-amber-tungsten/70">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <span className="ml-3">{category.title}</span>
            </p>
            <ul className="space-y-1">
              {category.docs.map((doc) => {
                const isActive = doc.slug === currentSlug
                return (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-1.5 font-sans text-sm transition-colors ${
                        isActive
                          ? "text-amber-tungsten border-l-2 border-amber-tungsten pl-3"
                          : "text-paper/60 hover:text-paper pl-3 border-l-2 border-transparent"
                      }`}
                    >
                      {doc.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-4">
        {sidebarContent}
      </aside>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-ink border border-amber-tungsten text-amber-tungsten flex items-center justify-center hover:bg-amber-tungsten hover:text-ink transition-colors"
        aria-label="Open documentation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          className="absolute inset-0 bg-ink/85 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-80 bg-ink border-r border-rule overflow-y-auto transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 hairline">
            <span className="eyebrow">Documentation</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-paper/60 hover:text-amber-tungsten transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{sidebarContent}</div>
        </div>
      </div>
    </>
  )
}
