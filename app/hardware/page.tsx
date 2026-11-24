"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { shoppingList, costSummary, setups } from "@/lib/hardware-catalog";
import { PageHead, SectionHead } from "@/components/PageHead";
import { SCENES } from "@/lib/scenes";
import { Swatch, SwatchButton } from "@/components/home/Swatch";

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const;

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={0}
        label="Hardware"
        title="The bill of materials."
        lead="Buy it once and own it. A Raspberry Pi, a USB-to-DMX interface and a few cables are all the rig needs."
        aside="Prices checked March 2026"
      />

      {/* Shopping list */}
      <section className="mb-[clamp(72px,8vw,120px)]">
        <SectionHead title="The shopping list" note={`${shoppingList.length} items`} />

        <div className="border-t border-rule">
          {/* Column heads, wide screens only */}
          <div
            className="hidden md:grid grid-cols-[1.6fr_1.4fr_6rem_8rem_1.5rem] gap-6 py-4 border-b border-rule text-paper/80 font-medium"
            style={body}
          >
            <span>Item</span>
            <span>What it does</span>
            <span className="text-right">Price</span>
            <span>Priority</span>
            <span className="sr-only">Link</span>
          </div>

          {shoppingList.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent.clickShoppingItem(item.item, item.price)}
              className="group grid grid-cols-[1fr_auto] md:grid-cols-[1.6fr_1.4fr_6rem_8rem_1.5rem] gap-x-6 gap-y-1 py-5 border-b border-rule hover:bg-steel transition-colors items-baseline"
              style={body}
            >
              <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors">
                {item.item}
              </span>
              <span className="text-paper order-3 md:order-none col-span-2 md:col-span-1">{item.purpose}</span>
              <span className="text-paper text-right tabular-nums order-2 md:order-none">{item.price}</span>
              <span className="order-4 md:order-none col-span-2 md:col-span-1">
                <PriorityTag priority={item.priority} />
              </span>
              <span
                aria-hidden
                className="hidden md:block text-paper/80 group-hover:text-amber-tungsten transition-colors justify-self-end"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Cost summary */}
      <section className="mb-[clamp(72px,8vw,120px)]">
        <SectionHead title="Three ways to build it" note="From budget to wireless" />
        <div className="grid md:grid-cols-3 gap-px bg-rule border-y border-rule">
          <CostCell scene={SCENES[5].cells} {...costSummary.minimum} />
          <CostCell scene={SCENES[0].cells} {...costSummary.recommended} highlight />
          <CostCell scene={SCENES[1].cells} {...costSummary.wireless} />
        </div>
      </section>

      {/* Example setups */}
      <section className="mb-[clamp(72px,8vw,120px)]">
        <SectionHead title="Example setups" note={`${setups.length} configurations`} />
        <div className="grid md:grid-cols-3 gap-px bg-rule border-y border-rule">
          {setups.map((setup) => (
            <article key={setup.name} className="bg-ink py-8 md:p-10">
              <h3 className="font-display text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.1 }}>
                {setup.name}
              </h3>
              <p className="text-paper/80 mt-2 tabular-nums" style={body}>
                {setup.price}
              </p>
              <ul className="mt-6 border-t border-rule pt-5 space-y-2 text-paper" style={body}>
                {setup.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Choosing the parts */}
      <section className="mb-[clamp(72px,8vw,120px)]">
        <SectionHead title="Choosing the parts" />
        <div className="border-t border-rule">
          <DeepDive
            title="Raspberry Pi"
            lede="Both the Pi 3B+ and the Pi 4 work well for Lights Pi. The Pi 4 has more headroom; the 3B+ keeps the bill of materials lighter."
            columns={[
              {
                heading: "Choose the Pi 4 if",
                bullets: [
                  "You have 10+ fixtures",
                  "You want a faster web interface",
                  "You plan to run additional services",
                  "You want to keep the MCP server snappy",
                ],
              },
              {
                heading: "Choose the Pi 3B+ if",
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
            title="ENTTEC DMX interface"
            lede="ENTTEC makes the most widely supported USB-to-DMX interfaces for QLC+. Two models, two budgets."
            columns={[
              {
                heading: "Open DMX USB, $67",
                bullets: [
                  "Entry-level, open-source hardware",
                  "Great for small setups and getting started",
                  "Output only, no RDM support",
                  "Works well with QLC+",
                ],
              },
              {
                heading: "DMX USB Pro, $130",
                bullets: [
                  "Professional-grade, faster frame rates",
                  "RDM support for device discovery",
                  "More stable under heavy load",
                  "Recommended for 10+ fixtures",
                ],
              },
            ]}
            warning="Avoid counterfeits. Buy from B&H Photo, Amazon (sold by ENTTEC), or authorized dealers — counterfeit units may not work properly with QLC+."
          />

          <DeepDive
            title="DMX cables"
            lede="Use proper DMX cable, not microphone cable. Most fixtures use 3-pin XLR; some pro fixtures use 5-pin. Cable quality matters on long runs."
            bullets={[
              "Maximum cable length: 300–500 ft total",
              "Use a termination resistor for long runs",
              "Avoid running DMX cables parallel to power",
              "ENTTEC interfaces use 5-pin — to connect to a 3-pin fixture (e.g. Chauvet D-Fi Hub 2) you'll need a 5-to-3 converter cable",
            ]}
          />
        </div>
      </section>

      {/* Next step */}
      <section className="border-t border-rule pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <p className="text-paper font-medium" style={body}>
            Got the parts?
          </p>
          <h2 className="font-display text-paper mt-3" style={{ fontSize: "var(--step-head)" }}>
            Ten minutes to first light.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-5">
          <SwatchButton href="/docs/quick-start" onClick={() => trackEvent.clickGetStarted("hardware")}>
            Quick-start guide
          </SwatchButton>
          <Link href="/docs/hardware-setup" className="link-plain">
            Hardware setup docs
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────── presentational ── */

function PriorityTag({ priority }: { priority: string }) {
  if (priority === "Required") {
    return (
      <span className="inline-flex items-center gap-2 text-amber-tungsten font-medium">
        <span aria-hidden className="inline-block h-3 w-3 bg-amber-tungsten" />
        Required
      </span>
    );
  }
  return <span className="text-paper/80">{priority}</span>;
}

function CostCell({
  label,
  price,
  note,
  scene,
  highlight = false,
}: {
  label: string;
  price: string;
  note: string;
  scene: string[];
  highlight?: boolean;
}) {
  return (
    <div className="bg-ink py-8 md:p-10">
      <Swatch cells={scene} className="h-2 w-28 !gap-[3px]" />
      <p className={`mt-5 font-medium ${highlight ? "text-amber-tungsten" : "text-paper"}`} style={body}>
        {label}
      </p>
      <div
        className="font-display text-paper mt-3 leading-none tabular-nums"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
      >
        {price}
      </div>
      <p className="text-paper/80 mt-5" style={body}>
        {note}
      </p>
    </div>
  );
}

function DeepDive({
  title,
  lede,
  columns,
  bullets,
  warning,
}: {
  title: string;
  lede: string;
  columns?: { heading: string; bullets: string[] }[];
  bullets?: string[];
  warning?: string;
}) {
  return (
    <article className="border-b border-rule py-10 md:py-14 grid lg:grid-cols-[minmax(0,20rem)_1fr] gap-x-12 gap-y-6">
      <h3 className="font-display text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.1 }}>
        {title}
      </h3>

      <div>
        <p className="text-paper max-w-[42rem]" style={{ fontSize: "var(--step-lead)", lineHeight: 1.45 }}>
          {lede}
        </p>

        {columns && (
          <div className="grid md:grid-cols-2 gap-10 mt-10 max-w-4xl">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-paper font-medium pb-3 mb-4 border-b border-rule" style={body}>
                  {col.heading}
                </p>
                <ul className="space-y-2 list-disc pl-5 marker:text-paper/50 text-paper" style={body}>
                  {col.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {bullets && (
          <ul className="mt-8 space-y-2 max-w-[42rem] list-disc pl-5 marker:text-paper/50 text-paper" style={body}>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {warning && (
          <p className="mt-8 max-w-[42rem] border-l-2 border-amber-tungsten pl-4 text-paper" style={body}>
            {warning}
          </p>
        )}
      </div>
    </article>
  );
}
