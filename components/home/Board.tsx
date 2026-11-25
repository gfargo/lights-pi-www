import Image from "next/image";

/**
 * Act IV. Close-ups of the real interface, cropped hard, on a board of
 * flat tiles. Every picture is a screenshot of the Lights Pi control UI.
 */
type Tile = {
  area: string;
  size: "t-wide" | "t-big" | "t-sm";
  name: string;
  line: string;
  bg: string;
  ink: string;
  shot?: { src: string; w: number; h: number; alt: string; style: React.CSSProperties };
};

const TILES: Tile[] = [
  {
    area: "a-c", size: "t-wide", name: "Chases with tap tempo",
    line: "Loop scenes on a timer, or tap the beat in.",
    bg: "#1e50ff", ink: "#ffffff",
    shot: { src: "/images/ui/chases-desktop-crop.png", w: 2496, h: 680, alt: "Chases tab with Sunset drift and Club pulse, a Tap tempo button and Start and Stop controls.", style: { width: "118%", left: "6%", top: "-12%" } },
  },
  {
    area: "a-q", size: "t-big", name: "Cue lists",
    line: "Cues at absolute timestamps. Press Go when the audio rolls.",
    bg: "#f1f1ee", ink: "#0a0a0a",
    shot: { src: "/images/ui/cuelists-desktop-crop.png", w: 2496, h: 680, alt: "Cue lists tab with Intro, six cues over thirty seconds, and Interview open, each with a Go button.", style: { width: "150%", left: "8%", top: "10%" } },
  },
  {
    area: "a-v", size: "t-big", name: "Console",
    line: "Every channel of every fixture, labelled from its profile.",
    bg: "#c85000", ink: "#0a0a0a",
    shot: { src: "/images/ui/console-desktop-crop.png", w: 2496, h: 2080, alt: "Console tab with Golden Hour applied: SlimPAR fixtures in three columns, each fader labelled with its channel and DMX level.", style: { width: "210%", left: "14%", top: "6%" } },
  },
  {
    area: "a-p", size: "t-big", name: "On your phone",
    line: "Install it to the home screen. Blackout is one thumb away.",
    bg: "#ff00b4", ink: "#0a0a0a",
    shot: { src: "/images/ui/ai-phone.png", w: 1170, h: 2532, alt: "The Lights Pi app on a phone: scenes as colour tiles, a full-width Blackout bar and the bottom tab bar.", style: { width: "92%", left: "18%", top: 0, translate: "0 -62%" } },
  },
  {
    area: "a-t", size: "t-sm", name: "Colour temperature",
    line: "1800K candle to 10000K sky, per group.",
    bg: "#161616", ink: "#f1f1ee",
    shot: { src: "/images/ui/tools-desktop-crop.png", w: 2496, h: 1395, alt: "Tools tab: a white balance slider at 3200K and a strobe rate slider.", style: { width: "300%", left: "-6%", top: 0, translate: "0 -19%" } },
  },
  {
    area: "a-d", size: "t-sm", name: "Health at a glance",
    line: "Temperature, DMX USB and all four services.",
    bg: "#00c8b4", ink: "#0a0a0a",
    shot: { src: "/images/ui/diag-desktop-crop.png", w: 2496, h: 2080, alt: "Pi health panel on a live rig: CPU 66.6°C, load 1.04, DMX USB connected, 4 of 4 services active.", style: { width: "250%", left: "-6%", top: 0, translate: "0 -18%" } },
  },
];

export function Board() {
  return (
    <section className="bg-ink px-[var(--gutter)] py-[clamp(80px,10vw,160px)]" aria-labelledby="board-title">
      <div className="board">
        <div className="a-h t-wide bg-amber-tungsten text-ink p-[clamp(20px,2.4vw,36px)] flex flex-col justify-between">
          <h2 id="board-title" className="font-display rise" style={{ fontSize: "var(--step-head)" }}>
            Built for real shows.
          </h2>
          <p className="max-w-[30rem] rise" style={{ fontSize: "var(--step-body)", lineHeight: 1.5, ["--d" as string]: "80ms" }}>
            QLC+ does the DMX. Lights Pi gives it a control surface you can run a production from.
          </p>
        </div>

        {TILES.map((t, i) => (
          <figure key={t.name} className={`${t.area} ${t.size} rise`} style={{ backgroundColor: t.bg, ["--d" as string]: `${(i % 3) * 70}ms` }}>
            {t.shot && (
              <Image
                src={t.shot.src}
                alt={t.shot.alt}
                width={t.shot.w}
                height={t.shot.h}
                sizes="(min-width: 900px) 60vw, 100vw"
                className="shot"
                style={t.shot.style}
              />
            )}
            <figcaption className="cap" style={{ backgroundColor: t.bg, color: t.ink }}>
              <span className="block font-medium" style={{ fontSize: "18px" }}>{t.name}</span>
              <span className="block mt-1" style={{ fontSize: "16px", lineHeight: 1.4 }}>{t.line}</span>
            </figcaption>
          </figure>
        ))}

        {/* Workspaces: the real switcher, built at poster size. */}
        <figure className="a-w t-wide rise" style={{ backgroundColor: "#f1f1ee" }}>
          <div
            data-ui
            aria-hidden="true"
            className="absolute left-[20px] top-[16%] flex items-stretch gap-[0.3em] text-ink"
            style={{ fontSize: "clamp(18px, 2.1vw, 32px)" }}
          >
            <span className="bg-white px-[0.6em] py-[0.35em] font-medium whitespace-nowrap">studio-default (active · live)</span>
            <span className="bg-ink text-paper px-[0.6em] py-[0.35em] font-medium">Switch</span>
          </div>
          <figcaption className="cap" style={{ backgroundColor: "#f1f1ee", color: "#0a0a0a" }}>
            <span className="block font-medium" style={{ fontSize: "18px" }}>Workspaces</span>
            <span className="block mt-1" style={{ fontSize: "16px", lineHeight: 1.4 }}>
              One per production or venue. Groups and last looks travel with each.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
