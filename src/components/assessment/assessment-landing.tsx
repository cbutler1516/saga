import Link from "next/link";
import { PageContainer } from "@/components/site/page-container";
import {
  assessmentLanding,
  getAssessmentList,
  type AssessmentDefinition,
  type AssessmentId,
} from "@/lib/assessment-config";

const pathDisplay: Record<
  AssessmentId,
  { bestFor: string; learnItems: string[] }
> = {
  independence: {
    bestFor: "High-producing LOs or branch managers",
    learnItems: [
      "Whether ownership is realistic for you",
      "What might slow you down",
      "Your suggested next step",
    ],
  },
  "existing-broker": {
    bestFor: "Broker owners who want support",
    learnItems: [
      "Where your operation looks strong",
      "What could use attention",
      "Practical next steps for your setup",
    ],
  },
  correspondent: {
    bestFor: "Owners considering warehouse or correspondent lending",
    learnItems: [
      "How ready you are for correspondent",
      "What to strengthen first",
      "A realistic path forward",
    ],
  },
};

const trustItems = [
  "Confidential",
  "Advisory only",
  "No obligation",
  "No partner approval implied",
] as const;

function PathCard({
  card,
  primary = false,
}: {
  card: AssessmentDefinition;
  primary?: boolean;
}) {
  const display = pathDisplay[card.id];

  return (
    <Link
      href={`/assessment/${card.slug}`}
      className={`forge-card group relative flex h-full flex-col overflow-hidden rounded-2xl ${
        primary
          ? "border-[#FF6A00]/40 shadow-[0_0_40px_-6px_rgba(255,106,0,0.18)]"
          : ""
      }`}
    >
      <div
        className={`h-px w-full ${
          primary
            ? "bg-gradient-to-r from-transparent via-[#FF6A00]/80 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#FF6A00]/35 to-transparent"
        }`}
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="mb-3 min-h-[16px]">
          {primary ? (
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
              Recommended starting point
            </p>
          ) : null}
        </div>

        <h3 className="text-lg font-semibold tracking-[-0.01em] text-white lg:text-xl">
          {card.cardTitle}
        </h3>

        <div className="mt-4 border-t border-white/[0.08] pt-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Best for
          </p>
          <p className="mt-1.5 text-[14px] leading-snug text-zinc-300">
            {display.bestFor}
          </p>
        </div>

        <div className="mt-4 flex-1 border-t border-white/[0.08] pt-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            What you&apos;ll learn
          </p>
          <ul className="mt-3 space-y-2">
            {display.learnItems.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14px] leading-snug text-zinc-400"
              >
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#FFB000]/70"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <p className="text-[12px] text-zinc-500">
            ~{card.estimatedMinutes} minutes · {card.questions.length} questions
          </p>
          <span
            className={`mt-3 flex min-h-[44px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
              primary
                ? "bg-[#FF6A00] text-[#050505] group-hover:bg-[#FF7A1A]"
                : "border border-white/10 bg-[#141414] text-[#E6E6E6] group-hover:border-[#FF6A00]/30 group-hover:bg-[#FF6A00]/5"
            }`}
          >
            {card.ctaLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function AssessmentLanding() {
  const cards = getAssessmentList();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/25 to-transparent" />
      </div>

      <PageContainer className="relative z-10 max-w-6xl px-4 pb-8 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:pb-16 lg:pt-8">
        <header className="text-center">
          <h1 className="mx-auto max-w-[22ch] text-[clamp(1.625rem,3.5vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-gradient">
            {assessmentLanding.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-snug text-[#A7A7A7] md:text-[15px] md:leading-relaxed">
            {assessmentLanding.subtitle}
          </p>
          <p className="mx-auto mt-2 text-xs leading-snug text-zinc-500 md:text-[13px]">
            {assessmentLanding.supportLine}
          </p>
        </header>

        <div className="mt-4 text-center sm:mt-6 lg:mt-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
            Choose your path
          </p>
          <h2 className="mx-auto mt-2 max-w-[28ch] text-base font-semibold leading-snug tracking-[-0.01em] text-white md:text-lg">
            Pick the assessment that matches where you are today
          </h2>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-6 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, index) => (
            <PathCard key={card.id} card={card} primary={index === 0} />
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#101010]/60 backdrop-blur-sm lg:mt-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
          <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex min-h-[44px] items-center justify-center px-3 py-3 text-center sm:px-6 sm:py-4"
              >
                <span className="text-[11px] font-medium leading-snug tracking-wide text-zinc-400 sm:text-[13px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
