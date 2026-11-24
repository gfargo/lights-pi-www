"use client";

import { useState } from "react";
import { kelvinToHex } from "@/lib/scenes";

/**
 * Act V. One control, blown up: the white-balance slider from the Quick
 * tools tab, at poster size. Dragging it lights the whole field at that
 * colour temperature and names the source in the heading.
 */
const SOURCES: [number, string][] = [
  [2400, "candlelight"],
  [3600, "tungsten"],
  [4800, "morning sun"],
  [6400, "daylight"],
  [10001, "open sky"],
];

const MIN = 1800;
const MAX = 10000;

export function Kelvin() {
  const [k, setK] = useState(3200);
  const field = kelvinToHex(k);
  const source = SOURCES.find(([limit]) => k < limit)?.[1] ?? "open sky";
  const pct = ((k - MIN) / (MAX - MIN)) * 100;

  return (
    <section
      className="relative overflow-hidden min-h-[78svh] md:min-h-[62svh] lg:min-h-[80svh] px-[var(--gutter)] pt-[clamp(72px,9vw,128px)] transition-colors duration-300"
      style={{ backgroundColor: field, color: "#0a0a0a" }}
      aria-labelledby="kelvin-title"
    >
      <h2 id="kelvin-title" className="font-display rise" style={{ fontSize: "var(--step-head)" }}>
        Light it like <span aria-live="polite">{source}</span>.
      </h2>
      <p className="mt-5 max-w-[34rem] rise" style={{ fontSize: "var(--step-body)", lineHeight: 1.55, ["--d" as string]: "80ms" }}>
        Set white balance in Kelvin and every fixture mixes its own LEDs to match, whether it has warm and cool
        whites or only red, green and blue. Drag the slider below.
      </p>

      {/* The control, at poster scale; the section crops its far end. */}
      <div
        data-ui
        className="absolute left-[var(--gutter)] md:left-[34%] right-[-14%] bottom-[clamp(56px,8vw,96px)]"
        style={{ fontSize: "clamp(18px, 3.2vw, 46px)" }}
      >
        <div className="flex items-baseline justify-between gap-6 pr-[calc(14%+var(--gutter))]">
          <label htmlFor="kelvin" className="font-medium">
            White balance
          </label>
          <output htmlFor="kelvin" className="font-display" style={{ fontSize: "2.4em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {k}K
          </output>
        </div>
        <div className="relative mt-[0.6em] h-[1.6em] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[#0a0a0a]">
          {/* Track: five flat steps along the black-body curve. */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[0.5em] swatch !gap-[3px]" aria-hidden="true">
            {[1800, 2700, 3600, 4500, 5600, 6800, 8200, 10000].map((t) => (
              <span key={t} style={{ backgroundColor: kelvinToHex(t) }} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="absolute top-0 h-full w-[0.9em] bg-[#0a0a0a] -translate-x-1/2 pointer-events-none transition-[left] duration-75"
            style={{ left: `${pct}%` }}
          />
          <input
            id="kelvin"
            type="range"
            min={MIN}
            max={MAX}
            step={100}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-valuetext={`${k} kelvin, ${source}`}
          />
        </div>
        <div className="mt-[0.5em] flex justify-between pr-[calc(14%+var(--gutter))]" style={{ fontSize: "max(13px, 0.45em)" }} aria-hidden="true">
          <span>1800 candle</span>
          <span>3200 tungsten</span>
          <span>5600 daylight</span>
        </div>
      </div>
    </section>
  );
}
