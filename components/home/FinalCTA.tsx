"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * FinalCTA — the curtain call. Replaces the previous gradient-soup section
 * (orange + blue + purple animated blobs) with a quiet editorial closing.
 *
 * No background gradients. No drop shadows. Two text-forward links.
 * The single tungsten line is the only color note.
 */
export function FinalCTA() {
  return (
    <section className="relative bg-ink py-32 overflow-hidden">
      <div className="hairline" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-12 text-center">
        <p className="eyebrow">Curtain call</p>

        <h2
          className="font-display text-paper mt-6 leading-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          Build the rig.
          <span className="block italic text-amber-tungsten">
            Run the room.
          </span>
        </h2>

        <p className="mt-10 text-lg text-paper/60 max-w-xl mx-auto leading-relaxed">
          A Pi, an ENTTEC, and ten minutes. The MCP server is included.
        </p>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-4">
          <Link
            href="/quick-start"
            onClick={() => trackEvent.clickGetStarted("final_cta")}
            className="group inline-flex items-center gap-3 text-paper text-base font-mono uppercase tracking-widest border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
          >
            Start the build
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="https://github.com/gfargo/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent.clickViewGitHub("final_cta")}
            className="group inline-flex items-center gap-3 text-paper/60 text-base font-mono uppercase tracking-widest hover:text-paper transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden />
            View on GitHub
          </a>
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-paper/30">
          Free forever · MIT · No telemetry
        </p>
      </div>
    </section>
  );
}
