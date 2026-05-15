/**
 * UseCases — editorial 4-up grid. No card chrome, no icons-in-colored-squares.
 * Each cell is a typographic vignette: oversized index number, role title in
 * Fraunces, supporting bullets in mono.
 */

interface UseCase {
  index: string;
  title: string;
  context: string;
  capabilities: string[];
}

const cases: UseCase[] = [
  {
    index: "01",
    title: "Studio video",
    context: "Recording, livestreaming, on-camera reading.",
    capabilities: [
      "Saved scenes per take",
      "Voice-call agent during recording",
      "Consistent color temp across sessions",
    ],
  },
  {
    index: "02",
    title: "Photography",
    context: "Portrait, product, editorial.",
    capabilities: [
      "Group fixtures by key / fill / back",
      "Snapshot the current look as a scene",
      "Recall from any device on the network",
    ],
  },
  {
    index: "03",
    title: "Agent integration",
    context: "Let an LLM drive the rig.",
    capabilities: [
      "Streamable HTTP MCP at /mcp",
      "16 tools, 1 workspace resource",
      "No bespoke client code",
    ],
  },
  {
    index: "04",
    title: "Theatre · events",
    context: "Cue-driven, audience-facing.",
    capabilities: [
      "Templates: party, ambient, spotlight",
      "Fade primitives with millisecond ack",
      "Wireless DMX over D-Fi or LAN",
    ],
  },
];

export function UseCases() {
  return (
    <section className="relative bg-ink py-32 overflow-hidden">
      <div className="hairline" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-20">
          <div>
            <p className="eyebrow">Use cases</p>
            <h2
              className="font-display text-paper mt-4"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Where it goes
              <span className="block italic text-paper/40">to work.</span>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 self-end whitespace-nowrap">
            04 contexts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-rule">
          {cases.map((c) => (
            <article
              key={c.index}
              className="group bg-ink p-10 lg:p-14 reveal hover:bg-steel/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-8">
                <span
                  className="font-mono text-amber-tungsten/60 group-hover:text-amber-tungsten transition-colors"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  {c.index}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-paper/30">
                  Case
                </span>
              </div>

              <h3
                className="font-display text-paper mt-10"
                style={{ fontSize: "2.5rem", lineHeight: 1.05 }}
              >
                {c.title}
              </h3>
              <p className="font-display italic text-lg text-paper/50 mt-2">
                {c.context}
              </p>

              <ul className="mt-10 space-y-2 hairline pt-6">
                {c.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[1.5rem_1fr] gap-3 font-mono text-sm text-paper/75 leading-snug"
                  >
                    <span className="text-paper/30">·</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
