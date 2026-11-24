import Link from "next/link"
import type { DocPage } from "@/lib/wiki"

interface DocsNavigationProps {
  prev: DocPage | null
  next: DocPage | null
}

/** Previous / next page links, two flat cells divided by a hairline. */
export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule mt-16 border-y border-rule"
      aria-label="Page navigation"
    >
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="group block bg-ink py-6 sm:pr-6 hover:bg-steel transition-colors">
          <p className="text-paper/80" style={{ fontSize: "var(--step-body)" }}>
            ← Previous
          </p>
          <p
            className="font-display text-paper mt-1 group-hover:text-amber-tungsten transition-colors"
            style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
          >
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="bg-ink hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group block bg-ink py-6 sm:pl-6 hover:bg-steel transition-colors sm:text-right"
        >
          <p className="text-paper/80" style={{ fontSize: "var(--step-body)" }}>
            Next →
          </p>
          <p
            className="font-display text-paper mt-1 group-hover:text-amber-tungsten transition-colors"
            style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
          >
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="bg-ink hidden sm:block" />
      )}
    </nav>
  )
}
