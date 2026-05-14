"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, ExternalLink, MessageCircle, Bug } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface DocsFeedbackProps {
  slug: string
  wikiUrl: string
}

type FeedbackState = "idle" | "positive" | "negative"

export function DocsFeedback({ slug, wikiUrl }: DocsFeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle")

  const handleFeedback = (positive: boolean) => {
    const newState = positive ? "positive" : "negative"
    setState(newState)
    trackEvent.docsFeedback(slug, positive ? "helpful" : "not_helpful")
  }

  if (state === "positive") {
    return (
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <p className="text-green-300 font-medium mb-2">
            Thanks for the feedback!
          </p>
          <p className="text-gray-400 text-sm">
            Help improve this page by{" "}
            <a
              href={`${wikiUrl}/_edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline inline-flex items-center gap-1"
            >
              editing it on the wiki
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (state === "negative") {
    return (
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <p className="text-white font-medium mb-4">
            Sorry this page wasn&apos;t helpful. Here&apos;s how to get help:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href={`https://github.com/gfargo/lights-pi/issues/new?title=Docs+feedback:+${encodeURIComponent(slug)}&labels=documentation`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/50 transition text-sm"
              onClick={() => trackEvent.docsFeedbackAction(slug, "open_issue")}
            >
              <Bug className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-gray-300">Open an issue</span>
            </a>
            <a
              href="/community"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/50 transition text-sm"
              onClick={() => trackEvent.docsFeedbackAction(slug, "discord")}
            >
              <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-gray-300">Ask on Discord</span>
            </a>
            <a
              href={`${wikiUrl}/_edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/50 transition text-sm"
              onClick={() => trackEvent.docsFeedbackAction(slug, "edit_wiki")}
            >
              <ExternalLink className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-gray-300">Edit this page</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-700">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Was this page helpful?</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleFeedback(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-500/50 transition text-sm"
            aria-label="Yes, this page was helpful"
          >
            <ThumbsUp className="w-4 h-4" />
            Yes
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition text-sm"
            aria-label="No, this page was not helpful"
          >
            <ThumbsDown className="w-4 h-4" />
            No
          </button>
        </div>
      </div>
    </div>
  )
}
