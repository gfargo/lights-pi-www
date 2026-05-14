import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, Clock } from "lucide-react"
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

  // Process markdown (transform wiki links to internal routes)
  const content = rawContent ? await processMarkdown(rawContent) : null
  const readingTime = rawContent ? getReadingTime(rawContent) : null

  return (
    <div className="flex gap-8">
      {/* Main content */}
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
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/docs" className="hover:text-orange-400 transition">
            Docs
          </Link>
          <span>/</span>
          <span className="text-gray-400">{doc.title}</span>
        </nav>

        {/* Title block */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">{doc.title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            {readingTime && (
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
            )}
            <a
              href={`${doc.wikiUrl}/_edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-400 transition"
            >
              Edit on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Content */}
        {content ? (
          <DocsContent content={content} />
        ) : (
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 text-center">
            <p className="text-gray-400 mb-4">
              This page&apos;s content couldn&apos;t be loaded from the wiki.
            </p>
            <a
              href={doc.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              View on Wiki
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Prev / Next navigation */}
        <DocsNavigation prev={prev} next={next} />

        {/* Feedback widget */}
        <DocsFeedback slug={slug} wikiUrl={doc.wikiUrl} />

        {/* Analytics */}
        <DocsPageView slug={slug} title={doc.title} />
      </article>

      {/* Table of Contents (right sidebar, xl+ only) */}
      {content && <DocsTableOfContents content={content} />}
    </div>
  )
}
