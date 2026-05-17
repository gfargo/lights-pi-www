"use client";

import { Star } from "lucide-react";
import { trackEvent, type CtaLocation } from "@/lib/analytics";

interface GitHubStarsProps {
  /** Pre-fetched star count from the server component. */
  stars: number;
  /** Where on the page this widget is rendered — for funnel attribution. */
  location?: CtaLocation;
}

/**
 * GitHub stars pill — links to the repo and tracks the click with the current
 * star count, so we can see whether higher counts actually correlate with
 * click-through (vs. just decoration).
 *
 * Receives the pre-fetched count as a prop instead of fetching itself, since
 * this is a client component and the parent server component already has the
 * cached fetch in flight.
 */
export function GitHubStars({ stars, location = "footer" }: GitHubStarsProps) {
  return (
    <a
      href="https://github.com/gfargo/lights-pi"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent.clickGitHubStars(location, stars)}
      className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105"
    >
      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
      <span className="text-sm font-semibold text-gray-300">
        {stars > 0 ? `${stars} stars` : "Star on GitHub"}
      </span>
      <span className="text-sm text-gray-400">on GitHub</span>
    </a>
  );
}
