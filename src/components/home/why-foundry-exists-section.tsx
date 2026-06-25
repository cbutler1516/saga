"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { whyFoundryExists } from "@/lib/site-content";

export function WhyFoundryExistsSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>{whyFoundryExists.label}</SectionLabel>
          <SectionHeading className="mt-6">
            {whyFoundryExists.headline}
          </SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-zinc-400">
            {whyFoundryExists.body}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
