"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { SwatchButton } from "./Swatch";

/** Act VIII. The close: one line, one action, one beam of light. */
export function Close() {
  return (
    <section className="relative bg-ink overflow-hidden" aria-labelledby="close-title">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-6 px-[var(--gutter)] py-[clamp(96px,12vw,180px)] flex flex-col justify-center">
          <h2 id="close-title" className="font-display text-paper rise" style={{ fontSize: "clamp(2.75rem, 6vw, 6rem)", textWrap: "balance" }}>
            Build it this weekend.
          </h2>
          <p className="mt-6 max-w-[30rem] text-paper rise" style={{ fontSize: "var(--step-lead)", lineHeight: 1.45, ["--d" as string]: "80ms" }}>
            A Pi, an ENTTEC and a DMX cable. The quick start walks you through the rest.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 rise" style={{ ["--d" as string]: "160ms" }}>
            <SwatchButton href="/quick-start" onClick={() => trackEvent.clickGetStarted("final_cta")}>
              Start the build
            </SwatchButton>
            <a
              href="https://github.com/gfargo/lights-pi"
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain"
              onClick={() => trackEvent.clickViewGitHub("final_cta")}
            >
              Source on GitHub
            </a>
          </div>
        </div>
        <div className="md:col-span-6 relative min-h-[56vw] md:min-h-[60vh] lg:min-h-[72vh] overflow-hidden">
          <Image
            src="/images/found/spotlight-14871682502.jpg"
            alt="A single spotlight beam cutting diagonally through haze in a dark room."
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover drift"
          />
        </div>
      </div>
    </section>
  );
}
