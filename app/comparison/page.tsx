import Link from "next/link";
import { PageHead, SectionHead } from "@/components/PageHead";
import { Swatch, SwatchButton } from "@/components/home/Swatch";
import { SCENES } from "@/lib/scenes";

export const metadata = {
  title: "Comparison - Lights Pi",
  description:
    "How Lights Pi compares with commercial DMX consoles and app-based smart lighting: cost, fixtures, offline use, control surfaces and where each is the better choice.",
};

const COLUMNS = ["Commercial DMX consoles", "App-based smart lighting", "Lights Pi"] as const;

/** One row per question. Cells in COLUMNS order. Kept to claims we can stand behind. */
const ROWS: { feature: string; cells: [string, string, string] }[] = [
  {
    feature: "Up-front cost",
    cells: [
      "Typically $500 to $5,000 for a desk",
      "A hub or bridge, plus the vendor's own bulbs",
      "About $125 minimum, $230 recommended",
    ],
  },
  {
    feature: "Ongoing cost",
    cells: ["None", "Usually none; some features need an account", "None. MIT-licensed, no account"],
  },
  {
    feature: "Fixtures",
    cells: ["Any DMX fixture", "The vendor's own fixtures", "Any DMX fixture QLC+ has a profile for, or one you define"],
  },
  {
    feature: "Runs without the internet",
    cells: ["Yes", "Varies; remote control usually goes through the vendor's cloud", "Yes. Remote access is optional, over Tailscale"],
  },
  {
    feature: "Where you control it",
    cells: ["At the desk, sometimes a vendor app", "The vendor's phone app", "Any browser on the network, installable as an app"],
  },
  {
    feature: "Other inputs",
    cells: ["MIDI, timecode and network protocols, varies by desk", "Voice assistants and the vendor's integrations", "HTTP API, OSC, MIDI, and MCP with 48 tools for AI agents"],
  },
  {
    feature: "Physical faders",
    cells: ["Yes, that is the point", "No", "No. Touch faders in the virtual console"],
  },
  {
    feature: "Source code",
    cells: ["Closed", "Closed", "Open, on GitHub"],
  },
];

const PICKS = [
  {
    title: "When a console is the better choice",
    body: "Large rigs, moving heads by the dozen, busking a show on physical faders, or a venue where an operator already knows a particular desk. A dedicated console is built for that, and Lights Pi does not try to be one.",
    cell: SCENES[5].cells[0],
  },
  {
    title: "When an app is enough",
    body: "A few smart bulbs at home with no DMX fixtures in sight. A smart-lighting app is simpler to set up, and you do not need a Pi or a DMX interface.",
    cell: SCENES[1].cells[0],
  },
  {
    title: "Where Lights Pi fits",
    body: "Studios, streams, small venues and classrooms with real DMX fixtures, where you want saved scenes on a phone, cue lists for a running order, and an API or an AI agent that can drive the rig, without paying for a desk.",
    cell: SCENES[2].cells[0],
  },
];

export default function ComparisonPage() {
  return (
    <div className="bg-ink px-[var(--gutter)] pb-[clamp(96px,12vw,180px)]">
      <PageHead
        scene={2}
        label="Comparison"
        title="Where it fits, and where it doesn't."
        lead="Lights Pi sits between a lighting desk and a smart-bulb app: real DMX fixtures, controlled from a phone, for the price of a Pi and an interface."
      />

      <section aria-labelledby="matrix-title">
        <SectionHead id="matrix-title" title="Side by side" />

        <div role="table" aria-label="Lights Pi compared with commercial DMX consoles and app-based smart lighting">
          <div role="row" className="hidden md:grid md:grid-cols-[minmax(10rem,14rem)_1fr_1fr_1fr] md:items-end gap-x-8 pb-4">
            <span role="columnheader">
              <span className="sr-only">Question</span>
            </span>
            {COLUMNS.map((c, i) => (
              <span
                key={c}
                role="columnheader"
                className="font-medium text-paper"
                style={{ fontSize: "var(--step-body)" }}
              >
                {i === 2 ? (
                  <>
                    <Swatch cells={SCENES[2].cells} className="h-2 w-full max-w-[12rem] mb-3 !gap-[2px]" />
                    {c}
                  </>
                ) : (
                  c
                )}
              </span>
            ))}
          </div>

          {ROWS.map((row) => (
            <div
              key={row.feature}
              role="row"
              className="grid grid-cols-1 md:grid-cols-[minmax(10rem,14rem)_1fr_1fr_1fr] gap-x-8 gap-y-2 py-5 border-t border-paper/15"
            >
              <span role="rowheader" className="font-medium text-paper" style={{ fontSize: "var(--step-body)" }}>
                {row.feature}
              </span>
              {row.cells.map((cell, i) => (
                <span
                  key={i}
                  role="cell"
                  className={i === 2 ? "text-paper font-medium" : "text-paper/80"}
                  style={{ fontSize: "var(--step-body)", lineHeight: 1.45 }}
                >
                  <span className="md:hidden text-paper/80 font-normal">{COLUMNS[i]}: </span>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[40rem] text-paper/80" style={{ fontSize: "var(--step-body)" }}>
          Console and app columns describe the categories in general; individual products differ. Lights Pi&apos;s
          hardware prices come from the <Link href="/hardware" className="underline underline-offset-4">hardware guide</Link>.
        </p>
      </section>

      <section aria-labelledby="picks-title" className="mt-[clamp(96px,12vw,180px)]">
        <SectionHead id="picks-title" title="Picking one" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {PICKS.map((p) => (
            <div key={p.title}>
              <span aria-hidden="true" className="block h-3 w-12 mb-6" style={{ backgroundColor: p.cell }} />
              <h3 className="font-display text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.2 }}>
                {p.title}
              </h3>
              <p className="mt-4 text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="comparison-close" className="mt-[clamp(96px,12vw,180px)]">
        <h2
          id="comparison-close"
          className="font-display text-paper max-w-[18ch]"
          style={{ fontSize: "var(--step-head)", textWrap: "balance" }}
        >
          From $125, once.
        </h2>
        <p className="mt-6 max-w-[36rem] text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
          A Pi, a USB DMX interface and a cable. The software is free, with no subscription and no per-fixture licence.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <SwatchButton href="/quick-start">Start the build</SwatchButton>
          <Link href="/hardware" className="link-plain">
            See the hardware guide
          </Link>
        </div>
      </section>
    </div>
  );
}
