"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Custom page-view + dwell-time tracking on top of Vercel Analytics' built-in
 * automatic pageviews. We emit two extra events:
 *
 * - `page_view` with referrer (Vercel's built-in pageview doesn't expose
 *   document.referrer in custom events, so this gives us in-funnel attribution).
 * - `page_dwell` on visibility-hide / unmount with a bucketed time-on-page.
 *
 * Note: Vercel's built-in pageview is still the source of truth for total
 * traffic — these events complement it for engagement analysis.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  // Initialize to 0; the useEffect below sets it to Date.now() on mount.
  // Doing it inside the effect keeps render pure (react-hooks/purity).
  const enteredAt = useRef<number>(0);
  const dwellFiredFor = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // New page → reset timer + fire page_view.
    enteredAt.current = Date.now();
    dwellFiredFor.current = null;
    trackEvent.pageView(pathname, document.referrer || "direct");

    const fireDwell = () => {
      if (dwellFiredFor.current === pathname) return;
      const seconds = (Date.now() - enteredAt.current) / 1000;
      // Filter out instant bounces (< 1s) — usually preconnect or canceled nav.
      if (seconds < 1) return;
      dwellFiredFor.current = pathname;
      trackEvent.pageDwell(pathname, seconds);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") fireDwell();
    };
    const onPageHide = () => fireDwell();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      // Fire on route-change unmount too.
      fireDwell();
    };
  }, [pathname]);

  return null;
}
