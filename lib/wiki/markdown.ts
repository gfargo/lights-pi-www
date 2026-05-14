import { WIKI_BASE_URL } from "./config"
import { getDocs } from "./docs"

/**
 * Processes raw wiki markdown before rendering:
 * 1. Transforms absolute GitHub Wiki links to internal /docs/ routes
 * 2. Transforms [[Wiki-Link]] syntax to internal links
 * 3. Optionally strips emoji from headings
 */
export async function processMarkdown(
  markdown: string,
  options?: {
    transformLinks?: boolean
    cleanEmoji?: boolean
  }
): Promise<string> {
  const { transformLinks = true, cleanEmoji = false } = options ?? {}

  let processed = markdown

  if (transformLinks) {
    processed = await transformWikiLinks(processed)
  }

  if (cleanEmoji) {
    // Remove leading emoji from headings: ## 🚀 Quick Start → ## Quick Start
    processed = processed.replace(
      /^(#{1,6})\s*[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/gmu,
      "$1 "
    )
  }

  return processed
}

/**
 * Converts GitHub Wiki URLs and [[wiki links]] to internal /docs/ routes.
 */
async function transformWikiLinks(markdown: string): Promise<string> {
  const docs = await getDocs()

  // Transform absolute wiki URLs: [text](https://github.com/.../wiki/Page-Name)
  const wikiUrlPattern = new RegExp(
    `\\[([^\\]]+)\\]\\(${escapeRegex(WIKI_BASE_URL)}/([^)]+)\\)`,
    "gi"
  )

  let result = markdown.replace(wikiUrlPattern, (_match, text, pageName) => {
    const decoded = decodeURIComponent(pageName).replace(/-/g, " ")
    const doc = docs.find(
      (d) =>
        d.wikiSlug.toLowerCase() === pageName.toLowerCase() ||
        d.title.toLowerCase() === decoded.toLowerCase()
    )
    if (doc) {
      return `[${text}](/docs/${doc.slug})`
    }
    // Leave unrecognised wiki links as-is
    return _match
  })

  // Transform [[Wiki-Link]] syntax
  result = result.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_match, display, target) => {
    const wikiSlug = target ?? display
    const doc = docs.find(
      (d) =>
        d.wikiSlug.toLowerCase() === wikiSlug.trim().toLowerCase() ||
        d.title.toLowerCase() === wikiSlug.trim().replace(/-/g, " ").toLowerCase()
    )
    if (doc) {
      return `[${display.trim()}](/docs/${doc.slug})`
    }
    // Leave unrecognised wiki links as plain text
    return display.trim()
  })

  return result
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
