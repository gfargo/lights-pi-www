"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { DocsCodeBlock } from "./DocsCodeBlock"

interface DocsContentProps {
  content: string
}

export function DocsContent({ content }: DocsContentProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              id={headingToId(children)}
              className="text-3xl font-bold tracking-tight text-white mb-6"
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              id={headingToId(children)}
              className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-gray-700 scroll-mt-20"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={headingToId(children)}
              className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-20"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              id={headingToId(children)}
              className="text-lg font-semibold text-white mt-6 mb-2 scroll-mt-20"
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 leading-7 mb-4">{children}</p>
          ),
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>

            // Internal /docs links → Next.js Link
            if (href.startsWith("/docs")) {
              return (
                <Link
                  href={href}
                  className="text-orange-400 underline-offset-2 hover:underline"
                >
                  {children}
                </Link>
              )
            }

            // External links
            if (href.startsWith("http")) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline-offset-2 hover:underline inline-flex items-center gap-1"
                >
                  {children}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )
            }

            // Relative or anchor links
            return (
              <Link
                href={href}
                className="text-orange-400 underline-offset-2 hover:underline"
              >
                {children}
              </Link>
            )
          },
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4 space-y-1 text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-400 my-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-gray-700">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left py-2 px-3 font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-2 px-3 text-gray-300 border-b border-gray-800">
              {children}
            </td>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isBlock = match || (typeof children === "string" && children.includes("\n"))

            if (isBlock) {
              return (
                <DocsCodeBlock language={match?.[1] ?? "text"}>
                  {String(children).replace(/\n$/, "")}
                </DocsCodeBlock>
              )
            }

            return (
              <code
                className="bg-gray-800 text-orange-300 font-mono text-sm px-1.5 py-0.5 rounded"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => <>{children}</>,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ""}
              className="rounded-lg border border-gray-700 my-6 max-w-full"
            />
          ),
          hr: () => <hr className="border-gray-700 my-8" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

/**
 * Converts React children (heading content) to a URL-friendly ID.
 */
function headingToId(children: React.ReactNode): string {
  const text = extractText(children)
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: React.ReactNode } }
    return extractText(element.props.children)
  }
  return ""
}
