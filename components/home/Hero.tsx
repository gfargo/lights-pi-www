"use client";

import Link from "next/link";
import { Github, Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { LightBeams } from "./LightBeams";

interface HeroProps {
  /** Real-time GitHub star count, fetched server-side. */
  stars: number;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return String(n);
}

/**
 * Editorial-theatrical hero.
 *
 * Composition:
 *  - Hand-coded SVG light rig (LightBeams) projects three beams from a
 *    hairline truss, additive-blended so overlaps brighten.
 *  - Headline breaks across three lines, last line in italic tungsten amber.
 *  - "House lights up" load sequence — beams fade in 0.3s → 0.9s, then the
 *    text reveals top-down in coordination with the third beam.
 *  - Real GitHub stars (mono, tabular figures) sit on a hairline below the
 *    CTA group.
 *  - A single filament pulse in the bottom-right is the only motion that
 *    persists after the load reveal.
 */
export function Hero({ stars }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Stage rig — pure SVG, additive blended */}
      <LightBeams />

      {/* Film grain texture overlay — pure SVG noise, ~700 bytes */}
      <div className="grain absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        {/* Mono eyebrow — sets the editorial register immediately */}
        <p
          className="eyebrow load-reveal"
          style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
        >
          Riversway · Lights-Pi · v2.2.0
        </p>

        {/* Editorial display headline — staggered to land with the beams */}
        <h1
          className="font-display text-paper mt-8 max-w-5xl"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          <span
            className="load-reveal block"
            style={{ "--reveal-delay": "0.55s" } as React.CSSProperties}
          >
            Stage lights,
          </span>
          <span
            className="load-reveal block"
            style={{ "--reveal-delay": "0.75s" } as React.CSSProperties}
          >
            on the network.
          </span>
          <span
            className="load-reveal block italic"
            style={{
              "--reveal-delay": "1s",
              color: "var(--color-amber-tungsten)",
            } as React.CSSProperties}
          >
            Now they take instructions.
          </span>
        </h1>

        {/* Subhead — MCP angle leads */}
        <p
          className="font-sans text-lg md:text-xl text-paper/70 mt-10 max-w-2xl leading-relaxed load-reveal"
          style={{ "--reveal-delay": "1.2s" } as React.CSSProperties}
        >
          A headless QLC+ controller for the Raspberry Pi.
          Drive your DMX rig from any browser on the network —
          or hand the keys to{" "}
          <span className="text-paper">Claude, ChatGPT, or any MCP-capable agent</span>{" "}
          over the built-in Streamable HTTP endpoint.
        </p>

        {/* CTAs — text-forward, two flat links */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-x-10 gap-y-4 load-reveal"
          style={{ "--reveal-delay": "1.4s" } as React.CSSProperties}
        >
          <Link
            href="/quick-start"
            onClick={() => trackEvent.clickGetStarted("hero")}
            className="group inline-flex items-center gap-3 text-paper text-base font-mono uppercase tracking-widest border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
          >
            Start here
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/demo"
            onClick={() => trackEvent.demoInteraction("hero_demo_click")}
            className="group inline-flex items-center gap-3 text-paper/60 text-base font-mono uppercase tracking-widest hover:text-arc-cyan transition-colors"
          >
            <span className="arc inline-block w-2 h-2 rounded-full bg-arc-cyan" />
            Try the playground
          </Link>
        </div>

        {/* Real GitHub stars — no fake numbers, no inflated stats */}
        <div
          className="mt-20 hairline pt-6 max-w-2xl flex items-center justify-between gap-6 load-reveal"
          style={{ "--reveal-delay": "1.6s" } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 text-paper/50">
            <Github className="w-4 h-4" aria-hidden />
            <a
              href="https://github.com/gfargo/lights-pi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-widest hover:text-paper transition-colors"
            >
              gfargo / lights-pi
            </a>
          </div>
          <div className="flex items-center gap-2 text-paper">
            <Star
              className="w-3.5 h-3.5 text-amber-tungsten fill-amber-tungsten"
              aria-hidden
            />
            <span className="font-mono text-sm tabular-nums">{formatStars(stars)}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-paper/40">
              stars
            </span>
          </div>
        </div>
      </div>

      {/* Single subtle ambient pulse, bottom-right — the only motion that
          continues post-load */}
      <div className="absolute bottom-10 right-10 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-paper/40 pointer-events-none">
        <span className="filament inline-block w-1.5 h-1.5 rounded-full bg-amber-tungsten" />
        live
      </div>
    </section>
  );
}
