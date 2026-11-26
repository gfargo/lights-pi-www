import Link from "next/link";
import { PageHead, SectionHead } from "@/components/PageHead";

export const metadata = {
  title: "Roadmap — Lights Pi | Shipping cadence + what's next",
  description:
    "What Lights Pi has shipped through v2.19 — MCP server, agentic chat, a Stage plan, a cue timeline, audio-reactive lighting, MIDI and OSC, workspaces, HTTPS over Tailscale — and what's next.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
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
    status: "completed",
    quarter: "May 2026",
    heading: "Visual identity + foundations",
    items: [
      {
        title: "v2.13.0 — visual identity pass",
        description:
          "Geist Sans/Mono, tungsten accent, animated tab indicator. The interface finally feels like the product.",
        release: "v2.13.0",
      },
      {
        title: "v2.13.2 — tab URL persistence",
        description:
          "Active tab is now in the URL. Refresh, bookmark, or share a link to a specific view of the rig.",
        release: "v2.13.2",
      },
      {
        title: "v2.14.0 — cleanup pass",
        description:
          "Dead code removed, a Python linter gating CI, dependencies refreshed. Clears the way for the feature backlog.",
        release: "v2.14.0",
      },
      {
        title: "Server-rendered scene swatches",
        description:
          "Every scene shows a strip of its fixtures' colours, rendered from the channel values.",
        issue: 37,
      },
    ],
  },
  {
    status: "completed",
    quarter: "Jul 2026",
    heading: "Live state, memory + new inputs",
    items: [
      {
        title: "v2.14.1 — live event stream + chat memory",
        description:
          "Every open phone and laptop sees rig changes as they happen. Chat conversations persist and can be searched.",
        release: "v2.14.1",
      },
      {
        title: "v2.14.2 — shared-password login",
        description:
          "A shared password and session cookie, so the rig no longer relies on 'it's only on the studio LAN'. Tap-tempo and backup fixes.",
        release: "v2.14.2",
      },
      {
        title: "v2.15.0 — MIDI + OSC backends",
        description:
          "MIDI notes and CCs, and OSC messages on UDP 8000, trigger scenes, chases, cues and blackout. Cue-list preview and stage-layout storage on the server.",
        release: "v2.15.0",
      },
      {
        title: "Tap tempo for chases",
        description: "Tap the beat in and chase steps lock to it.",
        issue: 35,
      },
      {
        title: "Audio reactivity + BPM detection",
        description: "Beat and BPM detection from a USB microphone for music-driven looks.",
        issue: 28,
      },
      {
        title: "Structured logging + health endpoint",
        description: "JSON logs and a /healthz rollup of QLC+, the workspace and the control server.",
        issue: 30,
      },
      {
        title: "AI provider failover",
        description: "Chat falls back between Anthropic and OpenAI when one is unavailable.",
        issue: 33,
      },
    ],
  },
  {
    status: "completed",
    quarter: "Nov 2026",
    heading: "Workspaces, remote access + reliability",
    items: [
      {
        title: "v2.16.0 — multi-workspace switching",
        description:
          "Separate workspaces per production or venue. Trusted HTTPS over Tailscale. gunicorn + eventlet server. lights.local fixes for routers with IGMP snooping.",
        release: "v2.16.0",
      },
      {
        title: "v2.16.2 — the QLC+ link can't freeze",
        description:
          "Fixes a cross-thread lock bug that could stall every scene change, adds a watchdog that rebuilds a stuck link in seconds, and reports link health on /healthz.",
        release: "v2.16.2",
      },
      {
        title: "v2.17.0 — branded, thumb-first control UI",
        description:
          "Your own logo and accent colour per install. On a phone, scenes and Blackout sit under your thumb with a bottom tab bar.",
        release: "v2.17.0",
      },
      {
        title: "v2.18.0 — the Stage plan",
        description:
          "A plan of the room with every fixture in its live colour. Drag fixtures into place, select a few and make them a group.",
        release: "v2.18.0",
      },
      {
        title: "v2.18.1 — Stage commands, OSC panel, sound-reactive light",
        description:
          "Pick fixtures on the plan and aim commands at just those. An OSC panel with feedback to TouchOSC. Lights flash on kicks and snares, and colour follows loudness.",
        release: "v2.18.1",
      },
      {
        title: "v2.19.0 — cue timeline + bands to fixtures",
        description:
          "Drag cues along a timeline over the show's waveform and scrub to preview any moment. Bass, mids and highs each drive their own fixtures.",
        release: "v2.19.0",
      },
      {
        title: "Automated workspace backups",
        description:
          "Nightly snapshots of fixtures, scenes, chases and cue lists, pruned to a daily, weekly and monthly set.",
        issue: 31,
      },
      {
        title: "Mock DMX device",
        description:
          "Develop against a virtual rig with MOCK_DMX=1 — no Pi, no ENTTEC, no fixtures required.",
        issue: 34,
      },
    ],
  },
  {
    status: "in-progress",
    quarter: "Now",
    heading: "From backend to hands-on",
    items: [
      {
        title: "MIDI mapping in the web UI",
        description:
          "The listener and mappings exist; next is a MIDI tab with learn-to-bind, verified against real controllers.",
        issue: 26,
      },
      {
        title: "OSC control surfaces",
        description:
          "The OSC panel and feedback are in; a TouchOSC layout built from your workspace is waiting on a tablet check, then QLab cue stacks.",
        issue: 27,
      },
      {
        title: "Sound-reactive light, tried with a real mic",
        description:
          "Every mode is built: flash on hits, colour follows loudness, bands to fixtures. Next is tuning against a real microphone in the room.",
        issue: 12,
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

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const;

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={2}
        label="Roadmap"
        title="What's shipped, and what's next."
        lead="The current cadence in plain print: every release so far, what's being built now and what's queued after it."
        aside={
          <>
            <p>
              <span className="text-amber-tungsten font-medium">{counts.shipped} shipped</span>, {counts.planned} in
              progress or planned
            </p>
            <p className="mt-1">Latest release v2.19.0, November 2026</p>
          </>
        }
      />

      {/* Recently shipped */}
      <section className="mb-[clamp(72px,8vw,120px)]">
        <SectionHead title="Recently shipped" note="The last three releases" />
        <div className="grid gap-px bg-rule border-y border-rule md:grid-cols-3">
          {recentlyShipped.map((item) => (
            <a
              key={item.release}
              href={`https://github.com/${REPO}/releases/tag/${item.release}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ink py-8 md:p-8 hover:bg-steel transition-colors"
            >
              <p className="text-amber-tungsten font-medium tabular-nums" style={body}>
                {item.release}
              </p>
              <p
                className="font-display text-paper mt-3 group-hover:text-amber-tungsten transition-colors"
                style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
              >
                {((t) => t.charAt(0).toUpperCase() + t.slice(1))(item.title.replace(/^v\d+\.\d+(\.\d+)?\s*—\s*/, ""))}
              </p>
              <p className="text-paper mt-3" style={body}>
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-[clamp(56px,6vw,96px)]">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-paper" style={body} aria-label="Legend">
          {(["completed", "in-progress", "planned"] as Status[]).map((s) => (
            <li key={s} className="inline-flex items-center gap-3">
              <StatusCell status={s} />
              {STATUS_LABEL[s]}
            </li>
          ))}
        </ul>
        {roadmap.map((quarter) => (
          <QuarterBlock key={quarter.quarter} quarter={quarter} />
        ))}
      </section>

      {/* Next step */}
      <section className="border-t border-rule mt-[clamp(72px,8vw,120px)] pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <p className="text-paper font-medium" style={body}>
            Have a feature in mind?
          </p>
          <h2 className="font-display text-paper mt-3 max-w-[18ch]" style={{ fontSize: "var(--step-head)" }}>
            File it, or vote on what&apos;s queued.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4">
          <Link href={`https://github.com/${REPO}/discussions`} className="link-plain">
            Discussions →
          </Link>
          <Link href={`https://github.com/${REPO}/issues`} className="link-plain">
            Open issues
          </Link>
        </div>
      </section>

      <p className="mt-12 text-paper/80" style={body}>
        Subject to change: priorities shift with community input. Last updated November 2026.
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────── presentational ── */

const STATUS_LABEL: Record<Status, string> = {
  completed: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
  future: "Future",
};

function QuarterBlock({ quarter }: { quarter: RoadmapQuarter }) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-3 text-paper font-medium" style={body}>
        <StatusCell status={quarter.status} />
        <span>
          {quarter.quarter}, {STATUS_LABEL[quarter.status].toLowerCase()}
        </span>
      </div>
      <div className="mt-3 mb-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 className="font-display text-paper" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)" }}>
          {quarter.heading}
        </h2>
        <p className="text-paper/80" style={body}>
          {quarter.items.length} item{quarter.items.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="border-t border-rule">
        {quarter.items.map((item, i) => (
          <ItemRow key={i} item={item} />
        ))}
      </ul>
    </article>
  );
}

function ItemRow({ item }: { item: RoadmapItem }) {
  const href = item.release
    ? `https://github.com/${REPO}/releases/tag/${item.release}`
    : item.issue
      ? `https://github.com/${REPO}/issues/${item.issue}`
      : undefined;

  const tag = item.release ?? (item.issue ? `#${item.issue}` : "");

  const content = (
    <div className="grid grid-cols-[1fr_auto] md:grid-cols-[7rem_1fr_1.5rem] gap-x-6 gap-y-1 py-5 border-b border-rule items-baseline">
      <span className="text-paper/80 tabular-nums md:order-none order-2" style={body}>
        {tag}
      </span>
      <div className="order-1 md:order-none">
        <h3 className="text-paper font-medium group-hover:text-amber-tungsten transition-colors" style={body}>
          {item.title}
        </h3>
        <p className="text-paper mt-1 max-w-[42rem]" style={body}>
          {item.description}
        </p>
      </div>
      <span aria-hidden className="hidden md:block text-paper/80 group-hover:text-amber-tungsten transition-colors justify-self-end">
        {href ? "↗" : ""}
      </span>
    </div>
  );

  if (!href) {
    return <li className="group">{content}</li>;
  }

  return (
    <li className="group">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:bg-steel transition-colors">
        {content}
      </a>
    </li>
  );
}

/** One square swatch cell per status: lit amber for shipped, cyan in progress, an outline for later. */
function StatusCell({ status }: { status: Status }) {
  const cls =
    status === "completed"
      ? "bg-amber-tungsten"
      : status === "in-progress"
        ? "bg-arc-cyan"
        : "border border-paper/60";
  return <span aria-hidden className={`inline-block h-3 w-3 shrink-0 ${cls}`} />;
}
