"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { BlueprintOverlay } from "@/components/visual/blueprint-overlay";
import { StructuralFramework } from "@/components/visual/structural-framework";
import { expertiseIntro, expertisePillars } from "@/lib/site-content";

export function BuiltFromSection() {
  return (
    <Section className="border-t border-white/[0.06] bg-[#050505]">
      <BlueprintOverlay intensity="subtle" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="max-w-2xl">
            <SectionLabel>
              Built from every side of the mortgage business
            </SectionLabel>
            <SectionHeading className="mt-6">
              Perspectives you would otherwise hire separately.
            </SectionHeading>
            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              {expertiseIntro}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="relative mx-auto w-full max-w-sm">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#FF6A00]/8 blur-3xl" />
            <StructuralFramework className="aspect-[10/9] w-full" />
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {expertisePillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.06}>
              <div className="forge-card blueprint-frame h-full rounded-xl p-7 md:p-8">
                <div className="molten-line h-px w-12" />
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
