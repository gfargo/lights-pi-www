import Link from "next/link"
import type { DocPage } from "@/lib/wiki"

interface DocsNavigationProps {
  prev: DocPage | null
  next: DocPage | null
}

/**
 * Editorial prev/next navigation. No buttons or rounded cards — just two
 * flat regions of a hairline-bordered grid with margin-style labels.
 */
export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule mt-16 hairline"
      aria-label="Page navigation"
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group block bg-ink p-6 hover:bg-steel/30 transition-colors"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
            ← Previous
          </p>
          <p className="font-display text-paper text-xl mt-2 leading-tight group-hover:text-amber-tungsten transition-colors">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="bg-ink" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group block bg-ink p-6 hover:bg-steel/30 transition-colors text-right"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
            Next →
          </p>
          <p className="font-display text-paper text-xl mt-2 leading-tight group-hover:text-amber-tungsten transition-colors">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="bg-ink" />
      )}
    </nav>
  )
}
