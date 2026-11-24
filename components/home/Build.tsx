import Image from "next/image";
import { RigVideo } from "./RigVideo";

/**
 * Act VI. The build, in three tiles that grow: the computer, the cable,
 * the light. The first two photographs are from Wikimedia Commons (credited in
 * the footer); the third tile is footage of a real Lights Pi rig.
 */
const STAGES = [
  {
    name: "Plug in",
    text: "A Raspberry Pi 3B+ or 4 and an ENTTEC USB-to-DMX interface. One script provisions the Pi from your laptop.",
    span: "md:col-span-3",
    h: "md:h-[30vh]",
    bg: "#f1f1ee",
    img: { src: "/images/found/raspberry-pi-4-model-b-side.jpg", w: 1920, h: 1130, alt: "A Raspberry Pi 4 Model B, seen from the side.", cls: "object-contain mix-blend-multiply p-[8%]" },
  },
  {
    name: "Cable up",
    text: "DMX from the ENTTEC to the first fixture, chained light to light, with a terminator on the last one.",
    span: "md:col-span-4",
    h: "md:h-[44vh]",
    bg: "#161616",
    img: { src: "/images/found/dmx-cable.jpg", w: 1920, h: 2560, alt: "Two five-pin DMX-512 cable connectors, male and female, on a coil of cable.", cls: "object-cover" },
  },
  {
    name: "Run the show",
    text: "Open lights.local on any phone or laptop on the network. QLC+ drives the DMX; you drive Lights Pi.",
    span: "md:col-span-5",
    h: "md:h-[60vh]",
    bg: "#161616",
    img: null,
  },
];

export function Build() {
  return (
    <section className="bg-ink px-[var(--gutter)] pt-[clamp(96px,12vw,180px)] pb-[clamp(24px,4vw,64px)]" aria-labelledby="build-title">
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-[10px] md:items-end">
        <h2
          id="build-title"
          className="font-display text-paper md:absolute md:top-0 md:left-0 md:w-[56%] mb-6 md:mb-0 rise"
          style={{ fontSize: "var(--step-head)" }}
        >
          Ten minutes to light.
        </h2>
        {STAGES.map((s, i) => (
          <div key={s.name} className={`${s.span} rise`} style={{ ["--d" as string]: `${i * 90}ms` }}>
            <div className={`relative overflow-hidden ${s.h} ${["h-[34vw]", "h-[46vw]", "h-[62vw]"][i]}`} style={{ backgroundColor: s.bg }}>
              {s.img ? (
                <Image
                  src={s.img.src}
                  alt={s.img.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className={s.img.cls}
                />
              ) : (
                <RigVideo className="absolute inset-0 h-full w-full object-cover object-[55%_50%]" />
              )}
            </div>
            <h3 className="mt-5 text-paper font-medium" style={{ fontSize: "20px" }}>{s.name}</h3>
            <p className="mt-2 mb-7 md:mb-0 text-paper max-w-[28rem]" style={{ fontSize: "var(--step-body)", lineHeight: 1.5 }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
