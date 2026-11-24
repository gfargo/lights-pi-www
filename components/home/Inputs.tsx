import { SCENES } from "@/lib/scenes";

/**
 * Act II. Everything in the room can drive the rig. One input per poster
 * line at the hero's display size; the one fact about it at the right
 * margin. Each line's bullet is that input's own swatch cell.
 */
const INPUTS = [
  { name: "Phone", detail: "Any browser on the network, installable as an app", cell: SCENES[0].cells[0] },
  { name: "Agent", detail: "Claude, ChatGPT, Cursor or your own agent, over MCP with 48 tools", cell: SCENES[3].cells[0] },
  { name: "MIDI", detail: "Map controller notes and CCs to scenes and chases", cell: SCENES[2].cells[0] },
  { name: "OSC", detail: "/scene, /chase, /cue/go and /blackout on UDP 8000", cell: SCENES[4].cells[0] },
  { name: "Anywhere", detail: "Trusted HTTPS over Tailscale, behind a password", cell: SCENES[1].cells[0] },
];

export function Inputs() {
  return (
    <section className="bg-ink px-[var(--gutter)] py-[clamp(96px,14vw,200px)]" aria-labelledby="inputs-title">
      <h2
        id="inputs-title"
        className="font-display text-paper rise"
        style={{ fontSize: "var(--step-head)" }}
      >
        Play it from anything.
      </h2>
      <p className="mt-6 max-w-[40rem] text-paper rise" style={{ fontSize: "var(--step-body)", lineHeight: 1.55, ["--d" as string]: "80ms" }}>
        Every input reaches the same lighting functions, so a fader move, a chat message and a tap on your
        phone all land on the rig the same way. Every open device sees the change live.
      </p>

      <ul className="mt-[clamp(48px,7vw,96px)]">
        {INPUTS.map((input, i) => (
          <li
            key={input.name}
            className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-baseline gap-x-10 rise"
            style={{ ["--d" as string]: `${i * 70}ms` }}
          >
            <span
              className="font-display text-paper transition-colors group-hover:text-amber-tungsten flex items-center gap-[0.25em]"
              style={{ fontSize: "clamp(3.25rem, 9vw, 8.5rem)", lineHeight: 0.98, letterSpacing: "-0.04em" }}
            >
              <span
                aria-hidden="true"
                className="inline-block shrink-0 w-[0.42em] h-[0.62em] translate-y-[0.04em]"
                style={{ backgroundColor: input.cell }}
              />
              {input.name}
            </span>
            <span
              className="text-paper md:text-right mt-2 pb-16 md:mt-0 md:pb-0 md:max-w-[22rem]"
              style={{ fontSize: "var(--step-body)", fontVariantNumeric: "tabular-nums" }}
            >
              {input.detail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
