"use client"

import { useEffect, useMemo, useState } from "react"

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
  // Memoised: a fresh array each render re-ran the observer effect in a loop.
  const headings = useMemo(() => extractHeadings(content), [content])

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
    <aside className="hidden xl:block w-56 shrink-0 sticky top-0 self-start max-h-screen overflow-y-auto pt-[clamp(104px,12vw,168px)] pb-10">
      <nav aria-label="Table of contents">
        <p className="text-paper font-medium mb-4" style={{ fontSize: "var(--step-body)" }}>
          On this page
        </p>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 14}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-[16px] leading-snug transition-colors border-l-2 pl-3 -ml-px ${
                  activeId === heading.id
                    ? "text-amber-tungsten border-amber-tungsten"
                    : "text-paper/80 hover:text-paper border-transparent"
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
