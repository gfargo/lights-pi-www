"use client";

import { useState } from "react";
import Link from "next/link";
import { SCENES } from "@/lib/scenes";
import { trackEvent } from "@/lib/analytics";
import { Swatch, SwatchButton } from "./Swatch";

/**
 * Act I. The motif at its largest: the rig's eight fixtures as eight tall
 * bars, cropped by the viewport, in the colours of a real scene. The scene
 * buttons under the headline recolour them with the same per-fixture values
 * the control server stores, and show the one call that recalls that scene.
 */
export function Hero() {
  const [active, setActive] = useState(SCENES[0]);

  return (
    <section className="relative overflow-hidden bg-ink md:min-h-[100svh]" aria-labelledby="hero-title">
      {/* The rig, enormous. Desktop: enters from the right. Phone: rises from the bottom. */}
      <div className="absolute hidden md:block left-[54%] -top-[8vh] h-[116vh] w-[64vw]">
        <Swatch cells={active.cells} className="h-full !gap-[14px]" label={`Eight fixtures in the ${active.name} scene`} />
      </div>

      <div className="relative z-10 flex md:min-h-[100svh] flex-col justify-start md:justify-center pt-28 md:pt-16 pb-12 md:pb-16 px-[var(--gutter)]">
        <div className="md:max-w-[46vw]">
          <h1
            id="hero-title"
            className="font-display text-paper rise"
            style={{ fontSize: "clamp(2.75rem, 6vw, 6rem)", textWrap: "balance" }}
          >
            Stage lights, run from&nbsp;a&nbsp;Pi.
          </h1>
          <p
            className="mt-8 max-w-[34rem] text-paper rise"
            style={{ fontSize: "var(--step-lead)", lineHeight: 1.45, ["--d" as string]: "80ms" }}
          >
            Lights Pi turns a Raspberry Pi into the controller for your DMX rig. Run it from a phone,
            a MIDI controller, OSC, or an AI agent. No cloud, no subscription.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 rise" style={{ ["--d" as string]: "160ms" }}>
            <SwatchButton href="/quick-start" onClick={() => trackEvent.clickGetStarted("hero")}>
              Build one
            </SwatchButton>
            <Link href="/docs" className="link-plain" onClick={() => trackEvent.clickViewDocs("hero")}>
              Read the docs
            </Link>
          </div>

          {/* The live thing: recall a real scene on the rig above. */}
          <div className="mt-12 md:mt-14 rise" style={{ ["--d" as string]: "240ms" }}>
            <p className="text-paper" style={{ fontSize: "var(--step-body)" }} id="scene-picker-label">
              Recall a scene on the rig
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby="scene-picker-label">
              {SCENES.map((s) => {
                const on = s.id === active.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(s)}
                    className={`group flex min-h-[44px] flex-col justify-between gap-2 px-3 pt-2 pb-0 text-left transition-colors ${
                      on ? "bg-paper text-ink" : "bg-steel text-paper hover:bg-[#222]"
                    }`}
                    style={{ fontSize: "var(--step-small)", fontWeight: 500 }}
                  >
                    <span>{s.name}</span>
                    <Swatch cells={s.cells} className="h-[6px] w-[72px] !gap-[2px]" />
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-paper/80" style={{ fontSize: "var(--step-small)" }}>
              On your rig this is <code className="text-paper">POST /api/scenes/{active.id}/activate</code>, or one
              tap in the app.
            </p>
          </div>
        </div>
      </div>

      {/* Phone: the rig rises from the bottom edge, cropped left, right and below. */}
      <div aria-hidden="true" className="md:hidden relative -mx-[12vw] h-[42svh] -mb-[8svh]">
        <Swatch cells={active.cells} className="h-full !gap-[8px]" />
      </div>
    </section>
  );
}
