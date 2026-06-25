"use client";

import Link from "next/link";
import { FoundryMark } from "@/components/brand/FoundryMark";
import { ButtonLink } from "@/components/ui/button-link";
import type { AssessmentBlueprint } from "@/lib/assessment-blueprint";

export type SubmissionResult = {
  score: number;
  tier: string;
  tierHeadline: string;
  tierSummary: string;
  strengths: string[];
  focusAreas: string[];
  priorityActions: string[];
  nextSteps: string[];
  maxScore: number;
  scoreLabel: string;
  blueprintTitle: string;
  deliverableName: string;
  blueprint: AssessmentBlueprint;
  contactEmail?: string;
};

export function ConfirmationView({
  result,
}: {
  result: SubmissionResult;
}) {
  const emailSummaryHref = result.contactEmail
    ? `mailto:hello@saga.com?subject=${encodeURIComponent("Email My Summary")}&body=${encodeURIComponent(`Please email my ownership summary to ${result.contactEmail}.`)}`
    : "mailto:hello@saga.com?subject=Email%20My%20Summary";

  return (
    <div>
      <FoundryMark size="small" className="mb-8 opacity-50" />
      <div className="mb-12 border-b border-white/10 pb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          {result.deliverableName}
        </p>
        <h1 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#E6E6E6]">
          {result.tierHeadline}
        </h1>
        <p className="mt-6 text-base leading-[1.75] text-[#E6E6E6]/90">
          {result.tierSummary}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101010]">
        <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
            Your current position
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A7A7A7]">
            {result.blueprint.currentState}
          </p>
        </div>

        {result.strengths.length > 0 ? (
          <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
              What looks strong
            </p>
            <ul className="mt-6 space-y-3">
              {result.strengths.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-[#E6E6E6]/90"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB000]/70"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-0 divide-y divide-white/5 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
              What could slow you down
            </p>
            <ul className="mt-6 space-y-3">
              {result.focusAreas.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-[#A7A7A7]"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB000]/70"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
              What we&apos;d tackle first
            </p>
            <ul className="mt-6 space-y-3">
              {result.priorityActions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-[#E6E6E6]/90"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
            Suggested next step
          </p>
          <ul className="mt-6 space-y-4">
            {result.nextSteps.map((step) => (
              <li
                key={step}
                className="flex gap-3 text-[15px] leading-relaxed text-[#A7A7A7]"
              >
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB000]/70"
                  aria-hidden="true"
                />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-[13px] leading-relaxed text-[#A7A7A7]/80">
        This summary is confidential and for planning purposes only. It is not
        legal or compliance advice, and does not guarantee any licensing,
        examination, or approval outcome.
      </p>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
        <ButtonLink href="/contact" className="min-h-[44px] w-full sm:w-auto">
          Talk Through My Options
        </ButtonLink>
        <a
          href={emailSummaryHref}
          className="inline-flex min-h-[44px] w-full items-center justify-center text-sm tracking-wide text-[#A7A7A7] transition-colors hover:text-[#E6E6E6] sm:w-auto"
        >
          Email Me My Summary
        </a>
        <Link
          href="/assessment"
          className="inline-flex min-h-[44px] w-full items-center justify-center text-sm tracking-wide text-[#A7A7A7]/70 transition-colors hover:text-[#E6E6E6] sm:ml-auto sm:w-auto"
        >
          Try another path
        </Link>
      </div>
    </div>
  );
}
