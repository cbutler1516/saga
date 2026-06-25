"use client";

import { motion } from "@/lib/motion";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

const steps = [
  {
    title: "Assess",
    description: "Understand your licensing footprint, compliance gaps, and readiness to go independent.",
  },
  {
    title: "Stand Up",
    description: "Entity formation, state licensing, policies, CMS, and day-one operational readiness.",
  },
  {
    title: "Operate & Maintain",
    description: "Ongoing compliance management, control testing, and regulatory reporting on schedule.",
  },
  {
    title: "Stay Exam Ready",
    description: "Evidence packages, documentation, and monitoring so examinations are never a surprise.",
  },
  {
    title: "Grow",
    description: "Multi-state expansion, correspondent preparation, and scaling without losing control.",
  },
];

export function JourneySection() {
  return (
    <Section className="border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
      <Container className="relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>The path to independence</SectionLabel>
          <SectionHeading className="mt-6">
            A clear path from{" "}
            <span className="text-gradient-accent">assessment to growth.</span>
          </SectionHeading>
        </FadeIn>

        {/* Desktop timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#050508]">
                  <span className="text-xs font-mono text-indigo-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="absolute left-[calc(50%+24px)] top-6 h-px w-[calc(100%-48px)] origin-left bg-gradient-to-r from-indigo-500/50 to-violet-500/50"
                  />
                )}
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="mt-12 space-y-0 lg:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-6 border-l border-white/10 py-6 pl-8"
            >
              <div className="absolute -left-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-indigo-500/30 bg-[#050508]">
                <span className="text-[10px] font-mono text-indigo-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
