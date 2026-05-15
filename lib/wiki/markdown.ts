import { WIKI_BASE_URL } from "./config"
import { getDocs } from "./docs"

/**
 * Processes raw wiki markdown before rendering:
 * 1. Strips the leading H1 (the wiki convention is "first line = page
 *    title heading", but the /docs/[slug] page already renders an
 *    intentional editorial header, so the in-content H1 is a duplicate).
 * 2. Transforms absolute GitHub Wiki links to internal /docs/ routes
 * 3. Transforms [[Wiki-Link]] syntax to internal links
 * 4. Optionally strips emoji from headings
 */
export async function processMarkdown(
  markdown: string,
  options?: {
    transformLinks?: boolean
    cleanEmoji?: boolean
    /** Opt-out of leading-H1 removal. Defaults to true. */
    stripLeadingH1?: boolean
  }
): Promise<string> {
  const {
    transformLinks = true,
    cleanEmoji = false,
    stripLeadingH1: shouldStripH1 = true,
  } = options ?? {}

  let processed = markdown

  if (shouldStripH1) {
    processed = stripLeadingH1(processed)
  }

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
 * Removes the first `# Heading` line from the markdown. Tolerates leading
 * blank lines. Only matches a single `#` (not `##` etc.) so we don't trim
 * the wrong heading level. The trailing blank lines that immediately
 * follow the stripped H1 are also removed so we don't leave a hole.
 */
function stripLeadingH1(markdown: string): string {
  const lines = markdown.split("\n")
  let i = 0
  // Skip leading blank lines
  while (i < lines.length && lines[i].trim() === "") i++
  // Match a single `# ...` (not `## ...`)
  if (i < lines.length && /^#\s+\S/.test(lines[i])) {
    lines.splice(i, 1)
    // Also drop trailing blank lines immediately after the stripped heading
    while (i < lines.length && lines[i].trim() === "") {
      lines.splice(i, 1)
    }
    return lines.join("\n")
  }
  return markdown
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
