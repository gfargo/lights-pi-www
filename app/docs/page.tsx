import Link from "next/link"
import { PageHead, SectionHead } from "@/components/PageHead"
import { SwatchButton } from "@/components/home/Swatch"
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
      <PageHead
        scene={5}
        label="Documentation"
        title="How it works, from cable to cue."
        lead="Setup guides, hardware reference, AI scene generation, the MCP server and operations. Sourced from the project wiki, so it stays in step with the code."
        aside={
          <div className="flex flex-col items-start lg:items-end gap-2">
            {hasContent && <span>{totalDocs} pages</span>}
            <a href={WIKI_BASE_URL} target="_blank" rel="noopener noreferrer" className="link-plain">
              View on the wiki ↗
            </a>
          </div>
        }
      >
        {hasContent && (
          <div className="mt-10">
            <SwatchButton href="/docs/quick-start">Quick-start guide</SwatchButton>
          </div>
        )}
      </PageHead>

      {hasContent ? (
        <div className="space-y-12">
          {categoriesWithDocs.map((category) => (
            <section key={category.slug} className="border-t border-rule pt-6">
              <div className="grid xl:grid-cols-[14rem_1fr] gap-x-10 gap-y-4">
                <h2 className="font-display text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}>
                  {category.title}
                </h2>

                <ul className="divide-y divide-rule">
                  {category.docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="group grid md:grid-cols-[14rem_1fr_1.5rem] gap-x-6 gap-y-1 py-4 items-baseline hover:bg-steel transition-colors"
                        style={body}
                      >
                        <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors">
                          {doc.title}
                        </span>
                        {doc.description ? (
                          <span className="text-paper/80 line-clamp-2">{doc.description}</span>
                        ) : (
                          <span />
                        )}
                        <span
                          aria-hidden
                          className="hidden md:block text-paper/80 group-hover:text-amber-tungsten transition-colors text-right"
                        >
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
        <div className="border-t border-rule pt-12">
          <h2 className="font-display text-paper max-w-[22ch]" style={{ fontSize: "var(--step-head)" }}>
            Documentation is moving to the GitHub wiki.
          </h2>
          <p className="mt-4 text-paper max-w-[42rem]" style={body}>
            Check back soon or visit the wiki directly.
          </p>
          <a href={WIKI_BASE_URL} target="_blank" rel="noopener noreferrer" className="link-plain mt-8 inline-block">
            Visit the wiki ↗
          </a>
        </div>
      )}

      {/* Elsewhere */}
      <section className="mt-[clamp(72px,8vw,120px)]">
        <SectionHead title="Elsewhere" />
        <div className="grid sm:grid-cols-3 gap-px bg-rule border-y border-rule">
          <ResourceLink href="https://github.com/gfargo/lights-pi" label="GitHub" note="Source code and issues" external />
          <ResourceLink href="/community" label="Community" note="Discord and discussions" />
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

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const

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
    <div className="block bg-ink py-5 sm:px-5 group hover:bg-steel transition-colors" style={body}>
      <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors">
        {label}
        {external ? " ↗" : " →"}
      </span>
      <p className="text-paper/80 mt-1">{note}</p>
    </div>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-ink">
      {inner}
    </a>
  ) : (
    <Link href={href} className="bg-ink">
      {inner}
    </Link>
  )
}
