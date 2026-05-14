export type DocCategory = {
  slug: string
  title: string
  order: number
}

export type DocPage = {
  slug: string       // kebab-cased title (URL routing)
  wikiSlug: string   // hyphen-cased preserving case (for raw fetch)
  wikiUrl: string    // full GitHub Wiki URL (for "View on Wiki" links)
  title: string
  category: string
  order: number
}
