"use client";

import { solutionCopy } from "@/lib/site-content";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

export function SolutionSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>The solution</SectionLabel>
          <SectionHeading className="mt-6">{solutionCopy.title}</SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-zinc-400">
            {solutionCopy.body}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
