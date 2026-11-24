import Link from "next/link";
import { PageHead, SectionHead } from "@/components/PageHead";
import { SwatchButton } from "@/components/home/Swatch";
import { SCENES } from "@/lib/scenes";

export const metadata = {
  title: "Community - Lights Pi",
  description: "Get help, share your rig and contribute to Lights Pi on Discord and GitHub.",
};

/** Where to find people. One line per channel, its bullet a scene cell. */
const CHANNELS = [
  {
    name: "Discord",
    detail: "Ask for help, share your rig, talk through ideas",
    href: "https://discord.com/invite/KGu9nE9Ejx",
    cell: SCENES[3].cells[0],
  },
  {
    name: "GitHub",
    detail: "The source, the releases and the roadmap",
    href: "https://github.com/gfargo/lights-pi",
    cell: SCENES[0].cells[0],
  },
  {
    name: "Issues",
    detail: "Report a bug or request a feature",
    href: "https://github.com/gfargo/lights-pi/issues",
    cell: SCENES[4].cells[0],
  },
];

const WAYS = [
  {
    title: "If you run it",
    items: [
      "Share your setup for the showcase",
      "Answer a question on Discord",
      "Report bugs with your hardware details",
      "Ask for the feature you keep wishing for",
    ],
  },
  {
    title: "If you write code",
    items: [
      "Pick up an open issue",
      "Fix a bug you hit yourself",
      "Add a fixture profile or an integration",
      "Improve the docs and the wiki",
    ],
  },
  {
    title: "If you make things",
    items: [
      "Record a build or a walkthrough",
      "Write up your rig and what you learned",
      "Show it running on a real set",
    ],
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-ink px-[var(--gutter)] pb-[clamp(96px,12vw,180px)]">
      <PageHead
        scene={3}
        label="Community"
        title="Bring your rig."
        lead="Lights Pi is open source and built in the open. Get help, show what you built, and help shape what comes next."
      />

      <ul aria-label="Community channels">
        {CHANNELS.map((c) => (
          <li key={c.name}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-baseline gap-x-10 pb-10 md:pb-4"
            >
              <span
                className="font-display text-paper transition-colors group-hover:text-amber-tungsten flex items-center gap-[0.25em]"
                style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block shrink-0 w-[0.42em] h-[0.62em] translate-y-[0.04em]"
                  style={{ backgroundColor: c.cell }}
                />
                {c.name}
              </span>
              <span className="mt-2 md:mt-0 text-paper md:text-right md:max-w-[22rem]" style={{ fontSize: "var(--step-body)" }}>
                {c.detail}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <section aria-labelledby="ways-title" className="mt-[clamp(96px,12vw,180px)]">
        <SectionHead id="ways-title" title="Ways to help" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {WAYS.map((w) => (
            <div key={w.title}>
              <h3 className="font-display text-paper" style={{ fontSize: "var(--step-lead)" }}>
                {w.title}
              </h3>
              <ul className="mt-5 space-y-2 text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.5 }}>
                {w.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="community-close" className="mt-[clamp(96px,12vw,180px)]">
        <h2
          id="community-close"
          className="font-display text-paper max-w-[18ch]"
          style={{ fontSize: "var(--step-head)", textWrap: "balance" }}
        >
          Ready to contribute?
        </h2>
        <p className="mt-6 max-w-[36rem] text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
          The contributing guide covers reporting bugs, suggesting features, submitting code and improving the
          docs.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <SwatchButton href="/contributing">Read the contributing guide</SwatchButton>
          <a
            href="https://github.com/gfargo/lights-pi/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="link-plain"
          >
            View open issues
          </a>
          <Link href="/showcase" className="link-plain">
            See the showcase
          </Link>
        </div>
      </section>
    </div>
  );
}
