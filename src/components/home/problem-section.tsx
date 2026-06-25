"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { realityItems } from "@/lib/site-content";

export function ProblemSection() {
  return (
    <Section className="border-t border-white/[0.06] bg-[#050505]">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <FadeIn className="max-w-2xl">
            <SectionLabel>The Hidden Work</SectionLabel>
            <SectionHeading className="mt-6">
              The hard part is not selling loans. It is operating the company behind them.
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Ownership adds licensing, reporting, oversight, evidence, policies, and deadlines
              that have to run correctly while production continues. Foundry makes that work
              visible, structured, and manageable before it becomes a distraction.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="steel-surface blueprint-frame overflow-hidden rounded-2xl p-2">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
                {realityItems.map((item) => (
                  <div
                    key={item}
                    className="bg-[#101010] px-4 py-5 text-sm font-medium tracking-wide text-zinc-300"
                  >
                    <span className="mr-2 text-[#FF6A00]">•</span>
                    {item}
                  </div>
                ))}
              </div>
              <p className="px-4 py-4 text-xs leading-relaxed text-zinc-500">
                The assessment clarifies which of these responsibilities matter for your current
                path, and what level of infrastructure would be required.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
