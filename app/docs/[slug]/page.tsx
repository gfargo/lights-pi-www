import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { Metadata } from "next"
import {
    getDocs,
    getDoc,
    fetchWikiContent,
    extractDescription,
    getAdjacentPages,
    getReadingTime,
} from "@/lib/wiki"
import { processMarkdown } from "@/lib/wiki/markdown"
import { DocsContent } from "@/components/docs/DocsContent"
import { DocsNavigation } from "@/components/docs/DocsNavigation"
import { DocsFeedback } from "@/components/docs/DocsFeedback"
import { DocsPageView } from "@/components/docs/DocsPageView"
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents"

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const docs = await getDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = await getDoc(slug)
  if (!doc) return { title: "Not Found" }

  const content = await fetchWikiContent(doc.wikiSlug)
  const description = content
    ? extractDescription(content)
    : `${doc.title} — Lights Pi documentation`

  return {
    title: doc.title,
    description,
    alternates: { canonical: `/docs/${slug}` },
    openGraph: {
      type: "article",
      title: `${doc.title} | Lights Pi Docs`,
      description,
      url: `/docs/${slug}`,
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = await getDoc(slug)
  if (!doc) notFound()

  const [rawContent, { prev, next }] = await Promise.all([
    fetchWikiContent(doc.wikiSlug),
    getAdjacentPages(slug),
  ])

  const content = rawContent ? await processMarkdown(rawContent) : null
  const readingTime = rawContent ? getReadingTime(rawContent) : null

  return (
    <div className="flex gap-12">
      <article className="flex-1 min-w-0">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: doc.title,
              description: content ? extractDescription(rawContent ?? "") : "",
              url: `https://lightspi.dev/docs/${slug}`,
              author: { "@type": "Person", name: "gfargo" },
              publisher: {
                "@type": "Organization",
                name: "Lights Pi",
                url: "https://lightspi.dev",
              },
              isPartOf: {
                "@type": "TechArticle",
                name: "Lights Pi Documentation",
                url: "https://lightspi.dev/docs",
              },
            }),
          }}
        />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-widest">
          <Link href="/docs" className="text-paper/40 hover:text-amber-tungsten transition-colors">
            Docs
          </Link>
          <span className="text-paper/20">/</span>
          <span className="text-paper/70">{doc.title}</span>
        </nav>

        {/* Title block */}
        <header className="hairline pb-8 mb-12">
          <p className="eyebrow">Documentation</p>
          <h1
            className="font-display text-paper mt-3"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            {doc.title}
          </h1>
          <div className="mt-6 flex items-center gap-x-6 gap-y-2 flex-wrap font-mono text-xs uppercase tracking-widest text-paper/40">
            {readingTime && (
              <span className="inline-flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {readingTime} min read
              </span>
            )}
            <a
              href={`${doc.wikiUrl}/_edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-tungsten transition-colors"
            >
              Edit on GitHub
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Content */}
        {content ? (
          <DocsContent content={content} />
        ) : (
          <div className="border border-rule bg-steel/30 p-8 text-center">
            <p className="font-display italic text-paper/60 text-lg">
              This page&apos;s content couldn&apos;t be loaded from the wiki.
            </p>
            <a
              href={doc.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs text-amber-tungsten border-b border-amber-tungsten pb-1 hover:text-paper hover:border-paper transition-colors"
            >
              View on Wiki
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <DocsNavigation prev={prev} next={next} />
        <DocsFeedback slug={slug} wikiUrl={doc.wikiUrl} />
        <DocsPageView slug={slug} title={doc.title} />
      </article>

      {/* Table of Contents (right sidebar, xl+ only) */}
      {content && <DocsTableOfContents content={content} />}
    </div>
  )
}
