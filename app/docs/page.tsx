import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
    getCategories,
    getDocsByCategory,
    fetchWikiContent,
    extractDescription,
    WIKI_BASE_URL,
} from "@/lib/wiki"

export const revalidate = 3600

export const metadata = {
  title: "Documentation",
  description: "Complete documentation for Lights Pi lighting controller",
}

export default async function DocsPage() {
  const categories = await getCategories()

  const categoriesWithDocs = await Promise.all(
    categories.map(async (cat) => {
      const docs = await getDocsByCategory(cat.slug)
      const docsWithDescriptions = await Promise.all(
        docs.map(async (doc) => {
          const content = await fetchWikiContent(doc.wikiSlug)
          return {
            ...doc,
            description: extractDescription(content ?? ""),
          }
        })
      )
      return { ...cat, docs: docsWithDescriptions }
    })
  )

  const hasContent = categoriesWithDocs.length > 0
  const totalDocs = categoriesWithDocs.reduce((n, c) => n + c.docs.length, 0)

  return (
    <div>
      {/* ─────────────────────────────────────────── HEADER ─── */}
      <header className="hairline pb-8 mb-12 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <p className="eyebrow">Documentation</p>
          <h1
            className="font-display text-paper mt-3"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            How it works,
            <span className="block italic text-paper/40">
              from cable to cue.
            </span>
          </h1>
          <p className="mt-5 text-paper/60 leading-relaxed max-w-2xl text-lg">
            Setup guides, hardware reference, AI scene generation, MCP server,
            and operations. Sourced from the project wiki so it stays in sync
            with the code.
          </p>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-2 font-mono text-xs uppercase tracking-widest text-paper/40 whitespace-nowrap">
          <span>{totalDocs} pages</span>
          <a
            href={WIKI_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-tungsten transition-colors inline-flex items-center gap-2"
          >
            View on Wiki
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Primary CTA — minimal */}
      {hasContent && (
        <div className="mb-16">
          <Link
            href="/docs/quick-start"
            className="group inline-flex items-center gap-3 text-paper font-mono uppercase tracking-widest text-sm border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
          >
            Quick-start guide
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}

      {/* ──────────────────────────────────────── CATEGORIES ─── */}
      {hasContent ? (
        <div className="space-y-12">
          {categoriesWithDocs.map((category, ci) => (
            <section key={category.slug} className="hairline pt-6">
              <div className="grid lg:grid-cols-[8rem_1fr] gap-x-10 gap-y-6">
                <div className="flex flex-col gap-2">
                  <p
                    className="font-mono text-xs uppercase tracking-widest text-amber-tungsten/70 tabular-nums"
                  >
                    {String(ci + 1).padStart(2, "0")} / {String(categoriesWithDocs.length).padStart(2, "0")}
                  </p>
                  <h2
                    className="font-display text-paper"
                    style={{ fontSize: "2rem", lineHeight: 1.05 }}
                  >
                    {category.title}
                  </h2>
                </div>

                <ul className="divide-y divide-rule">
                  {category.docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="group grid lg:grid-cols-[12rem_1fr_2rem] gap-x-6 gap-y-1 py-4 items-baseline hover:bg-steel/30 px-2 -mx-2 transition-colors"
                      >
                        <span className="font-mono text-sm text-paper/80 group-hover:text-amber-tungsten transition-colors whitespace-nowrap">
                          {doc.title}
                        </span>
                        {doc.description ? (
                          <span className="text-paper/50 text-sm leading-snug line-clamp-2">
                            {doc.description}
                          </span>
                        ) : <span />}
                        <span aria-hidden className="font-mono text-paper/30 group-hover:text-amber-tungsten transition-colors text-right">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="hairline pt-12">
          <p className="eyebrow">Stand by</p>
          <h2
            className="font-display text-paper mt-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Documentation is being migrated to the GitHub Wiki.
          </h2>
          <p className="mt-4 text-paper/60 max-w-2xl leading-relaxed">
            Check back soon or visit the wiki directly.
          </p>
          <a
            href={WIKI_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 text-amber-tungsten font-mono uppercase tracking-widest text-sm border-b border-amber-tungsten pb-1 hover:text-paper hover:border-paper transition-colors"
          >
            Visit the wiki
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      )}

      {/* ──────────────────────────────────────── RESOURCES ─── */}
      <section className="mt-20 hairline pt-8">
        <p className="eyebrow mb-6">Elsewhere</p>
        <div className="grid sm:grid-cols-3 gap-px bg-rule">
          <ResourceLink
            href="https://github.com/gfargo/lights-pi"
            label="GitHub"
            note="Source code & issues"
            external
          />
          <ResourceLink
            href="/community"
            label="Community"
            note="Discord & discussions"
          />
          <ResourceLink
            href="https://github.com/gfargo/lights-pi/issues/new"
            label="Report an issue"
            note="Found a bug?"
            external
          />
        </div>
      </section>
    </div>
  )
}

function ResourceLink({
  href,
  label,
  note,
  external = false,
}: {
  href: string
  label: string
  note: string
  external?: boolean
}) {
  const inner = (
    <div className="block bg-ink p-5 group hover:bg-steel/30 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm uppercase tracking-widest text-paper group-hover:text-amber-tungsten transition-colors">
          {label}
        </span>
        {external && (
          <ArrowUpRight className="w-3.5 h-3.5 text-paper/30 group-hover:text-amber-tungsten transition-colors" />
        )}
      </div>
      <p className="font-display italic text-paper/40 mt-1 text-sm">{note}</p>
    </div>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href}>{inner}</Link>
  )
}
