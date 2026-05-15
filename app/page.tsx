import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { getGitHubRepoStats } from "@/lib/github";

// Below-the-fold sections — code-split. Skeleton heights match the
// rendered sections closely so we don't shift layout on hydration.
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
      <Hero stars={stars} />
      <ProblemSolution />
      <KeyFeatures />
      <UseCases />
      <HowItWorks />
      <CostComparison />
      <SocialProof stars={stars} />
      <FinalCTA />
    </>
  );
}
