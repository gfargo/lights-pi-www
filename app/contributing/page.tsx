import type { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Contributing - Lights Pi",
  description: "How to contribute to Lights Pi. Report bugs, suggest features, submit code, or improve documentation.",
};

export default function ContributingPage() {
  return (
    <section className="min-h-screen bg-ink py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="eyebrow">Community</p>
        <h1
          className="font-display text-paper mt-6"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          Contributing
        </h1>

        <p className="mt-8 text-lg text-paper/70 leading-relaxed">
          Lights Pi is open source and community-driven. Whether you&apos;re
          fixing a typo in the docs or adding a new MCP tool, contributions
          are welcome.
        </p>

        <div className="mt-16 space-y-12">
          <ContribSection
            title="Report a bug"
            description="Found something broken? Open an issue with steps to reproduce, your Pi model, and QLC+ version."
            link="https://github.com/gfargo/lights-pi/issues/new?template=bug_report.md"
            linkLabel="Open an issue"
            external
          />

          <ContribSection
            title="Suggest a feature"
            description="Have an idea for a new scene type, MCP tool, or integration? Start a discussion or file a feature request."
            link="https://github.com/gfargo/lights-pi/discussions"
            linkLabel="Start a discussion"
            external
          />

          <ContribSection
            title="Submit code"
            description="Fork the repo, create a branch, and open a PR. The CONTRIBUTING.md in the repo has the full workflow: code style, testing, and commit conventions."
            link="https://github.com/gfargo/lights-pi/blob/main/CONTRIBUTING.md"
            linkLabel="Read CONTRIBUTING.md"
            external
          />

          <ContribSection
            title="Improve docs"
            description="The documentation lives in the GitHub Wiki. Click 'Edit' on any wiki page to contribute directly — changes appear on this site within an hour."
            link="/docs"
            linkLabel="Browse docs"
          />

          <ContribSection
            title="Share your setup"
            description="Running Lights Pi in a studio, theater, or home? We'd love to feature it. Share photos, your fixture list, or a short write-up."
            link="https://discord.com/invite/KGu9nE9Ejx"
            linkLabel="Join Discord"
            external
          />
        </div>

        <div className="hairline mt-20 pt-10 flex items-center gap-4">
          <a
            href="https://github.com/gfargo/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-paper/60 hover:text-amber-tungsten transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden />
            gfargo/lights-pi
          </a>
        </div>
      </div>
    </section>
  );
}

function ContribSection({
  title,
  description,
  link,
  linkLabel,
  external,
}: {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  external?: boolean;
}) {
  const LinkComp = external ? "a" : Link;
  const linkProps = external
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { href: link };

  return (
    <div className="border-t border-rule pt-8">
      <h2 className="font-mono text-sm uppercase tracking-widest text-amber-tungsten">
        {title}
      </h2>
      <p className="mt-3 text-paper/70 leading-relaxed">{description}</p>
      <LinkComp
        {...linkProps}
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper border-b border-paper/30 pb-0.5 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
      >
        {linkLabel} →
      </LinkComp>
    </div>
  );
}
