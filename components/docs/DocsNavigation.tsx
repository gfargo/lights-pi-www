import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DocPage } from "@/lib/wiki"

interface DocsNavigationProps {
  prev: DocPage | null
  next: DocPage | null
}

export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      className="flex items-stretch gap-4 mt-12 pt-8 border-t border-gray-700"
      aria-label="Page navigation"
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/50 transition group"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition shrink-0" />
          <div className="text-right flex-1">
            <div className="text-xs text-gray-500 mb-1">Previous</div>
            <div className="font-medium text-white group-hover:text-orange-400 transition">
              {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/50 transition group"
        >
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Next</div>
            <div className="font-medium text-white group-hover:text-orange-400 transition">
              {next.title}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
