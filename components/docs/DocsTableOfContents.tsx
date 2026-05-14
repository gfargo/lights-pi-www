"use client"

import { useEffect, useState } from "react"

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocsTableOfContentsProps {
  content: string
}

/**
 * Extracts headings from markdown content and renders a sticky table of contents.
 * Highlights the currently visible section based on scroll position.
 */
export function DocsTableOfContents({ content }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const headings = extractHeadings(content)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.find((e) => e.isIntersecting)
        if (visible?.target.id) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )

    // Observe all heading elements in the DOM
    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null // Don't show TOC for very short pages

  return (
    <aside className="hidden xl:block w-56 shrink-0 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
      <nav aria-label="Table of contents">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          On this page
        </h4>
        <ul className="space-y-1.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-xs leading-relaxed transition-colors ${
                  activeId === heading.id
                    ? "text-orange-400 font-medium"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

/**
 * Parses markdown content to extract h2 and h3 headings with generated IDs.
 */
function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = []
  const lines = markdown.split("\n")
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip links
        .replace(/[*_`]/g, "") // strip formatting
        .trim()

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      headings.push({ id, text, level })
    }
  }

  return headings
}
