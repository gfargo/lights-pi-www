/**
 * Cue Sheet — the page's pivot moment, styled as a printed lighting cue
 * sheet from a theatre's production booklet. Paper-cream background breaks
 * up the all-dark page. Tabular mono, hairline rules, drop caps and
 * margin notation.
 *
 * Each cue row demonstrates a real lights-pi capability (a saved scene,
 * a template, an MCP tool call) in the register of stage directions.
 */

const cues: Cue[] = [
  {
    no: "000",
    act: "PRE",
    direction: "Identify front-left fixture. Verify rig.",
    target: 'identify_fixture(fixture_id: 0)',
    duration: "00 / 00 / 02",
  },
  {
    no: "001",
    act: "I",
    direction: "Group the three front pars as 'key-lights'.",
    target: 'create_group(name: "key-lights", fixtures: [0, 3, 4])',
    duration: "—",
  },
  {
    no: "002",
    act: "I",
    direction: "House lights up. Warm wash from key.",
    target: 'apply_template("youtube-studio")',
    duration: "00 / 02 / 00",
  },
  {
    no: "003",
    act: "I",
    direction: "Establish three-point look in one move.",
    target: 'batch_action([key: warm, fill: cool, back: magenta])',
    duration: "00 / 03 / 00",
    accent: true,
  },
  {
    no: "004",
    act: "I",
    direction: "Spot on subject. Rest of rig black.",
    target: 'activate_scene("Spotlight")',
    duration: "00 / 01 / 50",
  },
  {
    no: "005",
    act: "II",
    direction: "Slow fade to amber. Hold ambient.",
    target: 'fade(target: "warm", duration: "5", groups: ["key-lights"])',
    duration: "00 / 05 / 00",
  },
  {
    no: "006",
    act: "II",
    direction: "Capture this moment as scene.",
    target: 'snapshot_scene("evening edit")',
    duration: "00 / 00 / 18",
  },
  {
    no: "007",
    act: "III",
    direction: "Emergency — kill everything, instantly.",
    target: 'blackout()',
    duration: "00 / 00 / 00",
  },
  {
    no: "008",
    act: "III",
    direction: "Fade to black. House out.",
    target: 'fade(target: "0", duration: "8")',
    duration: "00 / 08 / 00",
  },
];

interface Cue {
  no: string;
  act: string;
  direction: string;
  target: string;
  duration: string;
  accent?: boolean;
}

export function CueSheet() {
  return (
    <section className="relative bg-paper text-ink py-28 overflow-hidden">
      {/* Subtle paper grain so the cream doesn't read flat */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* Program-booklet masthead */}
        <header className="flex items-end justify-between gap-6 hairline-paper pb-6 border-b border-paper-rule">
          <div>
            <p
              className="font-mono uppercase tracking-widest text-xs text-paper-muted"
            >
              Program / Cue Sheet
            </p>
            <h2
              className="font-display text-ink mt-2"
              style={{ fontSize: "var(--text-display-md)", lineHeight: 0.95 }}
            >
              The rig speaks
              <span className="italic"> stage directions.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-xs text-paper-muted">
            <div>Riversway Stage</div>
            <div>Production: lights-pi</div>
            <div>v2.2.0 · Run 1</div>
          </div>
        </header>

        {/* Sheet body — tabular cue list */}
        <div className="mt-10 reveal">
          {/* Column headers */}
          <div className="grid grid-cols-[3rem_2.5rem_1fr_1.4fr_5.5rem] gap-x-6 pb-3 border-b border-paper-rule font-mono text-xs uppercase tracking-widest text-paper-muted">
            <span>Cue</span>
            <span>Act</span>
            <span>Direction</span>
            <span>DMX Target</span>
            <span className="text-right">Hh / Mm / Ss</span>
          </div>

          {/* Rows */}
          {cues.map((cue) => (
            <div
              key={cue.no}
              className={`group grid grid-cols-[3rem_2.5rem_1fr_1.4fr_5.5rem] gap-x-6 py-4 border-b border-paper-rule transition-colors hover:bg-ink/[0.04] ${
                cue.accent ? "bg-amber-tungsten/[0.06]" : ""
              }`}
            >
              <span className="font-mono text-base text-paper-muted tabular-nums">
                {cue.no}
              </span>
              <span className="font-mono text-base text-ink/50">{cue.act}</span>
              <span className="font-display italic text-lg text-ink leading-tight">
                {cue.direction}
              </span>
              <code className="font-mono text-sm text-ink/85 leading-snug self-center">
                {cue.target}
              </code>
              <span className="font-mono text-xs text-paper-muted tabular-nums text-right self-center">
                {cue.duration}
              </span>
            </div>
          ))}
        </div>

        {/* Footer line — author plate, like a printed booklet */}
        <footer className="mt-12 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-paper-muted">
          <span>Sheet 01 of 01</span>
          <span>· stage manager : you ·</span>
          <span>set to print</span>
        </footer>
      </div>
    </section>
  );
}
