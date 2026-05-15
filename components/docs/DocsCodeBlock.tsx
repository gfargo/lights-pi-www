"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface DocsCodeBlockProps {
  children: string
  language: string
}

/**
 * Editorial code block — hairline border, mono caption label, copy button
 * only revealed on hover. Background stays consistent with the docs
 * surface (steel/30, not the syntax theme's default).
 */
export function DocsCodeBlock({ children, language }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    trackEvent.docsCodeCopy(language)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6 border border-rule bg-steel/30 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-rule">
        <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
          {language && language !== "text" ? language : "snippet"}
        </span>
        <button
          onClick={handleCopy}
          className="font-mono text-xs uppercase tracking-widest text-paper/40 hover:text-amber-tungsten transition-colors opacity-0 group-hover:opacity-100 inline-flex items-center gap-1.5"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          background: "transparent",
          fontSize: "0.875rem",
        }}
        showLineNumbers={children.split("\n").length > 3}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
