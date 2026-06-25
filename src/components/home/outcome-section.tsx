"use client";

import { outcomeItems } from "@/lib/site-content";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

export function OutcomeSection() {
  return (
    <Section className="border-t border-white/5">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>The outcome</SectionLabel>
          <SectionHeading className="mt-6">
            Clarity and structure{" "}
            <span className="text-gradient-accent">when you need them.</span>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.08} className="mx-auto mt-16 max-w-xl">
          <ul className="divide-y divide-white/5">
            {outcomeItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 py-5 first:pt-0 last:pb-0"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]/70"
                  aria-hidden
                />
                <span className="text-base font-medium text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </Section>
  );
}
