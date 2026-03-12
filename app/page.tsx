import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { UseCases } from "@/components/home/UseCases";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CostComparison } from "@/components/home/CostComparison";
import { SocialProof } from "@/components/home/SocialProof";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <KeyFeatures />
      <UseCases />
      <HowItWorks />
      <CostComparison />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
