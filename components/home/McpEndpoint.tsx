import { ArrowUpRight } from "lucide-react";

/**
 * MCP-as-headline section. The Model Context Protocol endpoint is the
 * genuinely new, distinctive capability of Lights Pi — so it gets
 * tentpole treatment instead of one card buried in a grid of seven.
 *
 * Composition:
 *  - Left column: oversized mono "5001/mcp" port number, scale-of-architecture
 *    typography. Three "live channels" annotations underneath.
 *  - Right column: editorial paragraph in Fraunces text-variant introducing
 *    the protocol, followed by a tool-name marquee of every exposed MCP tool.
 */

const MCP_TOOLS = [
  // discovery
  "get_status",
  "list_fixtures",
  "get_fixture_channels",
  "list_groups",
  "list_scenes",
  "list_templates",
  "get_channel_values",
  // actions
  "activate_scene",
  "apply_template",
  "adjust_brightness",
  "adjust_color",
  "color_temperature",
  "palette",
  "strobe",
  "fade",
  "generate_scene",
  "set_channel",
  "save_scene",
  "snapshot_scene",
  "blackout",
  "batch_action",
  "identify_fixture",
  // group management
  "create_group",
  "delete_group",
  "update_group",
  "add_fixtures_to_group",
  "remove_fixtures_from_group",
  // scene management
  "describe_scene",
  "delete_scene",
  "rename_scene",
  "duplicate_scene",
  // chase management
  "list_chases",
  "describe_chase",
  "create_chase",
  "delete_chase",
  "start_chase",
  "stop_chase",
  // cue lists (audio-synced shows)
  "list_cue_lists",
  "describe_cue_list",
  "get_active_cue_lists",
  "create_cue_list",
  "update_cue_list",
  "delete_cue_list",
  "go_cue_list",
  "stop_cue_list",
  // diagnostics
  "test_dmx",
  "get_logs",
  "get_system_info",
];

export function McpEndpoint() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Section opening rule */}
      <div className="hairline" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-16 items-start">
          {/* ─────────────────────────────────────────── LEFT: the port ─── */}
          <div>
            <p className="eyebrow reveal">Endpoint</p>

            <div
              className="font-mono mt-6 text-paper leading-none reveal"
              style={{
                fontSize: "clamp(4rem, 14vw, 11rem)",
                letterSpacing: "-0.04em",
              }}
            >
              <span className="text-paper">5001</span>
              <span className="text-amber-tungsten">/mcp</span>
            </div>

            {/* Live channel annotations — mono, hairline-prefixed */}
            <dl className="mt-12 grid grid-cols-1 gap-y-3 font-mono text-sm reveal">
              <ChannelLine
                label="Transport"
                value="Streamable HTTP"
                annotation="LATEST"
              />
              <ChannelLine
                label="Auth"
                value="bearer token · optional"
                annotation="OFF BY DEFAULT"
              />
              <ChannelLine
                label="Resource"
                value="lights://workspace"
                annotation="ONE-SHOT CONTEXT"
              />
            </dl>
          </div>

          {/* ─────────────────────────────────────── RIGHT: the prose ─── */}
          <div className="lg:pt-12">
            <h2
              className="font-display text-paper"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Hand your rig
              <span className="block italic text-paper/40">to an agent.</span>
            </h2>

            <p className="mt-8 text-lg text-paper/70 leading-relaxed max-w-prose">
              Lights Pi exposes the entire control surface as a{" "}
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper border-b border-paper/30 hover:border-amber-tungsten hover:text-amber-tungsten transition-colors"
              >
                Model Context Protocol
              </a>{" "}
              endpoint over Streamable HTTP. Wire Claude Desktop, ChatGPT,
              Cursor, or a custom agent into the rig with a single line of
              configuration. The LLM gets structured tool calls — your rig
              stays the single writer.
            </p>

            {/* Wiring snippet — copy-paste-ready MCP config */}
            <div className="mt-10 border border-rule bg-steel/50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-rule">
                <span className="eyebrow">claude_desktop_config.json</span>
                <span className="font-mono text-xs text-paper/40">paste</span>
              </div>
              <pre className="font-mono text-xs md:text-sm text-paper/80 leading-relaxed p-4 overflow-x-auto">
{`{
  "mcpServers": {
    "qlc-lights": { "url": "http://lights.local:5001/mcp" }
  }
}`}
              </pre>
            </div>

            <a
              href="https://github.com/gfargo/lights-pi/blob/main/docs/MCP_SERVER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-tungsten border-b border-amber-tungsten pb-0.5 hover:text-paper hover:border-paper transition-colors"
            >
              Read MCP_SERVER.md
              <ArrowUpRight className="w-3 h-3" aria-hidden />
            </a>
          </div>
        </div>

        {/* Tool catalog marquee — every MCP tool, dense mono, monospaced grid */}
        <div className="mt-24 pt-12 hairline">
          <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-baseline">
            <p className="eyebrow whitespace-nowrap">Tools · {MCP_TOOLS.length}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {MCP_TOOLS.map((tool) => (
                <code
                  key={tool}
                  className="font-mono text-sm text-paper/60 hover:text-amber-tungsten transition-colors cursor-default"
                >
                  {tool}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hairline" />
    </section>
  );
}

function ChannelLine({
  label,
  value,
  annotation,
}: {
  label: string;
  value: string;
  annotation?: string;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr_auto] gap-4 items-baseline border-t border-rule pt-3">
      <dt className="eyebrow text-paper/40">{label}</dt>
      <dd className="text-paper/90">{value}</dd>
      {annotation && (
        <span className="font-mono text-xs uppercase tracking-widest text-amber-tungsten">
          {annotation}
        </span>
      )}
    </div>
  );
}
