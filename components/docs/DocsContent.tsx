"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { DocsCodeBlock } from "./DocsCodeBlock"

interface DocsContentProps {
  content: string
}

/**
 * Prose styling for docs content: the display face for headings, full-paper
 * body text at reading size, hairlines on h2 and tables, underlined links.
 * Code (inline and blocks) stays in mono.
 */
export function DocsContent({ content }: DocsContentProps) {
  return (
    <div className="docs-prose max-w-[44rem]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              id={headingToId(children)}
              className="font-display text-paper leading-tight mt-0 mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              id={headingToId(children)}
              className="font-display text-paper leading-tight mt-16 mb-5 pb-3 border-b border-rule scroll-mt-24"
              style={{ fontSize: "clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem)" }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={headingToId(children)}
              className="font-display text-paper mt-10 mb-3 scroll-mt-24 leading-tight"
              style={{ fontSize: "1.375rem" }}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              id={headingToId(children)}
              className="font-medium text-paper mt-8 mb-3 scroll-mt-24"
              style={{ fontSize: "var(--step-body)" }}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-paper mb-5" style={{ fontSize: "var(--step-body)", lineHeight: 1.65 }}>
              {children}
            </p>
          ),
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>

            // Internal /docs links → Next.js Link
            if (href.startsWith("/docs")) {
              return (
                <Link
                  href={href}
                  className="text-paper underline decoration-amber-tungsten/60 decoration-2 underline-offset-4 hover:text-amber-tungsten hover:decoration-amber-tungsten transition-colors"
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
                  className="text-paper underline decoration-amber-tungsten/60 decoration-2 underline-offset-4 hover:text-amber-tungsten hover:decoration-amber-tungsten transition-colors inline-flex items-center gap-1"
                >
                  {children}
                  <span aria-hidden>↗</span>
                </a>
              )
            }

            // Relative or anchor links
            return (
              <Link
                href={href}
                className="text-paper underline decoration-amber-tungsten/60 decoration-2 underline-offset-4 hover:text-amber-tungsten hover:decoration-amber-tungsten transition-colors"
              >
                {children}
              </Link>
            )
          },
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2 text-paper list-disc pl-6 marker:text-paper/50" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 space-y-2 text-paper list-decimal pl-6 marker:text-paper/70" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-amber-tungsten pl-5 py-1 my-6 text-paper [&>p:last-child]:mb-0">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border-y border-rule">
              <table className="w-full border-collapse text-[16px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-rule">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left py-3 px-4 font-medium text-paper align-bottom">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-3 px-4 text-paper border-b border-rule align-top">
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
                className="font-mono text-[0.88em] text-paper bg-steel px-1.5 py-0.5 border border-rule break-words"
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
              className="border border-rule my-8 max-w-full"
            />
          ),
          hr: () => <hr className="border-rule my-12" />,
          strong: ({ children }) => (
            <strong className="text-paper font-semibold">{children}</strong>
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
