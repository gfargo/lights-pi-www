import Link from "next/link";
import { SCENES } from "@/lib/scenes";
import { Swatch } from "./Swatch";

/**
 * Act VII. The price, very large. One bill of materials; the software is free.
 */
// The minimum build, from lib/hardware-catalog.ts (prices checked March 2026).
const LINES = [
  ["Raspberry Pi 3B+", "$40"],
  ["ENTTEC Open DMX USB", "$67"],
  ["32 GB microSD card", "$8"],
  ["Power supply", "$10"],
  ["Lights Pi, QLC+ and the MCP server", "free"],
];

export function Price() {
  return (
    <section className="bg-ink px-[var(--gutter)] py-[clamp(72px,9vw,140px)]" aria-labelledby="price-title">
      <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12 items-center">
        <div className="md:col-span-4">
          <h2 id="price-title" className="font-display text-paper rise" style={{ fontSize: "var(--step-lead)" }}>
            What it costs
          </h2>
          <p className="mt-5 text-paper rise" style={{ fontSize: "var(--step-body)", lineHeight: 1.55, ["--d" as string]: "80ms" }}>
            The hardware, once. The software is MIT-licensed: no subscription, no per-fixture licence, no account.
            That is the minimum build; the recommended Pi 4 with an ENTTEC DMX USB Pro and a case is about $230.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="relative inline-block rise" style={{ ["--d" as string]: "120ms" }}>
            <p
              className="font-display text-paper"
              style={{ fontSize: "clamp(7.5rem, 16vw, 15rem)", lineHeight: 0.85, letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums" }}
              aria-label="From 125 dollars"
            >
              <span style={{ fontSize: "0.5em", verticalAlign: "0.62em" }}>$</span>125
            </p>
            <Swatch
              cells={SCENES[0].cells}
              className="absolute right-[-12%] top-[-10%] h-[28%] w-[46%] !gap-[4px]"
            />
          </div>
          <ul className="mt-10 rise" style={{ ["--d" as string]: "180ms" }}>
            {LINES.map(([item, cost]) => (
              <li key={item} className="flex justify-between gap-6 max-w-[34rem] py-1.5 text-paper" style={{ fontSize: "18px" }}>
                <span>{item}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{cost}</span>
              </li>
            ))}
          </ul>
          <Link href="/hardware" className="mt-8 inline-flex min-h-[48px] items-center bg-paper text-ink px-6 font-medium transition-colors hover:bg-amber-tungsten" style={{ fontSize: "var(--step-body)" }}>
            See the hardware guide
          </Link>
        </div>
      </div>
    </section>
  );
}
