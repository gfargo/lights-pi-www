"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Book, ChevronRight, Menu, X } from "lucide-react"

interface SidebarCategory {
  slug: string
  title: string
  order: number
  docs: { slug: string; title: string }[]
}

interface DocsSidebarClientProps {
  categories: SidebarCategory[]
}

export function DocsSidebarClient({ categories }: DocsSidebarClientProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentSlug = pathname.replace("/docs/", "").replace("/docs", "")

  const sidebarContent = (
    <nav aria-label="Documentation navigation">
      <Link
        href="/docs"
        className="flex items-center gap-2 px-3 py-2 mb-4 text-sm font-medium text-gray-400 hover:text-white transition rounded-lg hover:bg-gray-800"
      >
        <Book className="w-4 h-4" />
        <span>Documentation</span>
      </Link>

      <div className="space-y-6">
        {categories.map((category) => {
          const isActiveCategory = category.docs.some(
            (d) => d.slug === currentSlug
          )

          return (
            <div key={category.slug}>
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {category.title}
              </h3>
              <ul className="space-y-1">
                {category.docs.map((doc) => {
                  const isActive = doc.slug === currentSlug
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${
                          isActive
                            ? "bg-orange-500/10 text-orange-400 font-medium border-l-2 border-orange-500 ml-0 pl-2.5"
                            : "text-gray-400 hover:text-white hover:bg-gray-800 ml-0"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {isActive && (
                          <ChevronRight className="w-3 h-3 shrink-0" />
                        )}
                        <span className={!isActive ? "ml-5" : ""}>
                          {doc.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition"
        aria-label="Open documentation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-700 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
              <span className="font-semibold text-white">Documentation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  )
}
