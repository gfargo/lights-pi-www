import { track } from "@vercel/analytics";

/**
 * Vercel Analytics event helpers.
 *
 * Conventions:
 * - Event names are snake_case nouns/verb_nouns that read well in a dashboard
 *   column ("cta_get_started", not "GetStartedClicked").
 * - Properties are flat strings/numbers — Vercel Analytics doesn't accept
 *   nested objects.
 * - Every CTA event takes a `location` so we can compare conversions across
 *   hero / nav / footer / mid-page placements without inventing event names
 *   per surface.
 * - Page-level engagement (scroll depth, time-on-page, outbound clicks) is
 *   handled by the global trackers mounted in `app/layout.tsx`. Don't duplicate
 *   that work in per-page handlers.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Where on the page a CTA was clicked. */
export type CtaLocation =
  | "hero"
  | "navigation"
  | "mobile_navigation"
  | "footer"
  | "final_cta"
  | "mid_page"
  | "docs"
  | "blog"
  | "community"
  | "comparison"
  | "use_cases"
  | "showcase"
  | "roadmap"
  | "faq"
  | "hardware"
  | "demo";

/** A docs feedback rating. */
export type DocsRating = "helpful" | "not_helpful";

/** Docs feedback follow-up actions. */
export type DocsFeedbackFollowup = "open_issue" | "discord" | "edit_wiki";

// ─────────────────────────────────────────────────────────────────────────────
// Event helpers — grouped by intent
// ─────────────────────────────────────────────────────────────────────────────

export const trackEvent = {
  // ─── Conversions / CTAs ───────────────────────────────────────────────────

  /** Primary "Get started" CTA — quick-start funnel entry. */
  clickGetStarted: (location: CtaLocation) => {
    track("cta_get_started", { location });
  },

  /** Click-through to the GitHub repo. */
  clickViewGitHub: (location: CtaLocation) => {
    track("cta_view_github", { location });
  },

  /** GitHub stars widget (the "1.2k stars" pill). */
  clickGitHubStars: (location: CtaLocation, stars: number) => {
    track("cta_github_stars", { location, stars });
  },

  /** Community join entry-point (Discord / Discussions). */
  clickJoinCommunity: (
    location: CtaLocation,
    channel: "discord" | "discussions" | "twitter" | "issues" | "wiki",
  ) => {
    track("cta_join_community", { location, channel });
  },

  /** Click into docs from a marketing surface. */
  clickViewDocs: (location: CtaLocation, slug?: string) => {
    track("cta_view_docs", { location, slug: slug ?? "" });
  },

  /** Click into the hardware shopping list / guide. */
  clickHardwareGuide: (location: CtaLocation) => {
    track("cta_hardware_guide", { location });
  },

  /** Click into the playground / live demo. */
  clickPlayground: (location: CtaLocation) => {
    track("cta_playground", { location });
  },

  // ─── Hardware / shopping ──────────────────────────────────────────────────

  /** Click a specific item in the shopping list. */
  clickShoppingItem: (item: string, price: string) => {
    track("shopping_item_click", { item, price });
  },

  // ─── Code / install ───────────────────────────────────────────────────────

  /** Generic code-block copy (homepage, marketing surfaces). */
  copyCode: (location: string) => {
    track("code_copied", { location });
  },

  /** Code copy inside a docs page (carries slug for funnel attribution). */
  docsCodeCopy: (slug: string) => {
    track("docs_code_copy", { slug });
  },

  /** User started the installation flow (clicked the curl one-liner). */
  startInstallation: (location: CtaLocation) => {
    track("installation_started", { location });
  },

  // ─── Demo / playground ────────────────────────────────────────────────────

  /** Any interaction inside the 3D demo / playground. */
  demoInteraction: (action: string) => {
    track("demo_interaction", { action });
  },

  // ─── Content engagement ───────────────────────────────────────────────────

  /** Page view with timing. Fired by `<PageViewTracker />`. */
  pageView: (path: string, referrer: string) => {
    track("page_view", { path, referrer });
  },

  /** Time-on-page (in seconds, bucketed). Fired on unmount/visibility-hide. */
  pageDwell: (path: string, seconds: number) => {
    // Bucket: 0-10, 10-30, 30-60, 60-120, 120-300, 300+
    const bucket =
      seconds < 10
        ? "0-10s"
        : seconds < 30
          ? "10-30s"
          : seconds < 60
            ? "30-60s"
            : seconds < 120
              ? "1-2m"
              : seconds < 300
                ? "2-5m"
                : "5m+";
    track("page_dwell", { path, bucket, seconds: Math.round(seconds) });
  },

  /** Scroll depth milestone reached (25, 50, 75, 100). */
  scrollDepth: (path: string, depth: 25 | 50 | 75 | 100) => {
    track("scroll_depth", { path, depth });
  },

  /** Outbound link clicked. Fired by `<OutboundLinkTracker />`. */
  clickExternalLink: (url: string, host: string, location: string) => {
    track("external_link", { url, host, location });
  },

  // ─── Blog / docs ──────────────────────────────────────────────────────────

  viewBlogPost: (slug: string, version?: string) => {
    track("blog_post_view", { slug, version: version ?? "" });
  },

  viewDocsPage: (slug: string, title: string) => {
    track("docs_page_view", { slug, title });
  },

  docsFeedback: (slug: string, rating: DocsRating) => {
    track("docs_feedback", { slug, rating });
  },

  docsFeedbackAction: (slug: string, action: DocsFeedbackFollowup) => {
    track("docs_feedback_action", { slug, action });
  },

  clickWikiLink: (slug: string, wikiUrl: string) => {
    track("docs_wiki_link", { slug, wikiUrl });
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────

  /** A FAQ accordion item was expanded. Tracks which questions resonate. */
  expandFaq: (category: string, question: string) => {
    track("faq_expand", { category, question });
  },

  // ─── Roadmap ──────────────────────────────────────────────────────────────

  /** Roadmap phase / milestone clicked. */
  viewRoadmapPhase: (phase: string) => {
    track("roadmap_phase_view", { phase });
  },

  // ─── Showcase ─────────────────────────────────────────────────────────────

  /** Showcase card / install clicked. */
  viewShowcaseItem: (item: string) => {
    track("showcase_item_view", { item });
  },

  // ─── Use cases ────────────────────────────────────────────────────────────

  /** Use-case card clicked. */
  viewUseCase: (useCase: string) => {
    track("use_case_view", { useCase });
  },

  // ─── Comparison ───────────────────────────────────────────────────────────

  /** Comparison-table competitor expanded / interacted with. */
  compareCompetitor: (competitor: string) => {
    track("comparison_competitor", { competitor });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Convenience: typed event-name registry (helpful if you ever want to enumerate
// every defined event for a debug panel or for completeness checks in CI).
// ─────────────────────────────────────────────────────────────────────────────

export const EVENT_NAMES = [
  "cta_get_started",
  "cta_view_github",
  "cta_github_stars",
  "cta_join_community",
  "cta_view_docs",
  "cta_hardware_guide",
  "cta_playground",
  "shopping_item_click",
  "code_copied",
  "docs_code_copy",
  "installation_started",
  "demo_interaction",
  "page_view",
  "page_dwell",
  "scroll_depth",
  "external_link",
  "blog_post_view",
  "docs_page_view",
  "docs_feedback",
  "docs_feedback_action",
  "docs_wiki_link",
  "faq_expand",
  "roadmap_phase_view",
  "showcase_item_view",
  "use_case_view",
  "comparison_competitor",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];
