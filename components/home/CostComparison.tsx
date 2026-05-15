/**
 * CostComparison — editorial two-column spread. Replaces the previous
 * 7-row comparison table that read like a procurement spec. This version
 * pits "the rig you build" against "the rig you buy" in display type, with
 * three line items each, no checkmarks or gradient cells.
 */

interface Column {
  label: string;
  headline: string;
  setup: string;
  lineItems: { line: string; cost: string }[];
  total: string;
  caveat: string;
  tone: "us" | "them";
}

const columns: Column[] = [
  {
    label: "The rig you build",
    headline: "≈ $135",
    setup: "10 minutes",
    lineItems: [
      { line: "Raspberry Pi 4 (4GB)", cost: "$55" },
      { line: "ENTTEC DMX USB Pro", cost: "$70" },
      { line: "MicroSD card · 32GB", cost: "$10" },
    ],
    total: "Unlimited fixtures · open source · no subscription",
    caveat: "Bring your own DMX rig",
    tone: "us",
  },
  {
    label: "The rig you buy",
    headline: "$500 – $5,000+",
    setup: "Vendor onboarding",
    lineItems: [
      { line: "Console hardware", cost: "$500–3.5k" },
      { line: "Cloud control plan", cost: "$15–80 / mo" },
      { line: "Per-fixture license", cost: "$8 each" },
    ],
    total: "Locked to vendor · cloud-dependent · per-seat pricing",
    caveat: "Pricing varies. Pricing always varies.",
    tone: "them",
  },
];

export function CostComparison() {
  return (
    <section className="relative bg-ink py-32 overflow-hidden">
      <div className="hairline" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        {/* Section head */}
        <div className="mb-20 max-w-4xl">
          <p className="eyebrow">Two ways to fly it</p>
          <h2
            className="font-display text-paper mt-4"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            One you own.
            <span className="block italic text-paper/40">
              One you rent.
            </span>
          </h2>
        </div>

        {/* Two-column editorial spread */}
        <div className="grid lg:grid-cols-2 gap-px bg-rule">
          {columns.map((col) => (
            <div
              key={col.label}
              className="bg-ink p-10 lg:p-14"
            >
              <p
                className={`eyebrow ${
                  col.tone === "us" ? "text-amber-tungsten" : "text-paper/40"
                }`}
              >
                {col.label}
              </p>

              <div
                className={`font-display mt-6 leading-none ${
                  col.tone === "us" ? "text-paper" : "text-paper/40"
                }`}
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {col.headline}
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mt-4">
                Setup · {col.setup}
              </p>

              <dl className="mt-12 space-y-3">
                {col.lineItems.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto] gap-4 items-baseline pb-3 border-b border-rule"
                  >
                    <dt
                      className={`font-sans ${
                        col.tone === "us" ? "text-paper/85" : "text-paper/50"
                      }`}
                    >
                      {item.line}
                    </dt>
                    <dd className="font-mono text-sm tabular-nums text-paper/60">
                      {item.cost}
                    </dd>
                  </div>
                ))}
              </dl>

              <p
                className={`mt-10 font-display italic text-lg leading-snug ${
                  col.tone === "us" ? "text-paper" : "text-paper/40"
                }`}
              >
                {col.total}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/30 mt-3">
                {col.caveat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
