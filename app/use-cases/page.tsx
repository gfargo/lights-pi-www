import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Swatch, SwatchButton } from "@/components/home/Swatch";
import { SCENES } from "@/lib/scenes";

export const metadata = {
  title: "Use Cases - Lights Pi | Real-World Applications",
  description:
    "Where a Pi-based DMX controller fits: video and photo studios, live streams, small venues, classrooms and home rooms. The controller is about $145 to $285; fixtures are extra.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    title: "Use Cases - Lights Pi",
    description: "Where a Pi-based DMX controller fits, from content studios to small venues",
    type: "website",
  },
};

/**
 * Each use case wears one of the six real scenes as its picture: the
 * per-fixture colours a room like that might actually run.
 */
const useCases = [
  {
    id: "video",
    scene: 2,
    title: "Video and content studios",
    description:
      "Save a look per kind of shoot (talking head, product close-up, B-roll) and recall it exactly, so episode twelve matches episode one. Change it from your phone without leaving the set.",
    uses: [
      "Saved scenes recalled in one tap",
      "Colour temperature from 1800K to 10000K, per fixture group",
      "Phone control while the camera rolls",
    ],
    fixtures: "Two to four LED panels or pars, plus an RGB accent",
  },
  {
    id: "photography",
    scene: 5,
    title: "Photography studios",
    description:
      "Portrait, product and dramatic setups as named scenes. A returning client's setup is a scene you recall, not one you rebuild from notes.",
    uses: [
      "Named scenes per setup or per client",
      "White balance matched across fixtures",
      "The Console tab for fine per-channel trims",
    ],
    fixtures: "Four to six LED panels, background and strip lights",
  },
  {
    id: "streaming",
    scene: 3,
    title: "Live streaming",
    description:
      "Change the room between stream segments, or trigger looks from the tools you already stream with. Anything that can send an OSC message or an HTTP request can fire a scene or a chase.",
    uses: [
      "Scenes and chases over OSC or the HTTP API",
      "Chases with tap tempo for high-energy moments",
      "An AI agent can set the look over MCP",
    ],
    fixtures: "RGB pars and LED bars",
  },
  {
    id: "events",
    scene: 0,
    title: "Small venues and events",
    description:
      "Program dinner, first dance and party looks before the doors open, then run the night from a phone anywhere in the room. Cue lists step through timed looks when you press Go.",
    uses: [
      "Cue lists and chases for a running order",
      "One workspace per venue or production",
      "Wireless DMX with a transmitter such as a Chauvet D-Fi hub",
    ],
    fixtures: "Pars and wash lights, wireless DMX for long runs",
  },
  {
    id: "education",
    scene: 4,
    title: "Teaching and training",
    description:
      "A complete DMX rig per bench for the price of the controller and a fixture or two. Students see every channel of every fixture, labelled from its profile, and learn what a scene actually is.",
    uses: [
      "A console labelled from QLC+ fixture profiles",
      "QLC+ underneath, an open-source engine used on real shows",
      "All of it open source, to read and change",
    ],
    fixtures: "Whatever DMX fixtures the department already owns",
  },
  {
    id: "home",
    scene: 1,
    title: "Home rooms",
    description:
      "DMX fixtures as ambient light in a living room or studio flat, with scenes for evening, film night and work. Your own scripts or home automation can call the same API the phone does.",
    uses: [
      "Scenes from any browser on the network",
      "HTTP API and OSC for your own automations",
      "Remote access over Tailscale, behind a password",
    ],
    fixtures: "RGB pars, or LED strips with a DMX decoder",
  },
];

export default function UseCasesPage() {
  return (
    <div className="bg-ink px-[var(--gutter)] pb-[clamp(96px,12vw,180px)]">
      <PageHead
        scene={1}
        label="Use cases"
        title="One controller, many rooms."
        lead="The same Pi can run a YouTube set, a wedding and a classroom bench. Here is where it fits and what each room tends to use."
        aside={
          <p className="max-w-[20rem]">
            The controller is about $145, or $285 for the recommended build. Fixtures are extra.
          </p>
        }
      />

      <div className="flex flex-col gap-[clamp(72px,10vw,144px)]">
        {useCases.map((useCase) => {
          const scene = SCENES[useCase.scene % SCENES.length];
          return (
            <section
              key={useCase.id}
              id={useCase.id}
              aria-labelledby={`${useCase.id}-title`}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 items-start"
            >
              <figure className="md:col-span-5">
                <Swatch
                  cells={scene.cells}
                  label={`The ${scene.name} scene, one colour per fixture`}
                  className="h-[clamp(120px,22vw,300px)] w-full"
                />
                <figcaption className="mt-3 text-paper/80" style={{ fontSize: "var(--step-body)" }}>
                  {scene.name}, a scene from a real studio workspace
                </figcaption>
              </figure>

              <div className="md:col-span-6 md:col-start-7">
                <h2
                  id={`${useCase.id}-title`}
                  className="font-display text-paper"
                  style={{ fontSize: "var(--step-head)", lineHeight: 1.05, textWrap: "balance" }}
                >
                  {useCase.title}
                </h2>
                <p className="mt-6 max-w-[38rem] text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
                  {useCase.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {useCase.uses.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-paper" style={{ fontSize: "var(--step-body)" }}>
                      <span
                        aria-hidden="true"
                        className="inline-block shrink-0 w-[0.55em] h-[0.8em] translate-y-[0.08em]"
                        style={{ backgroundColor: scene.cells[0] }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-paper" style={{ fontSize: "var(--step-body)" }}>
                  <span className="font-medium">Typical fixtures:</span> {useCase.fixtures}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="use-cases-close" className="mt-[clamp(96px,12vw,180px)]">
        <h2
          id="use-cases-close"
          className="font-display text-paper max-w-[18ch]"
          style={{ fontSize: "var(--step-head)", textWrap: "balance" }}
        >
          Start with the controller.
        </h2>
        <p className="mt-6 max-w-[36rem] text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
          Every room above starts from the same build: a Pi, a USB DMX interface and a DMX cable to your first fixture.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <SwatchButton href="/quick-start">Start the build</SwatchButton>
          <Link href="/hardware" className="link-plain">
            See the hardware guide
          </Link>
          <Link href="/showcase" className="link-plain">
            View the showcase
          </Link>
        </div>
      </section>
    </div>
  );
}
