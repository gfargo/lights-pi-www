"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

interface DocsPageViewProps {
  slug: string
  title: string
}

/**
 * Client component that fires a page view event for docs analytics.
 * Renders nothing visible — purely for tracking.
 */
export function DocsPageView({ slug, title }: DocsPageViewProps) {
  useEffect(() => {
    trackEvent.viewDocsPage(slug, title)
  }, [slug, title])

  return null
}
