"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires `scroll_depth` events at the 25 / 50 / 75 / 100 % marks for the
 * current document.
 *
 * Each milestone fires at most once per pathname per session — re-mounting on
 * route change resets the milestone set so a new page starts fresh.
 *
 * Mount once in the root layout; no props needed.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
    const fired = new Set<number>();
    let ticking = false;

    const compute = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollable = doc.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        // Page fits in viewport — count as 100%.
        if (!fired.has(100)) {
          fired.add(100);
          trackEvent.scrollDepth(pathname, 100);
        }
        return;
      }

      const pct = (scrollTop / scrollable) * 100;
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          trackEvent.scrollDepth(pathname, m);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    // Initial check — covers short pages where no scroll ever happens.
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
