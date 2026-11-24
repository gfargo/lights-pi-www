"use client"

import { useState } from "react"
import { trackEvent } from "@/lib/analytics"

interface DocsFeedbackProps {
  slug: string
  wikiUrl: string
}

type FeedbackState = "idle" | "positive" | "negative"

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const
const inlineLink =
  "text-paper underline decoration-amber-tungsten/60 decoration-2 underline-offset-4 hover:text-amber-tungsten hover:decoration-amber-tungsten transition-colors"

/**
 * Feedback prompt at the foot of a doc page: a yes / no question, then a
 * thank-you or three ways to get help.
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
      <section className="mt-16 border-t border-rule pt-8 max-w-[44rem]" aria-live="polite">
        <p className="text-paper font-medium" style={body}>
          Thanks for the feedback.
        </p>
        <p className="text-paper mt-2" style={body}>
          Help improve this page by{" "}
          <a href={`${wikiUrl}/_edit`} target="_blank" rel="noopener noreferrer" className={inlineLink}>
            editing it on the wiki ↗
          </a>
          .
        </p>
      </section>
    )
  }

  if (state === "negative") {
    return (
      <section className="mt-16 border-t border-rule pt-8" aria-live="polite">
        <p className="text-paper font-medium" style={body}>
          Sorry this page wasn&apos;t helpful.
        </p>
        <p className="text-paper mt-2 mb-8" style={body}>
          Three ways to get help, or to fix it yourself.
        </p>
        <ul className="grid sm:grid-cols-3 gap-px bg-rule border-y border-rule">
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
    <section className="mt-16 border-t border-rule pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-paper font-medium" style={body}>
        Was this page helpful?
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleFeedback(true)}
          className="min-h-[44px] px-5 border border-paper/40 text-paper font-medium hover:border-amber-tungsten hover:text-amber-tungsten transition-colors"
          style={body}
          aria-label="Yes, this page was helpful"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => handleFeedback(false)}
          className="min-h-[44px] px-5 border border-paper/40 text-paper font-medium hover:border-amber-tungsten hover:text-amber-tungsten transition-colors"
          style={body}
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
        className="group block py-5 sm:px-5 hover:bg-steel transition-colors"
      >
        <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors" style={body}>
          {label} ↗
        </span>
        <p className="text-paper/80 mt-1" style={body}>
          {note}
        </p>
      </a>
    </li>
  )
}
