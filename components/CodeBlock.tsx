"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackEvent.copyCode(filename || language);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="bg-black/40 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-white/10">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre className={`bg-black/60 text-gray-100 p-4 ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-x-auto border border-white/5`}>
          <code className={`language-${language} text-sm`}>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
