import { ReactNode, CSSProperties } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Delay in seconds — converted to a CSS custom property on the element. */
  delay?: number;
  /** Reserved for API compatibility; ignored in the CSS-only impl. */
  duration?: number;
  /** Reserved for API compatibility; ignored in the CSS-only impl. */
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * "scroll" (default) reveals when the element enters the viewport via
   * CSS `animation-timeline: view()`. "load" reveals on initial page load.
   */
  trigger?: "scroll" | "load";
}

/**
 * CSS-only reveal — replaces the framer-motion implementation.
 * Uses scroll-driven animations (Baseline-supported as of 2025) with a graceful
 * fallback (instant present) via @supports in globals.css.
 *
 * No JS observers, no framer-motion runtime. The API is preserved so existing
 * call sites compile without churn.
 */
export function FadeIn({
  children,
  delay = 0,
  className = "",
  trigger = "scroll",
}: FadeInProps) {
  const style: CSSProperties = delay ? { "--reveal-delay": `${delay}s` } as CSSProperties : {};
  const animClass = trigger === "load" ? "load-reveal" : "reveal";
  return (
    <div className={`${animClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
