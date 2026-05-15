import { Star, GitFork, Eye } from "lucide-react";
import { getGitHubRepoStats } from "@/lib/github";

interface SocialProofProps {
  /** Stars passed from the page-level fetch so we don't double-fetch. */
  stars?: number;
}

/**
 * Real metrics only. The previous version of this section had three invented
 * testimonials and inflated "500+ active users / 2k+ downloads" stats —
 * those were removed for credibility. Phase 3 will replace this with a real
 * AI-conversation panel showing an actual MCP call → DMX response exchange.
 */
export async function SocialProof({ stars: starsProp }: SocialProofProps) {
  // Always pull fresh stats here — we want forks/watchers too. The fetch
  // is cached for 5 minutes in lib/github.ts so this is essentially free.
  // starsProp is reserved for a future optimization to skip the fetch.
  void starsProp;
  const repoStats = await getGitHubRepoStats();

  return (
    <section className="relative py-32 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end hairline pb-12">
          <div>
            <p className="eyebrow">On GitHub</p>
            <h2
              className="font-display text-paper mt-4"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Open source.
              <span className="block text-paper/40 italic">No subscriptions, no telemetry.</span>
            </h2>
          </div>
          <a
            href="https://github.com/gfargo/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-widest text-paper/60 hover:text-amber-tungsten transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            View repository
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule mt-px">
          <Metric icon={Star} label="Stars" value={repoStats.stars} />
          <Metric icon={GitFork} label="Forks" value={repoStats.forks} />
          <Metric icon={Eye} label="Watchers" value={repoStats.watchers} />
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-ink px-8 py-12 flex flex-col gap-6">
      <Icon className="w-5 h-5 text-amber-tungsten" />
      <div>
        <div
          className="font-display text-paper tabular-nums leading-none"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          {value.toLocaleString()}
        </div>
        <p className="eyebrow mt-3">{label}</p>
      </div>
    </div>
  );
}
