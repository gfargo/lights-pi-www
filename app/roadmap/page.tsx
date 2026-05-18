import Link from "next/link";

export const metadata = {
  title: "Roadmap — Lights Pi | Shipping cadence + what's next",
  description:
    "Current shipping cadence for Lights Pi. The v2.13 era — AI scene generation, MCP server, agentic chat, mobile PWA — and what's queued for 2027.",
  openGraph: {
    title: "Roadmap — Lights Pi",
    description: "Current shipping cadence and what's queued next.",
    type: "website",
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   Roadmap data model
   ────────────────────────────────────────────────────────────────────────── */

type Status = "completed" | "in-progress" | "planned" | "future";

interface RoadmapItem {
  title: string;
  description: string;
  /** GitHub release tag (e.g. "v2.13.2") for completed items. */
  release?: string;
  /** GitHub issue number for planned/future items. */
  issue?: number;
}

interface RoadmapQuarter {
  status: Status;
  quarter: string;
  /** One-line subtitle in the editorial register. */
  heading: string;
  items: RoadmapItem[];
}

const REPO = "gfargo/lights-pi";

const roadmap: RoadmapQuarter[] = [
  {
    status: "completed",
    quarter: "Q4 2025",
    heading: "Foundation",
    items: [
      {
        title: "v1.0 — initial stable release",
        description:
          "First public cut. Headless Pi controller with ENTTEC DMX USB Pro support.",
        release: "v1.0",
      },
      {
        title: "QLC+ headless web UI",
        description:
          "QLC+ running in minimal-Qt mode, served over the network on port 9999.",
      },
      {
        title: "Auto-discovery via mDNS",
        description: "lights.local — zero-config access from any laptop on the studio LAN.",
      },
      {
        title: "One-command HTTPS setup",
        description:
          "stunnel + iptables + mkcert wired up by lightsctl. Real TLS on a Pi.",
      },
    ],
  },
  {
    status: "completed",
    quarter: "Q1 2026",
    heading: "Early polish",
    items: [
      {
        title: "v1.5 — natural-language control",
        description:
          "First pass at speaking the rig in plain English. Performance + reliability work underneath.",
        release: "v1.5.0",
      },
      {
        title: "Backup & restore",
        description:
          "One-command snapshot of QLC+ workspace + fixtures, with restore.",
      },
      {
        title: "Wireless DMX docs",
        description:
          "Chauvet D-Fi Hub 2 signal-path documented end-to-end. Pi → ENTTEC → wireless → fixtures.",
      },
    ],
  },
  {
    status: "completed",
    quarter: "Q2 2026",
    heading: "AI + cue programming — the big work",
    items: [
      {
        title: "v2.0 — UI overhaul & Pi compatibility",
        description:
          "Editorial dark interface, mobile breakpoints, Pi-friendly bundle sizes. Foundation for everything that follows.",
        release: "v2.0.0",
      },
      {
        title: "v2.1 — persistent WebSocket + .qxf parser",
        description:
          "Single long-lived QLC+ connection on a background asyncio loop. Reads .qxf fixture defs for authoritative channel roles — no more guessing RGB vs warm/cool/amber.",
        release: "v2.1.0",
      },
      {
        title: "v2.2 — MCP server",
        description:
          "Streamable HTTP MCP endpoint at :5001/mcp. Claude Desktop, ChatGPT, Cursor, or any MCP-capable agent can now drive the rig via structured tool calls.",
        release: "v2.2.0",
      },
      {
        title: "v2.3 — Tier 1 expansion",
        description:
          "Group + scene CRUD, blackout, identify_fixture, batch_action. Twelve new MCP tools — the agent can finally manage the workspace, not just play it.",
        release: "v2.3.0",
      },
      {
        title: "v2.4 — diagnostics surface",
        description:
          "test_dmx, get_logs (allowlisted journals), get_system_info (CPU temp, load, USB, service status). An agent can triage a misbehaving rig without SSHing in.",
        release: "v2.4.0",
      },
      {
        title: "v2.5 — Kelvin white balance",
        description:
          "color_temperature(kelvin, …) with per-fixture-type dispatch — WWA, RGB, RGBA, RGBW. Say '3200K tungsten' and have it Just Work.",
        release: "v2.5.0",
      },
      {
        title: "v2.6 — palette dispatch",
        description:
          "palette({ key: 3200, fill: 5600, back: 'magenta' }) — three-point lighting in a single call. Composes mixed Kelvin + color presets.",
        release: "v2.6.0",
      },
      {
        title: "v2.7 — first-class strobe",
        description:
          "strobe(rate, intensity?, groups?) — 0–20Hz abstraction over per-fixture strobe channels. No more set_channel with magic offsets.",
        release: "v2.7.0",
      },
      {
        title: "v2.8 — chases",
        description:
          "Time-based programming via QLC+'s native chase engine. Create, start, stop, chain ordered sequences of saved scenes.",
        release: "v2.8.0",
      },
      {
        title: "v2.9 — cue lists",
        description:
          "QLab / ETC Ion 'cue stack' model. Ordered cues at absolute timestamps — press GO at the moment the track starts.",
        release: "v2.9.0",
      },
    ],
  },
  {
    status: "completed",
    quarter: "Q3 2026",
    heading: "MCP + Web UI catch-up",
    items: [
      {
        title: "v2.10 — Web UI catches up",
        description:
          "Every Tier 1–3 capability now lives in the browser. Full feature parity with MCP — anything an agent can do, a human can do in the web UI.",
        release: "v2.10.0",
      },
      {
        title: "v2.11 — agentic chat",
        description:
          "Full Claude/ChatGPT conversation built into the web UI. 48 MCP tools exposed to the model. Speak the rig directly — no separate desktop client.",
        release: "v2.11.0",
      },
      {
        title: "v2.12 — mobile + PWA + CI",
        description:
          "Comprehensive mobile redesign. Installable as a native app via Add-to-Home-Screen. 180-test pytest suite plus GitHub Actions CI running three parallel jobs on every push.",
        release: "v2.12.0",
      },
    ],
  },
  {
    status: "in-progress",
    quarter: "Q4 2026",
    heading: "Visual identity + foundations",
    items: [
      {
        title: "v2.13.0 — visual identity pass",
        description:
          "Geist Sans/Mono, tungsten accent, animated tab indicator, mono eyebrow labels, filament dot. The interface finally feels like the product.",
        release: "v2.13.0",
      },
      {
        title: "v2.13.1 — boot-init regression fix",
        description:
          "Boot initialization had been silently broken since v2.10. Fixed, plus diagnostics now distinguishes 'not installed' from 'inactive' for the systemd services.",
        release: "v2.13.1",
      },
      {
        title: "v2.13.2 — tab URL persistence",
        description:
          "Active tab is now in the URL. Refresh, bookmark, or share a link to a specific view of the rig.",
        release: "v2.13.2",
      },
    ],
  },
  {
    status: "planned",
    quarter: "Q1 2027",
    heading: "Hardware integration + reliability",
    items: [
      {
        title: "MIDI controller input",
        description:
          "Map physical faders and pads (Akai MIDI Mix, Launchpad, etc.) to fixtures, groups, scenes, and chases. Top priority for the next thrust.",
        issue: 26,
      },
      {
        title: "OSC support",
        description:
          "Talk to TouchOSC and QLab over OSC. Tablet-as-control-surface, plus integration with audio cue stacks already in use.",
        issue: 27,
      },
      {
        title: "Authentication",
        description:
          "Shared password + session cookie. Stop relying on 'it's only on the studio LAN'.",
        issue: 25,
      },
      {
        title: "Integration test layer",
        description:
          "End-to-end coverage across Flask, MCP, and cue playback — not just unit tests against mocks.",
        issue: 24,
      },
    ],
  },
  {
    status: "planned",
    quarter: "Q2 2027",
    heading: "Polish + intelligence",
    items: [
      {
        title: "Audio reactivity + BPM detection",
        description:
          "Beat-pulse and BPM-synced chases driven by audio input — for music videos and live performance.",
        issue: 28,
      },
      {
        title: "Visual cue list timeline editor",
        description:
          "Drag-and-drop timeline for arranging cues against an audio track. The missing tool for show building.",
        issue: 29,
      },
      {
        title: "Structured logging + deep health endpoint",
        description:
          "JSON logs, /healthz with USB/DMX/QLC+/MCP rollup. Observability that survives a long shoot day.",
        issue: 30,
      },
      {
        title: "Automated workspace backups",
        description:
          "Scheduled snapshots of fixtures, scenes, chases, cue lists. Rotated, restorable from the web UI.",
        issue: 31,
      },
      {
        title: "Chat memory + history persistence",
        description:
          "Agentic chat that remembers prior conversations and the state it left the rig in.",
        issue: 32,
      },
    ],
  },
  {
    status: "future",
    quarter: "Beyond",
    heading: "Power-user features",
    items: [
      {
        title: "Provider failover (Anthropic ↔ OpenAI)",
        description:
          "Automatic failover between LLM providers. Production redundancy for the AI layer.",
        issue: 33,
      },
      {
        title: "Mock DMX device",
        description:
          "Develop against a virtual rig — no Pi, no ENTTEC, no fixtures required.",
        issue: 34,
      },
      {
        title: "Tap tempo for chases",
        description:
          "Tap a key in time with the music. Chase steps lock to the implied BPM.",
        issue: 35,
      },
      {
        title: "Visual stage layout editor",
        description:
          "Drag fixtures onto a stage map. Spatial reasoning for the agent + a faster mental model for humans.",
        issue: 36,
      },
      {
        title: "Server-rendered scene preview swatches",
        description:
          "Thumbnails for every saved scene, generated server-side from the channel values.",
        issue: 37,
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Counts
   ────────────────────────────────────────────────────────────────────────── */

const counts = roadmap.reduce(
  (acc, q) => {
    if (q.status === "completed") acc.shipped += q.items.length;
    else acc.planned += q.items.length;
    return acc;
  },
  { shipped: 0, planned: 0 },
);

/** Last three shipped releases — used for the highlight strip. */
const recentlyShipped = roadmap
  .filter((q) => q.status === "completed" || q.status === "in-progress")
  .flatMap((q) => q.items)
  .filter((item) => item.release)
  .slice(-3)
  .reverse();

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-ink pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* ─────────────────────────────────────────── HEADER ─── */}
        <header className="hairline pb-8 mb-16 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="eyebrow">Roadmap · current</p>
            <h1
              className="font-display text-paper mt-3"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              What&apos;s shipped. What&apos;s next.
              <span className="block italic text-paper/40">
                The current cadence, in plain print.
              </span>
            </h1>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-paper/40 whitespace-nowrap text-right">
            <p>
              <span className="text-amber-tungsten">{counts.shipped} shipped</span>
              <span className="text-paper/30"> · </span>
              <span className="text-arc-cyan">{counts.planned} planned</span>
            </p>
            <p className="mt-1">Latest · v2.13.2 · May 2026</p>
          </div>
        </header>

        {/* ─────────────────────────────── RECENTLY SHIPPED ─── */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-6">
            <p className="eyebrow">Recently shipped</p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              Last 3 releases
            </p>
          </div>
          <div className="grid gap-px bg-rule sm:grid-cols-3">
            {recentlyShipped.map((item) => (
              <a
                key={item.release}
                href={`https://github.com/${REPO}/releases/tag/${item.release}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-ink p-6 hover:bg-steel/50 transition-colors"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-amber-tungsten/70 group-hover:text-amber-tungsten transition-colors">
                  {item.release}
                </p>
                <p className="font-display text-paper text-lg leading-tight mt-3 group-hover:text-amber-tungsten transition-colors">
                  {item.title.replace(/^v\d+\.\d+(\.\d+)?\s*—\s*/, "")}
                </p>
                <p className="font-sans text-sm text-paper/50 mt-3 leading-snug line-clamp-3">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────── LEGEND ─── */}
        <section className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-rule">
          <LegendCell status="completed" label="Shipped" />
          <LegendCell status="in-progress" label="In progress" />
          <LegendCell status="planned" label="Planned" />
          <LegendCell status="future" label="Future" />
        </section>

        {/* ─────────────────────────────────────────── TIMELINE ─── */}
        <section className="space-y-20">
          {roadmap.map((quarter) => (
            <QuarterBlock key={quarter.quarter} quarter={quarter} />
          ))}
        </section>

        {/* ─────────────────────────────────────────── CTA ─── */}
        <section className="hairline mt-24 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Have a feature in mind?</p>
            <h2
              className="font-display text-paper mt-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              File it. Or vote on what&apos;s queued.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-8 gap-y-3">
            <Link
              href={`https://github.com/${REPO}/discussions`}
              className="group inline-flex items-center gap-3 text-paper font-mono uppercase tracking-widest text-sm border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
            >
              Discussions
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`https://github.com/${REPO}/issues`}
              className="group inline-flex items-center gap-3 text-paper/60 font-mono uppercase tracking-widest text-sm hover:text-paper transition-colors"
            >
              Open issues
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────── FOOTNOTE ─── */}
        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-paper/30 text-center">
          Subject to change · priorities shift with community input · last updated May 2026
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── presentational ── */

function QuarterBlock({ quarter }: { quarter: RoadmapQuarter }) {
  return (
    <article>
      <header className="hairline pb-4 mb-8 grid grid-cols-[1fr_auto] gap-6 items-baseline">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <StatusDot status={quarter.status} />
            <span>{quarter.quarter}</span>
            <span className="text-paper/30">·</span>
            <StatusLabel status={quarter.status} />
          </p>
          <h2
            className="font-display text-paper mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            {quarter.heading}
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-paper/40 whitespace-nowrap">
          {quarter.items.length} item{quarter.items.length === 1 ? "" : "s"}
        </p>
      </header>

      <ul className="hairline">
        {quarter.items.map((item, i) => (
          <ItemRow key={i} item={item} status={quarter.status} />
        ))}
      </ul>
    </article>
  );
}

function ItemRow({ item, status }: { item: RoadmapItem; status: Status }) {
  const href = item.release
    ? `https://github.com/${REPO}/releases/tag/${item.release}`
    : item.issue
      ? `https://github.com/${REPO}/issues/${item.issue}`
      : undefined;

  const tag = item.release
    ? item.release
    : item.issue
      ? `#${item.issue}`
      : statusGlyph(status);

  const tagAccent =
    status === "completed" || status === "in-progress"
      ? "text-amber-tungsten/70 group-hover:text-amber-tungsten"
      : "text-arc-cyan/70 group-hover:text-arc-cyan";

  const content = (
    <div className="grid grid-cols-[6rem_1fr_1.5rem] gap-6 py-5 border-b border-rule items-baseline">
      <span
        className={`font-mono text-xs uppercase tracking-widest tabular-nums ${tagAccent} transition-colors`}
      >
        {tag}
      </span>
      <div>
        <h3 className="font-display text-paper text-lg leading-tight group-hover:text-amber-tungsten transition-colors">
          {item.title}
        </h3>
        <p className="font-sans text-sm text-paper/60 mt-2 leading-snug max-w-2xl">
          {item.description}
        </p>
      </div>
      <span
        aria-hidden
        className="font-mono text-xs text-paper/30 group-hover:text-amber-tungsten transition-colors justify-self-end"
      >
        {href ? "↗" : ""}
      </span>
    </div>
  );

  if (!href) {
    return <li className="group">{content}</li>;
  }

  return (
    <li className="group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-steel/30 transition-colors"
      >
        {content}
      </a>
    </li>
  );
}

function LegendCell({ status, label }: { status: Status; label: string }) {
  return (
    <div className="bg-ink p-5 flex items-center gap-3">
      <StatusDot status={status} />
      <span className="font-mono text-xs uppercase tracking-widest text-paper/60">
        {label}
      </span>
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  // Filament dot for shipped; arc dot for in-progress; hollow rings for future.
  if (status === "completed") {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full bg-amber-tungsten filament"
        aria-hidden
      />
    );
  }
  if (status === "in-progress") {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full bg-arc-cyan arc"
        aria-hidden
      />
    );
  }
  if (status === "planned") {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full border border-arc-cyan/60"
        aria-hidden
      />
    );
  }
  return (
    <span
      className="inline-block w-2 h-2 rounded-full border border-paper/30"
      aria-hidden
    />
  );
}

function StatusLabel({ status }: { status: Status }) {
  const label = {
    completed: "Shipped",
    "in-progress": "In progress",
    planned: "Planned",
    future: "Future",
  }[status];
  return <span className="text-paper/60">{label}</span>;
}

function statusGlyph(status: Status): string {
  if (status === "completed") return "—";
  if (status === "in-progress") return "···";
  if (status === "planned") return "—";
  return "—";
}
