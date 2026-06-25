"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { NeuralSphere } from "@/components/visual/neural-sphere";
import { BrowserFrame } from "./browser-frame";

const conversation = [
  {
    role: "user" as const,
    text: "Am I ready for a Washington audit?",
  },
  {
    role: "ai" as const,
    text: "You're in strong shape for Washington. Your compliance manual, MCR filings, and QC plan are current, and your last internal review had no open findings. Two things I'd confirm before you'd be fully exam-ready:",
    points: [
      "Refresh the AML policy — the current version predates this year's update.",
      "Document the June QC sample selection so the methodology is on file.",
    ],
  },
];

const suggestions = [
  "What policies should I update?",
  "What is due this month?",
  "Draft a response to a WA examiner request.",
];

export function FoundryAiSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionLabel>Foundry AI Preview</SectionLabel>
          <SectionHeading className="mt-7">
            Answers that start from your actual operating posture.
          </SectionHeading>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Ask plain questions about your company. Foundry AI answers from your
            actual compliance posture — and always defers to human judgment.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 md:mt-16">
          <BrowserFrame
            url="app.foundry.com/assistant"
            className="mx-auto max-w-3xl ring-1 ring-[#FF6A00]/10"
          >
            {/* Assistant header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
              <NeuralSphere className="h-9 w-9 shrink-0" />
              <div>
                <p className="text-[13px] font-semibold text-white">Foundry AI</p>
                <p className="text-[11px] text-emerald-300/80">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                  Connected to your workspace
                </p>
              </div>
              </div>
              <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] text-zinc-500 sm:inline-flex">
                Human-reviewed guidance
              </span>
            </div>

            {/* Conversation */}
            <div className="space-y-5 px-5 py-6 sm:px-8">
              {conversation.map((msg) =>
                msg.role === "user" ? (
                  <div key={msg.text} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-b from-[#FF7A1A] to-[#FF6A00] px-4 py-2.5 text-[14px] font-medium text-[#0A0A0A]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.text} className="flex gap-3">
                    <NeuralSphere className="mt-0.5 h-7 w-7 shrink-0" />
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <p className="text-[14px] leading-relaxed text-zinc-200">
                        {msg.text}
                      </p>
                      {msg.points ? (
                        <ul className="mt-3 space-y-2">
                          {msg.points.map((p) => (
                            <li key={p} className="flex gap-2.5 text-[13px] leading-snug text-zinc-400">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FFB000]/70" aria-hidden />
                              {p}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Suggestions + input (decorative) */}
            <div className="border-t border-white/[0.06] px-5 py-4 sm:px-8">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12px] text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070809] px-4 py-3">
                <span className="flex-1 text-[13px] text-zinc-600">
                  Ask Foundry anything about your company…
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-[#FF7A1A] to-[#FF6A00] text-[#0A0A0A]"
                  aria-hidden
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h9M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-center text-[11px] text-zinc-600">
                Foundry AI accelerates judgment — it never replaces human review.
              </p>
            </div>
          </BrowserFrame>
        </FadeIn>
      </Container>
    </Section>
  );
}
