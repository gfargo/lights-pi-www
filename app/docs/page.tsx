import Link from "next/link"
import { Book, ExternalLink, ArrowRight } from "lucide-react"
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

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-6">
          Everything you need to know about setting up, configuring, and
          managing your Lights Pi system.
        </p>
        <div className="flex flex-wrap gap-3">
          {hasContent && (
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <a
            href={WIKI_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 px-5 py-2.5 rounded-lg font-medium hover:border-gray-500 hover:text-white transition"
          >
            View Wiki
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Category Grid */}
      {hasContent ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithDocs.map((category) => (
            <div
              key={category.slug}
              className="bg-gray-900 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition"
            >
              <h2 className="text-lg font-bold text-white mb-4">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="group flex items-start gap-2"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-400 mt-0.5 shrink-0 transition" />
                      <div>
                        <span className="text-gray-300 group-hover:text-orange-400 transition font-medium text-sm">
                          {doc.title}
                        </span>
                        {doc.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state when wiki has no sidebar */
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 text-center">
          <Book className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Documentation Coming Soon
          </h2>
          <p className="text-gray-400 mb-6">
            Documentation is being migrated to the GitHub Wiki. Check back soon
            or visit the wiki directly.
          </p>
          <a
            href={WIKI_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            Visit Wiki
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Resources */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Resources</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/gfargo/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
          >
            <div>
              <div className="font-medium text-white text-sm">
                GitHub Repository
              </div>
              <div className="text-xs text-gray-500">Source code & issues</div>
            </div>
          </a>
          <Link
            href="/community"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
          >
            <div>
              <div className="font-medium text-white text-sm">Community</div>
              <div className="text-xs text-gray-500">
                Discord & discussions
              </div>
            </div>
          </Link>
          <a
            href="https://github.com/gfargo/lights-pi/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
          >
            <div>
              <div className="font-medium text-white text-sm">Report Issue</div>
              <div className="text-xs text-gray-500">Found a bug?</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
