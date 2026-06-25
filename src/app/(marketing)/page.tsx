import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { BuiltFromSection } from "@/components/home/built-from-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { FoundryAiSection } from "@/components/home/foundry-ai-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProblemSection } from "@/components/home/problem-section";
import { ThreePathsSection } from "@/components/home/three-paths-section";
import { WhatHappensNextSection } from "@/components/home/what-happens-next-section";
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
        <ProblemSection />
        <BuiltFromSection />
        <WorkspacePreviewSection />
        <FoundryAiSection />
        <ThreePathsSection />
        <WhatHappensNextSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
