import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { McpEndpoint } from "@/components/home/McpEndpoint";
import { AiConversation } from "@/components/home/AiConversation";
import { CueSheet } from "@/components/home/CueSheet";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { getGitHubRepoStats } from "@/lib/github";

// Below-the-fold sections — code-split. Skeleton heights match closely so
// we don't shift layout on hydration.
const UseCases = dynamic(() => import("@/components/home/UseCases").then(m => ({ default: m.UseCases })), {
  loading: () => <div className="min-h-[640px] bg-ink" aria-hidden />,
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks").then(m => ({ default: m.HowItWorks })), {
  loading: () => <div className="min-h-[480px] bg-steel" aria-hidden />,
});

const CostComparison = dynamic(() => import("@/components/home/CostComparison").then(m => ({ default: m.CostComparison })), {
  loading: () => <div className="min-h-[480px] bg-ink" aria-hidden />,
});

const SocialProof = dynamic(() => import("@/components/home/SocialProof").then(m => ({ default: m.SocialProof })), {
  loading: () => <div className="min-h-[320px] bg-ink" aria-hidden />,
});

const FinalCTA = dynamic(() => import("@/components/home/FinalCTA").then(m => ({ default: m.FinalCTA })), {
  loading: () => <div className="min-h-[400px] bg-ink" aria-hidden />,
});

export default async function Home() {
  // Real GitHub stars, fetched server-side, surfaced in the Hero.
  // Cached for 5 minutes via lib/github.ts.
  const { stars } = await getGitHubRepoStats();

  return (
    <>
      {/* Act I — the establishing shot */}
      <Hero stars={stars} />

      {/* Act II — the new capability, named */}
      <McpEndpoint />

      {/* Existing context (rebuilt or pruned in phase 4) */}
      <ProblemSolution />
      <KeyFeatures />

      {/* Act III — proof, in real MCP transcript form */}
      <AiConversation />

      {/* Existing middle (rebuilt or pruned in phase 4) */}
      <UseCases />
      <HowItWorks />
      <CostComparison />

      {/* Act IV — the paper-cream cue sheet pivot.
          Big visual moment that breaks the all-dark page open. */}
      <CueSheet />

      {/* Real GitHub stats (no fake testimonials) */}
      <SocialProof stars={stars} />

      {/* Curtain call */}
      <FinalCTA />
    </>
  );
}
