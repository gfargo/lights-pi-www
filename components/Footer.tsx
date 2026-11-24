"use client";

import Link from "next/link";
import { useFlag } from "@/components/flags/flags-provider";
import { SCENES } from "@/lib/scenes";

interface FooterProps {
  /** Latest release tag, fetched server-side and passed in by layout.tsx. */
  version: string;
}

/**
 * Footer — the mark, built large. LIGHTSPI is eight letters, one per
 * fixture: each letter is knocked out of its own block in that fixture's
 * colour from the Sunset scene, blocks of different heights on one baseline.
 */
const LETTERS = ["L", "I", "G", "H", "T", "S", "P", "I"];
const HEIGHTS = [100, 82, 92, 70, 88, 76, 96, 64];

export function Footer({ version }: FooterProps) {
  const showShowcase = useFlag("enable-showcase");
  const cells = SCENES[0].cells;

  return (
    <footer className="bg-ink text-paper px-[var(--gutter)] pt-[clamp(72px,10vw,140px)] pb-10">
      <div
        aria-label="Lights Pi"
        role="img"
        className="flex items-end gap-[4px] h-[22svh] md:h-[34svh]"
      >
        {LETTERS.map((l, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="flex-1 flex items-end justify-center overflow-hidden text-ink font-display"
            style={{
              backgroundColor: cells[i],
              height: `${HEIGHTS[i]}%`,
              fontSize: "clamp(2.5rem, 9vw, 9rem)",
              lineHeight: 0.8,
              paddingBottom: "0.08em",
            }}
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
        <Column className="md:col-span-2" label="Product" links={[
          { href: "/quick-start", label: "Quick start" },
          { href: "/hardware", label: "Hardware" },
          { href: "/demo", label: "Playground" },
          { href: "/docs", label: "Docs" },
          { href: "/roadmap", label: "Roadmap" },
        ]} />
        <Column className="md:col-span-2" label="Community" links={[
          { href: "https://github.com/gfargo/lights-pi", label: "GitHub", external: true },
          { href: "https://discord.com/invite/KGu9nE9Ejx", label: "Discord", external: true },
          ...(showShowcase ? [{ href: "/showcase", label: "Showcase" }] : []),
          { href: "/contributing", label: "Contributing" },
        ]} />
        <Column className="md:col-span-2" label="Resources" links={[
          { href: "/blog", label: "Blog" },
          { href: "/use-cases", label: "Use cases" },
          { href: "/comparison", label: "Comparison" },
          { href: "/faq", label: "FAQ" },
        ]} />
        <Column className="md:col-span-2" label="Legal" links={[
          { href: "https://opensource.org/licenses/MIT", label: "MIT licence", external: true },
          { href: "/privacy", label: "Privacy" },
        ]} />
        <div className="col-span-2 md:col-span-4 text-paper" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          <p className="font-medium">Latest release {version}</p>
          <p className="mt-3 text-paper/80">
            Photographs via Wikimedia Commons:{" "}
            <a className="underline" href="https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg">Raspberry Pi 4</a> by Laserlicht,{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>;{" "}
            <a className="underline" href="https://commons.wikimedia.org/wiki/File:DMX_Cable.jpg">DMX Cable</a> by DJSparky,{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>;{" "}
            <a className="underline" href="https://commons.wikimedia.org/wiki/File:Pink_and_blue_stage_lighting.jpg">Pink and blue stage lighting</a> by James,{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>;{" "}
            <a className="underline" href="https://commons.wikimedia.org/wiki/File:Spotlight_(14871682502).jpg">Spotlight</a> by Blondinrikard Fröberg,{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>.
            Interface screenshots are of Lights Pi itself.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-paper" style={{ fontSize: "16px" }}>
        <p>&copy; {new Date().getFullYear()} Lights Pi · MIT</p>
        <Link href="/quick-start" className="inline-flex items-center min-h-[44px] px-4 bg-paper text-ink font-semibold hover:bg-amber-tungsten transition-colors">
          Build one
        </Link>
      </div>
    </footer>
  );
}

interface ColumnLink {
  href: string;
  label: string;
  external?: boolean;
}

function Column({ label, links, className = "" }: { label: string; links: ColumnLink[]; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <p className="text-paper font-medium" style={{ fontSize: "16px" }}>{label}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-amber-tungsten transition-colors" style={{ fontSize: "16px" }}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="text-paper/80 hover:text-amber-tungsten transition-colors" style={{ fontSize: "16px" }}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
