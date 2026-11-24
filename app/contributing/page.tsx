import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Contributing - Lights Pi",
  description: "How to contribute to Lights Pi. Report bugs, suggest features, submit code, or improve documentation.",
};

export default function ContributingPage() {
  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={4}
        label="Contributing"
        title="Help build the rig."
        lead="Lights Pi is open source and community-driven. Whether you're fixing a typo in the docs or adding a new MCP tool, contributions are welcome."
        aside={
          <a
            href="https://github.com/gfargo/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            className="link-plain"
          >
            gfargo/lights-pi on GitHub
          </a>
        }
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-rule border-y border-rule">
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
            description="The documentation lives in the GitHub Wiki. Choose Edit on any wiki page to contribute directly — changes appear on this site within an hour."
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
    </div>
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
    <div className="bg-ink py-8 md:p-10 flex flex-col">
      <h2 className="font-display text-paper" style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}>
        {title}
      </h2>
      <p className="mt-4 text-paper max-w-[36rem]" style={{ fontSize: "var(--step-body)", lineHeight: 1.55 }}>
        {description}
      </p>
      <LinkComp {...linkProps} className="link-plain mt-6 self-start">
        {linkLabel} →
      </LinkComp>
    </div>
  );
}
