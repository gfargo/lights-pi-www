import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { FadeIn } from "@/components/animations/FadeIn";

// Lazy load below-the-fold components
const UseCases = dynamic(() => import("@/components/home/UseCases").then(mod => ({ default: mod.UseCases })), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

const CostComparison = dynamic(() => import("@/components/home/CostComparison").then(mod => ({ default: mod.CostComparison })), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

const SocialProof = dynamic(() => import("@/components/home/SocialProof").then(mod => ({ default: mod.SocialProof })), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});

const FinalCTA = dynamic(() => import("@/components/home/FinalCTA").then(mod => ({ default: mod.FinalCTA })), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn>
        <ProblemSolution />
      </FadeIn>
      <FadeIn>
        <KeyFeatures />
      </FadeIn>
      <FadeIn>
        <UseCases />
      </FadeIn>
      <FadeIn>
        <HowItWorks />
      </FadeIn>
      <FadeIn>
        <CostComparison />
      </FadeIn>
      <FadeIn>
        <SocialProof />
      </FadeIn>
      <FadeIn>
        <FinalCTA />
      </FadeIn>
    </>
  );
}
