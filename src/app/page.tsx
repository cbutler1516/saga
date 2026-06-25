import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { BlueprintSection } from "@/components/home/blueprint-section";
import { BuiltFromSection } from "@/components/home/built-from-section";
import { ConfidentialReassuranceSection } from "@/components/home/confidential-reassurance-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { FoundryAiSection } from "@/components/home/foundry-ai-section";
import { HeroSection } from "@/components/home/hero-section";
import { OutcomeSection } from "@/components/home/outcome-section";
import { OwnershipPhilosophySection } from "@/components/home/ownership-philosophy-section";
import { ProblemSection } from "@/components/home/problem-section";
import { ProductJourneySection } from "@/components/home/product-journey-section";
import { SolutionSection } from "@/components/home/solution-section";
import { ThreePathsSection } from "@/components/home/three-paths-section";
import { TypicalEngagementsSection } from "@/components/home/typical-engagements-section";
import { WhatHappensNextSection } from "@/components/home/what-happens-next-section";
import { WhyFoundryExistsSection } from "@/components/home/why-foundry-exists-section";
import { WorkspacePreviewSection } from "@/components/home/workspace-preview-section";
import { corePositioning, siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Foundry — Own the Company. Keep Selling.",
  description: `${corePositioning} Mortgage broker compliance, NMLS licensing, MCR and HMDA reporting, and correspondent readiness.`,
  keywords: [...siteKeywords],
};

export default function Home() {
  return (
    <div className="min-h-full bg-[#050505]">
      <main>
        <HeroSection />
        <OwnershipPhilosophySection />
        <ProblemSection />
        <WhyFoundryExistsSection />
        <BuiltFromSection />
        <SolutionSection />
        <OutcomeSection />
        <WhatHappensNextSection />
        <ProductJourneySection />
        <WorkspacePreviewSection />
        <FoundryAiSection />
        <ThreePathsSection />
        <BlueprintSection />
        <TypicalEngagementsSection />
        <ConfidentialReassuranceSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
