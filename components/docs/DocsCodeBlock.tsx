"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { trackEvent } from "@/lib/analytics"

interface DocsCodeBlockProps {
  children: string
  language: string
}

/**
 * Code block: hairline border, the language name and a copy button in the
 * text face above the code, the code itself in mono on the steel surface.
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
    <div className="relative group my-6 border border-rule bg-steel overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-rule">
        <span className="text-paper/80 text-[15px]">
          {language && language !== "text" ? language : "Snippet"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[15px] font-medium text-paper/80 hover:text-amber-tungsten transition-colors min-h-[32px] px-1"
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
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
        codeTagProps={{ style: { background: "transparent" } }}
        showLineNumbers={children.split("\n").length > 3}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
