"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Global click listener that fires `external_link` for any anchor pointing to
 * a different origin than the marketing site. Mount once in the root layout.
 *
 * Why a global listener rather than per-link wiring:
 * - Catches every outbound link automatically (GitHub, Discord, Twitter, etc.)
 *   without each component needing to import the analytics helper.
 * - Survives new content added to docs / blog posts without code review for
 *   tracking coverage.
 *
 * Each (url, location) pair fires at most once per pathname per mount, so a
 * user rage-clicking GitHub doesn't spam the dashboard.
 */
export function OutboundLinkTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fired = new Set<string>();
    const currentHost = window.location.host;

    const onClick = (e: MouseEvent) => {
      // Bubble up from target to find the nearest <a>. Don't intercept
      // synthetic / middle / modified clicks — they're handled by the browser.
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Resolve protocol-relative / relative URLs the same way the browser will.
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Same-origin → not outbound. Also ignore mailto:, tel:, etc.
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (url.host === currentHost) return;

      const key = `${url.href}::${pathname}`;
      if (fired.has(key)) return;
      fired.add(key);

      trackEvent.clickExternalLink(url.href, url.host, pathname);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
