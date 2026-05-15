/**
 * AiConversation — replaces the previous fake-testimonial grid.
 *
 * A staged but real-looking transcript of an LLM agent driving the rig via
 * MCP. Each exchange shows the user's natural-language prompt, the tool
 * call the agent makes, and the rig's response. This is *demonstration*
 * rather than *endorsement* — credible because it shows the actual API
 * surface, not invented people.
 *
 * Composition:
 *  - Sectional eyebrow + display heading on the left
 *  - Terminal-card on the right with three exchanges, color-coded
 */

interface Turn {
  speaker: "user" | "agent";
  content: string;
  call?: string;
  result?: string;
  latency?: string;
}

const transcript: Turn[] = [
  {
    speaker: "user",
    content: "Dim the key lights to 30% and make them warm.",
  },
  {
    speaker: "agent",
    content: "Adjusting two fixtures in the key-lights group.",
    call: `adjust_color("warm", "30%", groups: ["key-lights"])`,
    result: "Applied to 2 fixtures",
    latency: "47ms",
  },
  {
    speaker: "user",
    content: "Save this as 'evening edit'.",
  },
  {
    speaker: "agent",
    content: "Snapshotting current channel state.",
    call: `snapshot_scene("evening edit")`,
    result: "Scene 12 saved · workspace updated",
    latency: "18ms",
  },
  {
    speaker: "user",
    content: "Now slow fade to black over eight seconds.",
  },
  {
    speaker: "agent",
    content: "Fading all brightness channels.",
    call: `fade(target: "0", duration: "8")`,
    result: "12 channels easing",
    latency: "ack 9ms · runtime 8.0s",
  },
];

export function AiConversation() {
  return (
    <section className="relative bg-ink py-32 overflow-hidden">
      <div className="hairline" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-x-16 gap-y-12 items-start">
          {/* Left: editorial framing */}
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Live transcript</p>
            <h2
              className="font-display text-paper mt-4"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Real conversation.
              <span className="block italic text-paper/40">
                Real DMX.
              </span>
            </h2>
            <p className="mt-8 text-lg text-paper/70 leading-relaxed max-w-md">
              No quotes. No avatars. Just the actual exchange between an LLM
              agent and a Lights Pi rig — natural language in, structured
              MCP tool calls out, DMX over the wire in milliseconds.
            </p>
            <p className="mt-6 text-sm text-paper/40 leading-relaxed max-w-md">
              The agent here is Claude Desktop, but any{" "}
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/70 hover:text-amber-tungsten transition-colors border-b border-paper/20 hover:border-amber-tungsten"
              >
                MCP-capable client
              </a>{" "}
              works the same way.
            </p>
          </div>

          {/* Right: the transcript card */}
          <div className="border border-rule bg-steel/30 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <span className="filament w-2 h-2 rounded-full bg-amber-tungsten" />
                <span className="font-mono text-xs uppercase tracking-widest text-paper/60">
                  lights.local:5001/mcp
                </span>
              </div>
              <span className="font-mono text-xs text-paper/30">
                session · 0x4f2a
              </span>
            </div>

            {/* Transcript body */}
            <div className="px-5 sm:px-8 py-6 sm:py-8 font-mono text-sm space-y-7">
              {transcript.map((turn, i) => (
                <TurnBlock key={i} turn={turn} />
              ))}

              {/* Caret — the only animated thing in this block */}
              <div className="flex items-center gap-2 text-paper/40">
                <span className="text-paper/30">user</span>
                <span className="inline-block w-2 h-4 bg-paper/40 align-middle blink" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caret blink — local styles */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .blink { animation: blink 1.1s steps(2) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .blink { animation: none; }
        }
      `}</style>
    </section>
  );
}

function TurnBlock({ turn }: { turn: Turn }) {
  if (turn.speaker === "user") {
    return (
      <div>
        <div className="text-paper/30 mb-1.5">user</div>
        <p className="text-paper/95 leading-relaxed pl-4 border-l border-rule">
          {turn.content}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-amber-tungsten/80 mb-1.5">claude</div>
      <p className="text-paper/70 leading-relaxed pl-4 border-l border-amber-tungsten/30">
        {turn.content}
      </p>
      {turn.call && (
        <pre className="mt-2 pl-4 border-l border-amber-tungsten/30 text-paper whitespace-pre-wrap break-words">
          <span className="text-amber-tungsten/60">→ </span>
          {turn.call}
        </pre>
      )}
      {turn.result && (
        <div className="mt-2 pl-4 border-l border-amber-tungsten/30 flex flex-wrap items-center gap-x-3 gap-y-1 text-arc-cyan">
          <span className="text-arc-cyan/60">✓</span>
          <span>{turn.result}</span>
          {turn.latency && (
            <span className="text-paper/40 text-xs tabular-nums">· {turn.latency}</span>
          )}
        </div>
      )}
    </div>
  );
}
