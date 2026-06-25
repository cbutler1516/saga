"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { getAssessmentList } from "@/lib/assessment-config";
import type { AssessmentId } from "@/lib/assessment-config";

function PathIcon({ id }: { id: AssessmentId }) {
  if (id === "independence") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M11 2L13.5 8.5H20L14.75 12.5L16.75 19L11 15.25L5.25 19L7.25 12.5L2 8.5H8.5L11 2Z"
          stroke="#FFB000"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "existing-broker") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="8" width="16" height="11" rx="1" stroke="#A7A7A7" strokeWidth="1.2" />
        <path d="M7 8V6C7 4.343 8.343 3 10 3H12C13.657 3 15 4.343 15 6V8" stroke="#FF6A00" strokeWidth="1.2" />
        <path d="M3 12H19" stroke="#A7A7A7" strokeWidth="1.2" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M4 16L11 5L18 16" stroke="#A7A7A7" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 16H14" stroke="#FF6A00" strokeWidth="1.2" />
      <circle cx="11" cy="16" r="1.5" fill="#FFB000" />
    </svg>
  );
}

export function ThreePathsSection() {
  const paths = getAssessmentList();

  return (
    <Section className="border-t border-white/[0.06]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>Explore your path</SectionLabel>
          <SectionHeading className="mt-6">
            Choose the assessment that fits{" "}
            <span className="text-gradient-accent">where you are today.</span>
          </SectionHeading>
          <p className="mt-6 text-lg text-[#A7A7A7]">
            Each path is confidential and educational — a simple summary of
            where you stand and what a responsible next step could look like.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {paths.map((path, i) => (
            <FadeIn key={path.id} delay={i * 0.08}>
              <div className="forge-card relative flex h-full flex-col overflow-hidden rounded-xl p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6A00]/50 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF6A00]/[0.04] via-transparent to-transparent" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <PathIcon id={path.id} />
                    <div className="h-px flex-1 bg-gradient-to-r from-[#FF6A00]/40 to-transparent" />
                  </div>
                  <span className="mt-4 block font-mono text-[11px] text-[#A7A7A7]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-[#E6E6E6]">
                    {path.cardTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A7A7A7]">
                    {path.cardDescription}
                  </p>
                  <div className="mt-6 border-t border-white/[0.06] pt-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
                      You receive
                    </p>
                    <ul className="mt-3 space-y-2">
                      {path.outcomes.map((outcome) => (
                        <li key={outcome} className="text-sm text-[#E6E6E6]/90">
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-[#A7A7A7]/70">
                      ~{path.estimatedMinutes} minutes · Confidential
                    </p>
                  </div>
                  <Link
                    href={`/assessment/${path.slug}`}
                    className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-[#E6E6E6] transition-colors hover:border-[#FF6A00]/25 hover:bg-[#FF6A00]/[0.06] sm:w-auto"
                  >
                    {path.ctaLabel}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <ButtonLink
            href="/assessment"
            className="min-h-[44px] w-full sm:w-auto"
          >
            Find Out If You&apos;re Ready
          </ButtonLink>
        </FadeIn>
      </Container>
    </Section>
  );
}
