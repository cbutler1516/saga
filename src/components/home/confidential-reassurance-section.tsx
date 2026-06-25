"use client";

import { Container, FadeIn, Section } from "@/components/ui/section";
import { confidentialityReassurance } from "@/lib/site-content";

export function ConfidentialReassuranceSection() {
  return (
    <Section className="border-t border-white/[0.06] py-14 sm:py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#101010]/50">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-5">
              {confidentialityReassurance.map((item) => (
                <span
                  key={item}
                  className="text-[12px] font-medium tracking-wide text-zinc-500 sm:text-[13px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
