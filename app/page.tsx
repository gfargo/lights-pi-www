import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { UseCases } from "@/components/home/UseCases";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CostComparison } from "@/components/home/CostComparison";
import { SocialProof } from "@/components/home/SocialProof";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FadeIn } from "@/components/animations/FadeIn";

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
