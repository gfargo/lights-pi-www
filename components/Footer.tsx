"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useFlag } from "@/components/flags/flags-provider";

/**
 * Footer — editorial colophon. Four columns of mono links, hairline rules,
 * masthead-style production credit at the bottom.
 */
export function Footer() {
  const showShowcase = useFlag("enable-showcase");

  return (
    <footer className="bg-ink text-paper border-t border-rule">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Wordmark */}
        <div className="flex items-end justify-between gap-6 hairline pb-8 mb-12">
          <div className="flex items-center gap-3">
            <span className="filament inline-block w-2 h-2 rounded-full bg-amber-tungsten" />
            <span className="font-mono uppercase tracking-widest text-sm text-paper">
              lights-pi
            </span>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
            v2.2.0 · Riversway
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Column label="Product" links={[
            { href: "/quick-start", label: "Quick Start" },
            { href: "/hardware", label: "Hardware" },
            { href: "/demo", label: "Playground" },
            { href: "/docs", label: "Docs" },
            { href: "/roadmap", label: "Roadmap" },
          ]} />

          <Column
            label="Community"
            links={[
              { href: "https://github.com/gfargo/lights-pi", label: "GitHub", external: true },
              { href: "https://discord.com/invite/KGu9nE9Ejx", label: "Discord", external: true },
              ...(showShowcase ? [{ href: "/showcase", label: "Showcase" }] : []),
              { href: "/contributing", label: "Contributing" },
            ]}
          />

          <Column label="Resources" links={[
            { href: "/blog", label: "Blog" },
            { href: "/use-cases", label: "Use Cases" },
            { href: "/comparison", label: "Comparison" },
            { href: "/faq", label: "FAQ" },
          ]} />

          <Column label="Legal" links={[
            { href: "https://opensource.org/licenses/MIT", label: "MIT License", external: true },
            { href: "/privacy", label: "Privacy" },
          ]}>
            <a
              href="https://github.com/gfargo/lights-pi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-amber-tungsten transition-colors inline-flex"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </Column>
        </div>

        {/* Colophon */}
        <div className="hairline mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-paper/40">
          <p>&copy; {new Date().getFullYear()} Lights Pi · MIT</p>
          <p className="italic font-display normal-case text-paper/40 text-sm tracking-normal">
            Set design by you. Lighting design by your agent.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface ColumnLink {
  href: string;
  label: string;
  external?: boolean;
}

function Column({
  label,
  links,
  children,
}: {
  label: string;
  links: ColumnLink[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-paper/60 hover:text-amber-tungsten transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="font-mono text-sm text-paper/60 hover:text-amber-tungsten transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
