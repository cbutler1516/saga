"use client";

import { Container, FadeIn, Section } from "@/components/ui/section";

const proofPoints = [
  {
    title: "Compliance First",
    description:
      "Licensing, policies, reporting, and exam readiness — built and maintained to regulatory standard.",
  },
  {
    title: "Built to Scale",
    description:
      "Infrastructure that grows with your states, loan officers, and volume — without breaking under scrutiny.",
  },
  {
    title: "Expert Guidance",
    description:
      "Built by people who have sat on both sides of the examination table.",
  },
];

export function ProofPointsSection() {
  return (
    <Section className="border-t border-white/10 py-16 md:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {proofPoints.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-white/10 bg-[#101010] p-8">
                <div className="mb-4 h-px w-10 bg-[#FF6A00]/60" />
                <h3 className="text-lg font-semibold text-[#E6E6E6]">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A7A7A7]">
                  {point.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
