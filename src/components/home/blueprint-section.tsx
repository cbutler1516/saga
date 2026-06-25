"use client";

import { FoundryVideo } from "@/components/media/foundry-video";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { blueprintPositioning } from "@/lib/site-content";

const frameworkItems = [
  "Where you stand",
  "What looks strong",
  "What may need attention",
  "What we'd tackle first",
  "Suggested next step",
];

export function BlueprintSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <SectionLabel>Your ownership summary</SectionLabel>
            <SectionHeading className="mt-6 max-w-[16ch]">
              {blueprintPositioning.headline}
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-[#A7A7A7]">
              {blueprintPositioning.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#A7A7A7]/80">
              {blueprintPositioning.detail}
            </p>

            <div className="mt-10 overflow-hidden rounded-xl border border-white/[0.06] bg-[#101010]/60 backdrop-blur-sm">
              <div className="border-b border-white/[0.06] px-8 py-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
                  Summary outline
                </p>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {frameworkItems.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 px-8 py-4"
                  >
                    <span className="font-mono text-[11px] text-[#FFB000]/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-[#E6E6E6]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="blueprint-frame relative mt-12 lg:mt-0">
              <div className="absolute left-0 top-0 z-10 h-full w-px bg-gradient-to-b from-[#FF6A00]/70 via-[#FFB000]/25 to-transparent" />
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#101010]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FoundryVideo
                    src="/video/independence-blueprint.mp4"
                    poster="/images/blueprint-preview.png"
                    overlay={false}
                    disableVideoOnMobile
                    className="absolute inset-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/30" />
                </div>
                <div className="border-t border-white/[0.06] px-6 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#A7A7A7]">
                    Personalized summary preview
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.15} className="mt-12">
          <ButtonLink href="/assessment" className="min-h-[44px] w-full sm:w-auto">
            Find Out If You&apos;re Ready
          </ButtonLink>
        </FadeIn>
      </Container>
    </Section>
  );
}
