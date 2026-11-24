import { notFound } from "next/navigation"
import Link from "next/link"
import { Swatch } from "@/components/home/Swatch"
import { SCENES } from "@/lib/scenes"
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

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const

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
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
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
    <div className="flex gap-12 xl:gap-16">
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

        {/* Title block: a smaller PageHead */}
        <header className="pt-[clamp(104px,12vw,168px)] pb-10 mb-10 border-b border-rule">
          <Swatch cells={SCENES[5].cells} className="h-3 w-full max-w-[22rem] !gap-[3px]" />
          <nav aria-label="Breadcrumb" className="mt-8 flex flex-wrap items-center gap-2 text-paper" style={body}>
            <Link href="/docs" className="font-medium hover:text-amber-tungsten transition-colors">
              Documentation
            </Link>
            <span aria-hidden className="text-paper/70">/</span>
            <span className="text-paper/80">{doc.title}</span>
          </nav>
          <h1
            className="font-display text-paper mt-3 max-w-[20ch]"
            style={{ fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)", textWrap: "balance" }}
          >
            {doc.title}
          </h1>
          <div className="mt-6 flex items-center gap-x-8 gap-y-2 flex-wrap text-paper/80" style={body}>
            {readingTime && <span>{readingTime} min read</span>}
            <a
              href={`${doc.wikiUrl}/_edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-paper/40 decoration-2 underline-offset-4 hover:decoration-amber-tungsten transition-colors"
            >
              Edit on GitHub ↗
            </a>
          </div>
        </header>

        {/* Content */}
        {content ? (
          <DocsContent content={content} />
        ) : (
          <div className="border border-rule bg-steel p-8">
            <p className="text-paper" style={body}>
              This page&apos;s content couldn&apos;t be loaded from the wiki.
            </p>
            <a href={doc.wikiUrl} target="_blank" rel="noopener noreferrer" className="link-plain mt-6 inline-block">
              View on the wiki ↗
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
