import { WIKI_RAW_BASE, WIKI_BASE_URL, REVALIDATE_INTERVAL } from "./config";
import type { DocCategory, DocPage } from "./types";

// ---------------------------------------------------------------------------
// In-memory cache (per server instance)
// ---------------------------------------------------------------------------

let _cache: { categories: DocCategory[]; docs: DocPage[] } | null = null
let _cacheTime = 0
const CACHE_TTL = 60_000 // 1 minute in-memory (ISR handles the real caching)

// ---------------------------------------------------------------------------
// Sidebar Parsing
// ---------------------------------------------------------------------------

/**
 * Parses the wiki _Sidebar.md into categories and doc pages.
 *
 * Expected format:
 * ```
 * **Category Name**
 * - [[Page-Title]]
 * - [[Another-Page]]
 * ```
 */
export function parseSidebar(markdown: string): {
  categories: DocCategory[]
  docs: DocPage[]
} {
  const lines = markdown.split("\n")
  const categories: DocCategory[] = []
  const docs: DocPage[] = []

  let currentCategory = ""
  let categoryOrder = 0
  let pageOrder = 0

  for (const line of lines) {
    const trimmed = line.trim()

    // Category header: **Category Name**
    const categoryMatch = trimmed.match(/^\*\*(.+?)\*\*$/)
    if (categoryMatch) {
      currentCategory = categoryMatch[1]
      categoryOrder++
      pageOrder = 0
      categories.push({
        slug: toSlug(currentCategory),
        title: currentCategory,
        order: categoryOrder,
      })
      continue
    }

    // Page link: - [[Page-Title]] or - [[Display Name|Page-Title]]
    const pageMatch = trimmed.match(/^-\s*\[\[(.+?)\]\]$/)
    if (pageMatch && currentCategory) {
      pageOrder++
      const raw = pageMatch[1]

      // Support [[Display Name|Wiki-Page]] syntax
      const pipeIndex = raw.indexOf("|")
      const title = pipeIndex >= 0 ? raw.slice(0, pipeIndex).trim() : raw.replace(/-/g, " ")
      const wikiSlug = pipeIndex >= 0 ? raw.slice(pipeIndex + 1).trim() : raw

      docs.push({
        slug: toSlug(title),
        wikiSlug,
        wikiUrl: `${WIKI_BASE_URL}/${wikiSlug}`,
        title,
        category: toSlug(currentCategory),
        order: pageOrder,
      })
    }
  }

  return { categories, docs }
}

// ---------------------------------------------------------------------------
// Data Layer Functions
// ---------------------------------------------------------------------------

/**
 * Fetches and parses the sidebar, returning all doc pages.
 * Uses in-memory cache to avoid re-parsing on every call within the same request batch.
 */
export async function getDocs(): Promise<DocPage[]> {
  const data = await getSidebarData()
  return data.docs
}

/**
 * Returns all categories from the sidebar.
 */
export async function getCategories(): Promise<DocCategory[]> {
  const data = await getSidebarData()
  return data.categories
}

/**
 * Returns all doc pages belonging to a specific category.
 */
export async function getDocsByCategory(categorySlug: string): Promise<DocPage[]> {
  const docs = await getDocs()
  return docs.filter((d) => d.category === categorySlug)
}

/**
 * Returns a single doc page by its URL slug.
 */
export async function getDoc(slug: string): Promise<DocPage | null> {
  const docs = await getDocs()
  return docs.find((d) => d.slug === slug) ?? null
}

/**
 * Fetches raw markdown content for a wiki page.
 */
export async function fetchWikiContent(wikiSlug: string): Promise<string | null> {
  try {
    const res = await fetch(`${WIKI_RAW_BASE}/${wikiSlug}.md`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    })
    if (!res.ok) return null
    return res.text()
  } catch {
    return null
  }
}

/**
 * Extracts a short description from markdown content.
 * Skips H1, headings, code blocks, lists, blockquotes, and image-only lines.
 * Returns the first meaningful prose paragraph, truncated to 200 chars.
 */
export function extractDescription(content: string): string {
  const lines = content.split("\n")
  let inCodeBlock = false

  for (const line of lines) {
    const trimmed = line.trim()

    // Toggle code block state
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    // Skip headings
    if (trimmed.startsWith("#")) continue
    // Skip lists
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) continue
    // Skip blockquotes
    if (trimmed.startsWith(">")) continue
    // Skip images
    if (/^!\[/.test(trimmed)) continue
    // Skip empty lines
    if (!trimmed) continue
    // Skip table rows
    if (trimmed.startsWith("|")) continue

    // Found a prose paragraph
    const clean = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip link syntax
      .replace(/[*_`]/g, "") // strip formatting
      .trim()

    if (clean.length > 0) {
      return clean.length > 200 ? clean.slice(0, 197) + "..." : clean
    }
  }

  return ""
}

/**
 * Returns adjacent pages (prev/next) for navigation.
 */
export async function getAdjacentPages(slug: string): Promise<{
  prev: DocPage | null
  next: DocPage | null
}> {
  const docs = await getDocs()
  const index = docs.findIndex((d) => d.slug === slug)

  if (index === -1) return { prev: null, next: null }

  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  }
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

async function getSidebarData(): Promise<{
  categories: DocCategory[]
  docs: DocPage[]
}> {
  const now = Date.now()
  if (_cache && now - _cacheTime < CACHE_TTL) {
    return _cache
  }

  const sidebarMd = await fetchWikiContent("_Sidebar")

  if (!sidebarMd) {
    // Fallback: return empty structure if sidebar can't be fetched
    const empty = { categories: [], docs: [] }
    _cache = empty
    _cacheTime = now
    return empty
  }

  const parsed = parseSidebar(sidebarMd)
  _cache = parsed
  _cacheTime = now
  return parsed
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
