"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { typicalEngagements } from "@/lib/site-content";

export function TypicalEngagementsSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>Typical engagements</SectionLabel>
          <SectionHeading className="mt-6">
            Scope and investment{" "}
            <span className="text-gradient-accent">vary by situation.</span>
          </SectionHeading>
          <p className="mt-6 text-lg text-[#A7A7A7]">
            These ranges help you understand whether Foundry is the right fit —
            not as a checkout, but as qualification for a confidential
            conversation.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {typicalEngagements.map((engagement, i) => (
            <FadeIn key={engagement.title} delay={i * 0.08}>
              <div className="forge-card blueprint-frame h-full rounded-xl p-8 lg:p-10">
                <div className="molten-line h-px w-10" />
                <h3 className="mt-4 text-lg font-semibold text-[#E6E6E6]">
                  {engagement.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#A7A7A7]">
                  {engagement.description}
                </p>
                <div className="mt-8 border-t border-white/[0.06] pt-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A7A7A7]">
                    {engagement.rangeLabel}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#E6E6E6]">
                    {engagement.range}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <p className="mx-auto max-w-[52ch] text-sm leading-relaxed text-[#A7A7A7]/80">
            Every engagement depends on licensing footprint, business model,
            production volume, number of loan officers, and operating complexity.
            These ranges help you understand fit — not as a checkout, but as
            qualification for a confidential conversation.
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
