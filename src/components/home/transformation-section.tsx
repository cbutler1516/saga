"use client";

import { motion } from "@/lib/motion";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

const beforeItems = [
  "Sponsored — infrastructure owned elsewhere",
  "Spreadsheet compliance and policy gaps",
  "Exam anxiety with no evidence trail",
  "Regulatory reporting as a scramble",
];

const afterItems = [
  "Independent — with compliance infrastructure in place",
  "Policies, CMS, and control testing maintained",
  "Exam-ready documentation on demand",
  "Reporting filed on schedule, every cycle",
];

export function TransformationSection() {
  return (
    <Section className="border-t border-white/5 bg-[#050508]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>The transformation</SectionLabel>
          <SectionHeading className="mt-6">
            From sponsorship to{" "}
            <span className="text-gradient-accent">operating with confidence.</span>
          </SectionHeading>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-950/10 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-400">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-medium uppercase tracking-wider text-red-400">
                Before Saga
              </span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-zinc-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                  After Saga
                </span>
              </div>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
