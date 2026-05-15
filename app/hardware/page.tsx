"use client";

import { Cpu, Usb, Cable, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { shoppingList, costSummary, setups } from "@/lib/hardware-catalog";

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-ink pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ─────────────────────────────────────────── HEADER ─── */}
        <header className="hairline pb-8 mb-16 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="eyebrow">Hardware</p>
            <h1
              className="font-display text-paper mt-3"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              The bill of materials.
              <span className="block italic text-paper/40">
                Buy it once. Own it forever.
              </span>
            </h1>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 whitespace-nowrap">
            Prices verified · Mar 2026
          </p>
        </header>

        {/* ────────────────────────────────────── SHOPPING LIST ─── */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Complete shopping list</p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              {shoppingList.length} items
            </p>
          </div>

          {/* Editorial table — hairline rows, mono, no card chrome */}
          <div className="hairline">
            {/* Column heads */}
            <div className="grid grid-cols-[1.6fr_1.4fr_5rem_8rem_2rem] gap-4 py-3 hairline font-mono text-xs uppercase tracking-widest text-paper/40">
              <span>Item</span>
              <span>Purpose</span>
              <span className="text-right">Price</span>
              <span className="text-center">Priority</span>
              <span className="text-right">↗</span>
            </div>

            {shoppingList.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent.clickShoppingItem(item.item, item.price)}
                className="group grid grid-cols-[1.6fr_1.4fr_5rem_8rem_2rem] gap-4 py-5 border-b border-rule hover:bg-steel/30 transition-colors items-baseline"
              >
                <span className="font-display text-paper text-lg leading-tight group-hover:text-amber-tungsten transition-colors">
                  {item.item}
                </span>
                <span className="font-sans text-paper/60 text-sm leading-tight">
                  {item.purpose}
                </span>
                <span className="font-mono text-paper tabular-nums text-right">
                  {item.price}
                </span>
                <PriorityTag priority={item.priority} />
                <ExternalLink className="w-3.5 h-3.5 text-paper/30 group-hover:text-amber-tungsten transition-colors justify-self-end" />
              </a>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────── COST SUMMARY ─── */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Three ways to fly it</p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              From budget to wireless
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-rule">
            <CostCell
              label={costSummary.minimum.label}
              price={costSummary.minimum.price}
              note={costSummary.minimum.note}
              tone="dim"
            />
            <CostCell
              label={costSummary.recommended.label}
              price={costSummary.recommended.price}
              note={costSummary.recommended.note}
              tone="signature"
            />
            <CostCell
              label={costSummary.wireless.label}
              price={costSummary.wireless.price}
              note={costSummary.wireless.note}
              tone="cool"
            />
          </div>
        </section>

        {/* ────────────────────────────────── EXAMPLE SETUPS ─── */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Example setups</p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              03 configurations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-rule">
            {setups.map((setup, i) => (
              <article
                key={setup.name}
                className="bg-ink p-10 group hover:bg-steel/30 transition-colors"
              >
                <span
                  className="font-mono text-amber-tungsten/60 group-hover:text-amber-tungsten transition-colors"
                  style={{ fontSize: "2rem", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-display text-paper mt-8"
                  style={{ fontSize: "2rem", lineHeight: 1.05 }}
                >
                  {setup.name}
                </h3>
                <p className="font-mono text-paper/50 mt-3 tabular-nums">
                  {setup.price}
                </p>
                <ul className="mt-8 hairline pt-6 space-y-2">
                  {setup.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="grid grid-cols-[1rem_1fr] gap-3 font-mono text-sm text-paper/70 leading-snug"
                    >
                      <span className="text-paper/30">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────── DEEP DIVES ─── */}
        <section className="mb-24 space-y-px bg-rule">
          <DeepDive
            kicker="Selection · 01"
            icon={Cpu}
            title="Raspberry Pi"
            lede="Both the Pi 3B+ and the Pi 4 work great for Lights Pi. The Pi 4 has more headroom; the 3B+ keeps the bill of materials lighter."
            columns={[
              {
                heading: "Choose Pi 4 if",
                bullets: [
                  "You have 10+ fixtures",
                  "You want faster web interface",
                  "You plan to run additional services",
                  "You want to keep the MCP server snappy",
                ],
              },
              {
                heading: "Choose Pi 3B+ if",
                bullets: [
                  "You're on a budget",
                  "You have fewer than 10 fixtures",
                  "You want minimal power draw",
                  "You're learning before scaling up",
                ],
              },
            ]}
          />

          <DeepDive
            kicker="Selection · 02"
            icon={Usb}
            title="ENTTEC DMX interface"
            lede="ENTTEC makes the most widely supported USB-to-DMX interfaces for QLC+. Two models, two budgets."
            columns={[
              {
                heading: "Open DMX USB · $67",
                bullets: [
                  "Entry-level, open-source hardware",
                  "Great for small setups and getting started",
                  "Output only, no RDM support",
                  "Works well with QLC+",
                ],
              },
              {
                heading: "DMX USB Pro · $130",
                bullets: [
                  "Professional-grade, faster frame rates",
                  "RDM support for device discovery",
                  "More stable under heavy load",
                  "Recommended for 10+ fixtures",
                ],
              },
            ]}
            warning={{
              text: "Avoid counterfeits. Buy from B&H Photo, Amazon (sold by ENTTEC), or authorized dealers — counterfeit units may not work properly with QLC+.",
            }}
          />

          <DeepDive
            kicker="Selection · 03"
            icon={Cable}
            title="DMX cables"
            lede="Use proper DMX cable, not microphone cable. Most fixtures use 3-pin XLR; some pro fixtures use 5-pin. Cable quality matters on long runs."
            bullets={[
              "Maximum cable length: 300–500 ft total",
              "Use a termination resistor for long runs",
              "Avoid running DMX cables parallel to power",
              "ENTTEC interfaces use 5-pin — to connect to a 3-pin fixture (e.g. Chauvet D-Fi Hub 2) you'll need a 5-to-3 converter cable",
            ]}
          />
        </section>

        {/* ─────────────────────────────────── CTA ─── */}
        <section className="hairline pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Got the parts?</p>
            <h2
              className="font-display text-paper mt-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ten minutes to first light.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-8 gap-y-3">
            <Link
              href="/docs/quick-start"
              onClick={() => trackEvent.clickGetStarted("hardware_cta")}
              className="group inline-flex items-center gap-3 text-paper font-mono uppercase tracking-widest text-sm border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
            >
              Quick-start guide
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/docs/hardware-setup"
              className="group inline-flex items-center gap-3 text-paper/60 font-mono uppercase tracking-widest text-sm hover:text-paper transition-colors"
            >
              Hardware setup docs
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── presentational ── */

function PriorityTag({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    Required:    "text-amber-tungsten",
    Recommended: "text-arc-cyan",
    Alternative: "text-paper/50",
    Optional:    "text-paper/40",
  };
  return (
    <span className={`font-mono text-xs uppercase tracking-widest text-center ${styles[priority] ?? "text-paper/50"}`}>
      {priority}
    </span>
  );
}

function CostCell({
  label,
  price,
  note,
  tone,
}: {
  label: string;
  price: string;
  note: string;
  tone: "dim" | "signature" | "cool";
}) {
  const accent = {
    dim:       "text-paper/40",
    signature: "text-amber-tungsten",
    cool:      "text-arc-cyan",
  }[tone];
  return (
    <div className="bg-ink p-10">
      <p className={`eyebrow ${accent}`}>{label}</p>
      <div
        className="font-display text-paper mt-6 leading-none"
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          letterSpacing: "-0.03em",
        }}
      >
        {price}
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mt-6">
        {note}
      </p>
    </div>
  );
}

function DeepDive({
  kicker,
  icon: Icon,
  title,
  lede,
  columns,
  bullets,
  warning,
}: {
  kicker: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lede: string;
  columns?: { heading: string; bullets: string[] }[];
  bullets?: string[];
  warning?: { text: string };
}) {
  return (
    <article className="bg-ink p-10 lg:p-14">
      <div className="grid lg:grid-cols-[12rem_1fr] gap-x-10 gap-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber-tungsten/70">
            {kicker}
          </p>
          <Icon className="w-6 h-6 text-amber-tungsten mt-6" aria-hidden />
        </div>

        <div>
          <h3
            className="font-display text-paper"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05 }}
          >
            {title}
          </h3>
          <p className="mt-4 text-lg text-paper/70 leading-relaxed max-w-3xl">
            {lede}
          </p>

          {columns && (
            <div className="grid md:grid-cols-2 gap-12 mt-10 max-w-4xl">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="font-mono text-xs uppercase tracking-widest text-paper/50 mb-4 hairline pb-3 border-b border-rule">
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[1rem_1fr] gap-3 font-sans text-paper/75 leading-relaxed"
                      >
                        <span className="text-paper/30">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {bullets && (
            <ul className="mt-8 space-y-2 max-w-3xl">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1rem_1fr] gap-3 font-sans text-paper/75 leading-relaxed"
                >
                  <span className="text-paper/30">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {warning && (
            <div className="mt-8 flex items-start gap-3 max-w-3xl border-l-2 border-amber-tungsten pl-4 py-1">
              <Shield className="w-4 h-4 text-amber-tungsten shrink-0 mt-1" aria-hidden />
              <p className="text-sm text-paper/70 leading-relaxed">{warning.text}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
