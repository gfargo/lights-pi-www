"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface DocsFeedbackProps {
  slug: string
  wikiUrl: string
}

type FeedbackState = "idle" | "positive" | "negative"

/**
 * Editorial feedback prompt. Replaces the previous rounded-card design with
 * a hairline-divided section, mono labels, two flat text-button options
 * (Yes / No), and a follow-up message after submission.
 */
export function DocsFeedback({ slug, wikiUrl }: DocsFeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle")

  const handleFeedback = (positive: boolean) => {
    const newState = positive ? "positive" : "negative"
    setState(newState)
    trackEvent.docsFeedback(slug, positive ? "helpful" : "not_helpful")
  }

  if (state === "positive") {
    return (
      <section className="mt-16 hairline pt-8">
        <p className="eyebrow text-amber-tungsten">Thanks for the feedback</p>
        <p className="font-display italic text-paper/70 text-lg mt-4 max-w-2xl">
          Help improve this page by{" "}
          <a
            href={`${wikiUrl}/_edit`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-tungsten border-b border-amber-tungsten/40 hover:border-amber-tungsten inline-flex items-center gap-1 not-italic"
          >
            editing it on the wiki
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          .
        </p>
      </section>
    )
  }

  if (state === "negative") {
    return (
      <section className="mt-16 hairline pt-8">
        <p className="eyebrow">Sorry this page wasn&apos;t helpful</p>
        <p className="font-display italic text-paper/70 text-lg mt-4 mb-8 max-w-2xl">
          Three ways to get help — or to fix it yourself.
        </p>
        <ul className="grid sm:grid-cols-3 gap-px bg-rule">
          <FeedbackOption
            label="Open an issue"
            note="Tell us what's broken"
            href={`https://github.com/gfargo/lights-pi/issues/new?title=Docs+feedback:+${encodeURIComponent(slug)}&labels=documentation`}
            onClick={() => trackEvent.docsFeedbackAction(slug, "open_issue")}
          />
          <FeedbackOption
            label="Ask on Discord"
            note="Real-time community help"
            href="/community"
            onClick={() => trackEvent.docsFeedbackAction(slug, "discord")}
          />
          <FeedbackOption
            label="Edit this page"
            note="Push a fix yourself"
            href={`${wikiUrl}/_edit`}
            onClick={() => trackEvent.docsFeedbackAction(slug, "edit_wiki")}
          />
        </ul>
      </section>
    )
  }

  return (
    <section className="mt-16 hairline pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="eyebrow">Was this page helpful?</p>
      <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
        <button
          onClick={() => handleFeedback(true)}
          className="text-paper/60 hover:text-arc-cyan border-b border-paper/20 hover:border-arc-cyan pb-1 transition-colors"
          aria-label="Yes, this page was helpful"
        >
          Yes
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="text-paper/60 hover:text-amber-tungsten border-b border-paper/20 hover:border-amber-tungsten pb-1 transition-colors"
          aria-label="No, this page was not helpful"
        >
          No
        </button>
      </div>
    </section>
  )
}

function FeedbackOption({
  label,
  note,
  href,
  onClick,
}: {
  label: string
  note: string
  href: string
  onClick: () => void
}) {
  return (
    <li className="bg-ink">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="group block p-5 hover:bg-steel/30 transition-colors"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-sm uppercase tracking-widest text-paper group-hover:text-amber-tungsten transition-colors">
            {label}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-paper/30 group-hover:text-amber-tungsten transition-colors" />
        </div>
        <p className="font-display italic text-paper/40 mt-1 text-sm">{note}</p>
      </a>
    </li>
  )
}
