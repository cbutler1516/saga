"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Container, FadeIn, Section } from "@/components/ui/section";

export function FinalCtaSection() {
  return (
    <Section className="border-t border-white/[0.06] pb-28 lg:pb-32">
      <Container>
        <FadeIn>
          <div className="steel-surface blueprint-frame relative overflow-hidden rounded-2xl px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="molten-line absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 h-[220px] w-[440px] -translate-x-1/2 rounded-full bg-[#FF6A00]/10 blur-[90px]" />
              <div className="grid-bg absolute inset-0 opacity-[0.12]" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#E6E6E6]">
                Own the company. Keep selling.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg text-[#A7A7A7]">
                A short, confidential assessment to understand where you stand
                and what ownership or expansion may require — you decide what
                happens next.
              </p>
              <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink
                  href="/assessment"
                  className="min-h-[44px] w-full sm:w-auto"
                >
                  Find Out If You&apos;re Ready
                </ButtonLink>
                <ButtonLink
                  href="/assessment/independence"
                  variant="secondary"
                  className="min-h-[44px] w-full sm:w-auto"
                >
                  Explore Ownership
                </ButtonLink>
              </div>
              <p className="mt-8 text-xs text-[#A7A7A7]/70">
                Confidential · Advisory · No pressure · No obligation · No partner
                approval implied
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
