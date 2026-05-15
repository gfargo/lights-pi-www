"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { DocsCodeBlock } from "./DocsCodeBlock"

interface DocsContentProps {
  content: string
}

/**
 * Editorial prose styling for docs content. Display serif for h1/h2/h3,
 * mono for h4, generous leading on body, hairline rules on h2 and tables,
 * tungsten amber for links.
 */
export function DocsContent({ content }: DocsContentProps) {
  return (
    <div className="docs-prose max-w-3xl">
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
              style={{ fontSize: "clamp(1.625rem, 3vw, 2rem)" }}
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
              className="font-mono text-xs uppercase tracking-widest text-amber-tungsten mt-8 mb-3 scroll-mt-24"
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="font-sans text-paper/80 leading-relaxed mb-5 text-[17px]">
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
                  className="text-amber-tungsten border-b border-amber-tungsten/40 hover:border-amber-tungsten transition-colors"
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
                  className="text-amber-tungsten border-b border-amber-tungsten/40 hover:border-amber-tungsten transition-colors inline-flex items-center gap-1"
                >
                  {children}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )
            }

            // Relative or anchor links
            return (
              <Link
                href={href}
                className="text-amber-tungsten border-b border-amber-tungsten/40 hover:border-amber-tungsten transition-colors"
              >
                {children}
              </Link>
            )
          },
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2 text-paper/80 list-none pl-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 space-y-2 text-paper/80 list-decimal pl-6 marker:text-paper/40 marker:font-mono marker:text-sm">
              {children}
            </ol>
          ),
          li: ({ children, ...rest }) => {
            // Check if we're in an ordered list — keep default list marker
            // Otherwise, render with our custom mono · bullet
            const isOrdered = (rest as { ordered?: boolean }).ordered;
            if (isOrdered) {
              return <li className="leading-relaxed pl-1">{children}</li>;
            }
            return (
              <li className="grid grid-cols-[1.25rem_1fr] gap-2 leading-relaxed">
                <span aria-hidden className="text-paper/30 font-mono">·</span>
                <span>{children}</span>
              </li>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-amber-tungsten pl-5 py-1 my-6 font-display italic text-paper/70 text-lg">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border-y border-rule">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-rule">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-paper/60">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-3 px-4 text-paper/80 border-b border-rule">
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
                className="font-mono text-[0.9em] text-amber-tungsten bg-steel/60 px-1.5 py-0.5 border border-rule"
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
