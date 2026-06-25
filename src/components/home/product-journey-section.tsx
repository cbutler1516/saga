"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

const steps = [
  { label: "Assessment", detail: "Understand where you stand" },
  { label: "Ownership Summary", detail: "A clear, personalized picture" },
  { label: "Client Onboarding", detail: "Structured, guided setup" },
  { label: "Foundry Workspace", detail: "Your operating command center" },
  { label: "Foundry AI", detail: "Answers from your real posture" },
  { label: "Ongoing Compliance", detail: "Maintained continuously" },
];

export function ProductJourneySection() {
  return (
    <Section className="border-t border-white/[0.06] bg-[#050505]">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionLabel>The Foundry journey</SectionLabel>
          <SectionHeading className="mt-7">
            One continuous path — from question to{" "}
            <span className="text-molten">operating system.</span>
          </SectionHeading>
        </FadeIn>

        {/* Desktop horizontal progression */}
        <FadeIn delay={0.1} className="relative mt-16 hidden lg:block">
          <div
            className="molten-line absolute left-[8%] right-[8%] top-6 h-px opacity-60"
            aria-hidden
          />
          <ol className="grid grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <li key={step.label} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6A00]/30 bg-[#0c0e10] font-mono text-[12px] text-[#FF6A00] shadow-[0_0_18px_-6px_rgba(255,106,0,0.4)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-[15px] font-semibold leading-snug text-white">
                  {step.label}
                </h3>
                <p className="mt-2 text-[12px] leading-snug text-zinc-500">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        {/* Mobile / tablet vertical progression */}
        <ol className="mt-12 space-y-0 lg:hidden">
          {steps.map((step, i) => (
            <FadeIn key={step.label} delay={i * 0.05}>
              <li className="relative flex gap-5 py-5 pl-6">
                <span
                  className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-[#FF6A00]/45 via-[#FF6A00]/20 to-transparent"
                  aria-hidden
                />
                <span className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[#FF6A00]/40 bg-[#0c0e10] font-mono text-[10px] text-[#FF6A00]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-500">
                    {step.detail}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
