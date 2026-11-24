"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `.in` to `.rise` and `.shutter` elements as they enter the viewport.
 * The `js` class on <html> is what hides them first, so without script (or
 * before hydration) every element is simply visible. Elements mounted later
 * (lazy sections, client navigation) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) return;
    root.classList.add("js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (proxies.get(e.target) ?? e.target).classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    // A closed shutter is fully clipped, and Chrome counts the element's own
    // clip-path when intersecting, so observe its parent on its behalf.
    const proxies = new Map<Element, Element>();
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(".rise:not(.in), .shutter:not(.in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.classList.contains("shutter") && el.parentElement) {
          proxies.set(el.parentElement, el);
          io.observe(el.parentElement);
        } else {
          io.observe(el);
        }
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
