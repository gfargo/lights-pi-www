import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { McpEndpoint } from "@/components/home/McpEndpoint";
import { AiConversation } from "@/components/home/AiConversation";
import { getGitHubRepoStats, getLatestVersion } from "@/lib/github";

// Below-the-fold sections — code-split. Skeleton heights match closely so
// we don't shift layout on hydration.
const UseCases = dynamic(
  () => import("@/components/home/UseCases").then((m) => ({ default: m.UseCases })),
  { loading: () => <div className="min-h-[800px] bg-ink" aria-hidden /> },
);

const CueSheet = dynamic(
  () => import("@/components/home/CueSheet").then((m) => ({ default: m.CueSheet })),
  { loading: () => <div className="min-h-[720px] bg-paper" aria-hidden /> },
);

const CostComparison = dynamic(
  () =>
    import("@/components/home/CostComparison").then((m) => ({
      default: m.CostComparison,
    })),
  { loading: () => <div className="min-h-[640px] bg-ink" aria-hidden /> },
);

const SocialProof = dynamic(
  () => import("@/components/home/SocialProof").then((m) => ({ default: m.SocialProof })),
  { loading: () => <div className="min-h-[400px] bg-ink" aria-hidden /> },
);

const FinalCTA = dynamic(
  () => import("@/components/home/FinalCTA").then((m) => ({ default: m.FinalCTA })),
  { loading: () => <div className="min-h-[480px] bg-ink" aria-hidden /> },
);

export default async function Home() {
  // Real GitHub stars + latest release tag, fetched server-side and cached
  // via the lib/github helpers (5 min for stars, 1 hour for releases).
  const [{ stars }, version] = await Promise.all([
    getGitHubRepoStats(),
    getLatestVersion(),
  ]);

  return (
    <>
      {/* Act I — establishing shot */}
      <Hero stars={stars} version={version} />

      {/* Act II — the new capability, named */}
      <McpEndpoint />

      {/* Act III — proof, in real MCP transcript form */}
      <AiConversation />

      {/* Act IV — where it goes to work */}
      <UseCases />

      {/* Act V — the paper-cream cue-sheet pivot
          (intentional cinematic break from the all-dark page) */}
      <CueSheet version={version} />

      {/* Act VI — the practical accounting */}
      <CostComparison />

      {/* Curtain — real GitHub stats + closing CTA */}
      <SocialProof stars={stars} />
      <FinalCTA />
    </>
  );
}
