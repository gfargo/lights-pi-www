"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

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
 * Docs sidebar. Categories as plain sentence-case headings, pages as a
 * list, the current page marked with an amber cell and amber text.
 */
export function DocsSidebarClient({ categories }: DocsSidebarClientProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentSlug = pathname.replace("/docs/", "").replace("/docs", "")

  const sidebarContent = (
    <nav aria-label="Documentation navigation">
      <Link
        href="/docs"
        onClick={() => setMobileOpen(false)}
        className="block mb-8 font-display text-paper hover:text-amber-tungsten transition-colors"
        style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
      >
        Documentation
      </Link>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.slug} className="border-t border-rule pt-4">
            <p className="text-paper font-medium mb-2" style={{ fontSize: "var(--step-body)" }}>
              {category.title}
            </p>
            <ul>
              {category.docs.map((doc) => {
                const isActive = doc.slug === currentSlug
                return (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 py-1.5 text-[16px] leading-snug transition-colors ${
                        isActive ? "text-amber-tungsten font-medium" : "text-paper/80 hover:text-paper"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 shrink-0 ${isActive ? "bg-amber-tungsten" : "bg-rule"}`}
                      />
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
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 self-start max-h-screen overflow-y-auto pt-[clamp(104px,12vw,168px)] pb-10 pr-2">
        {sidebarContent}
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-5 right-4 z-40 min-h-[48px] px-5 bg-paper text-ink font-medium hover:bg-amber-tungsten transition-colors"
        style={{ fontSize: "var(--step-body)" }}
        aria-label="Open documentation menu"
      >
        Contents
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
          className="absolute inset-0 bg-ink/90"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-[min(20rem,88vw)] bg-ink border-r border-rule overflow-y-auto transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end px-4 py-3 border-b border-rule">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              className="min-h-[44px] px-2 text-paper hover:text-amber-tungsten transition-colors font-medium"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <div className="p-6">{sidebarContent}</div>
        </div>
      </div>
    </>
  )
}
