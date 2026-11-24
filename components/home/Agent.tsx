import Image from "next/image";
import { SCENES } from "@/lib/scenes";
import { Swatch } from "./Swatch";

/**
 * Act III. The agent. Left: what it is and the whole setup (one JSON entry).
 * Right: the real Chat tab, standing on the motif.
 */
export function Agent() {
  return (
    <section className="bg-steel px-[var(--gutter)] py-[clamp(96px,12vw,180px)]" aria-labelledby="agent-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14 items-start">
        <div className="lg:col-span-5">
          <h2 id="agent-title" className="font-display text-paper rise" style={{ fontSize: "var(--step-head)" }}>
            Hand the rig to an agent.
          </h2>
          <p className="mt-6 text-paper rise" style={{ fontSize: "var(--step-body)", lineHeight: 1.55, ["--d" as string]: "80ms" }}>
            The Pi serves a Model Context Protocol endpoint on port 5001. Point Claude Desktop, ChatGPT, Cursor or your
            own agent at it and the whole rig becomes 48 tools: scenes, groups, colour temperature, chases, cue lists,
            diagnostics. The built-in Chat tab runs the same agent from any browser.
          </p>

          <pre
            className="mt-8 bg-ink text-paper p-5 overflow-x-auto rise"
            style={{ fontSize: "var(--step-small)", lineHeight: 1.6, ["--d" as string]: "140ms" }}
          >
            <code>{`{
  "mcpServers": {
    "qlc-lights": { "url": "http://lights.local:5001/mcp" }
  }
}`}</code>
          </pre>

          <figure className="mt-10 rise" style={{ ["--d" as string]: "200ms" }}>
            <blockquote className="text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.35 }}>
              “Tungsten key, daylight fill, magenta back.”
            </blockquote>
            <figcaption className="mt-3 text-paper/80" style={{ fontSize: "var(--step-body)", lineHeight: 1.5 }}>
              One sentence becomes one <code>palette</code> call across three fixture groups.
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="shutter bg-ink aspect-[1928/1095]">
            <Image
              src="/images/ui/chat-desktop-crop.png"
              alt="The Lights Pi Chat tab: a conversation list, suggested prompts such as Three-point lighting and Sunset cue list, and the message box."
              width={1928}
              height={1095}
              sizes="(min-width: 1024px) 56vw, 100vw"
              loading="eager"
              className="w-full h-auto"
            />
          </div>
          <Swatch cells={SCENES[3].cells} className="h-[10px] mt-[4px]" />
        </div>
      </div>
    </section>
  );
}
