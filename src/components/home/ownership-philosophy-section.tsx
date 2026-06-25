"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { ownershipPhilosophy } from "@/lib/site-content";

export function OwnershipPhilosophySection() {
  return (
    <Section className="border-t border-white/5">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>{ownershipPhilosophy.label}</SectionLabel>
          <SectionHeading className="mt-6">
            {ownershipPhilosophy.headline}
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.08} className="mx-auto mt-10 max-w-2xl space-y-6">
          {ownershipPhilosophy.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-relaxed text-zinc-400 md:text-lg md:leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </FadeIn>

        <FadeIn delay={0.12} className="mx-auto mt-14 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Questions worth considering
          </p>
          <ul className="mt-6 divide-y divide-white/5">
            {ownershipPhilosophy.considerations.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-5 py-5 first:pt-0 last:pb-0"
              >
                <span className="shrink-0 font-mono text-[11px] text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-snug text-zinc-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </Section>
  );
}
