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

export function DocsCodeBlock({ children, language }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    trackEvent.docsCodeCopy(language)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-700">
      {language && language !== "text" && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <span className="text-xs font-mono text-gray-500">{language}</span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
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
