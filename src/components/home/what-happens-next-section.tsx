"use client";

import { ButtonLink } from "@/components/ui/button-link";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { whatHappensNextSteps } from "@/lib/site-content";

export function WhatHappensNextSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>What happens next?</SectionLabel>
          <SectionHeading className="mt-6">
            Exploratory, educational, and entirely your call.
          </SectionHeading>
        </FadeIn>

        <div className="relative mt-14 md:mt-16">
          {/* connecting molten datum line (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px lg:block"
            aria-hidden
          >
            <div className="molten-line mx-auto h-px w-[78%] opacity-60" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {whatHappensNextSteps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="forge-card relative flex h-full flex-col rounded-xl p-7 md:p-8">
                  <div className="flex items-center gap-4">
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/8 font-mono text-sm font-medium text-[#FF6A00]">
                      {step.number}
                      <span
                        className="absolute inset-0 rounded-full border border-[#FF6A00]/40 animate-pulse-ring"
                        aria-hidden
                      />
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#FF6A00]/30 to-transparent" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn className="mt-12 text-center">
          <ButtonLink href="/assessment" className="min-h-[44px] w-full sm:w-auto">
            Find Out If You&apos;re Ready
          </ButtonLink>
        </FadeIn>
      </Container>
    </Section>
  );
}
