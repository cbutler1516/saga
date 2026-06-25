"use client";

import Link from "next/link";
import { FoundryMark } from "@/components/brand/FoundryMark";
import { ButtonLink } from "@/components/ui/button-link";
import { motion } from "@/lib/motion";
import type { AssessmentBlueprint } from "@/lib/assessment-blueprint";
import {
  type AssessmentAnswers,
  type AssessmentId,
  getAssessment,
} from "@/lib/assessment-config";

export type SubmissionResult = {
  assessmentId: AssessmentId;
  answers: AssessmentAnswers;
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

const foundryBuilds = [
  "Company licensing roadmap",
  "Policies & procedures",
  "Quality control framework",
  "Audit readiness",
  "Vendor coordination",
  "Compliance calendar",
  "Technology recommendations",
  "AI-powered workspace",
] as const;

const challengeDetails: Record<string, { title: string; body: string }> = {
  compliance: {
    title: "Compliance infrastructure",
    body: "Policies, oversight, testing, and evidence need to be designed before the company is under pressure.",
  },
  licensing: {
    title: "Licensing roadmap",
    body: "The right state sequence, NMLS steps, and timing can make the transition much smoother.",
  },
  cost: {
    title: "Startup economics",
    body: "Ownership should be evaluated against production, margin, operating expense, and realistic ramp timing.",
  },
  operations: {
    title: "Operational workflows",
    body: "Processing, reporting, vendor handoffs, and compliance ownership need clear lanes from day one.",
  },
  technology: {
    title: "Technology stack",
    body: "The systems behind origination, reporting, documents, and task management should support scale.",
  },
  processing: {
    title: "Processing model",
    body: "The borrower and referral-partner experience depends on repeatable workflows behind the scenes.",
  },
  "correspondent-lending": {
    title: "Correspondent readiness",
    body: "Warehouse, QC, seller documentation, and investor expectations require planning before conversations get serious.",
  },
  hiring: {
    title: "Hiring and capacity",
    body: "The company needs enough operating support without pulling you away from production too early.",
  },
  "where-to-start": {
    title: "First-step clarity",
    body: "The immediate question is not everything you need someday, but what should be clarified first.",
  },
};

function getAnswerLabel(result: SubmissionResult, questionId: string) {
  const question = getAssessment(result.assessmentId).questions.find(
    (item) => item.id === questionId,
  );
  const value = result.answers[questionId];
  if (!question || !value) return "";
  if (question.allowMultiple) {
    return value
      .split(",")
      .map((selection) => question.options.find((o) => o.value === selection)?.label)
      .filter(Boolean)
      .join(", ");
  }
  return question.options.find((option) => option.value === value)?.label ?? "";
}

function getSelections(result: SubmissionResult, questionId: string) {
  return (result.answers[questionId] ?? "").split(",").filter(Boolean);
}

function isHighProduction(result: SubmissionResult) {
  return ["51-100", "100-plus"].includes(result.answers["annual-production"]) ||
    ["75-150m", "150m-plus"].includes(result.answers["annual-volume"]);
}

function executiveSummary(result: SubmissionResult) {
  const confidence = Number(result.answers.confidence ?? 5);
  const timeline = getAnswerLabel(result, "timeline").toLowerCase();
  const obstacles = getSelections(result, "holding-back");
  const sentences = [
    isHighProduction(result)
      ? "Your production and volume suggest ownership could be financially realistic with the right operating structure behind it."
      : "Your answers suggest you are evaluating ownership thoughtfully before making a major business decision.",
    obstacles.length > 0
      ? "Your primary questions appear to be operational rather than purely production-related."
      : "You are asking the right questions before committing to a specific path.",
    timeline
      ? `Your timeline points to a ${timeline} posture, which helps frame the right level of planning.`
      : "",
    confidence >= 8
      ? "Your confidence suggests you are already thinking like an owner; the next step is infrastructure."
      : "The next step is getting clear on what would need to be built, handled, or delayed.",
  ];
  return sentences.filter(Boolean).slice(0, 4);
}

function opportunities(result: SubmissionResult) {
  const selected = getSelections(result, "holding-back");
  const items = [
    isHighProduction(result)
      ? {
          title: "Build equity instead of paying permanent splits.",
          body: "Your production may support a deeper look at whether ownership economics can work.",
        }
      : {
          title: "Clarify whether ownership is worth pursuing.",
          body: "The right first step is understanding the economics before making a commitment.",
        },
    Number(result.answers.confidence ?? 5) >= 7
      ? {
          title: "Control your own brand and customer experience.",
          body: "Your responses suggest you are already thinking beyond production alone.",
        }
      : {
          title: "Make the decision with more confidence.",
          body: "A structured roadmap can separate real blockers from solvable operating questions.",
        },
    selected.includes("correspondent-lending")
      ? {
          title: "Prepare for correspondent readiness over time.",
          body: "If that path makes sense, the foundation can be built in a staged, responsible way.",
        }
      : {
          title: "Create a business your family can own long-term.",
          body: "Ownership can become more than a production move when the operating foundation is sound.",
        },
  ];
  return items;
}

function challenges(result: SubmissionResult) {
  const selected = getSelections(result, "holding-back");
  const mapped = selected
    .map((value) => challengeDetails[value])
    .filter(Boolean);
  if (mapped.length > 0) return mapped;
  return result.focusAreas.slice(0, 3).map((item) => ({
    title: item,
    body: "This is worth discussing before making any major transition decision.",
  }));
}

function personalizedInsight(result: SubmissionResult) {
  const confidence = Number(result.answers.confidence ?? 5);
  if (confidence <= 4) {
    return "You're asking thoughtful questions before making a major decision. That's exactly what this process is designed for.";
  }
  if (confidence >= 8) {
    return "Your responses suggest you're already thinking like an owner. The next step is building the infrastructure behind that vision.";
  }
  if (isHighProduction(result)) {
    return "Based on your production, ownership may be financially realistic sooner than many professionals expect, provided the operating foundation is planned carefully.";
  }
  return "Your answers suggest ownership is worth exploring carefully, with the next conversation focused on what would need to be true for the move to make sense.";
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-white">
        {title}
      </h2>
    </div>
  );
}

function BriefingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`steel-surface blueprint-frame rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_30px_100px_-70px_rgba(0,0,0,0.95)] sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function ConfirmationView({ result }: { result: SubmissionResult }) {
  const summary = executiveSummary(result);
  const opportunityCards = opportunities(result);
  const challengeCards = challenges(result);
  const production = getAnswerLabel(result, "annual-production");
  const timeline = getAnswerLabel(result, "timeline");

  return (
    <div className="space-y-12 pb-4">
      <Reveal>
        <div className="border-b border-white/10 pb-10">
          <FoundryMark size="small" className="mb-8 opacity-50" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
            Executive Ownership Briefing
          </p>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-gradient">
            Your Ownership Readiness Review
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#E6E6E6]/90">
            Based on your answers, ownership appears to be a realistic path worth
            exploring carefully. This review is not a score; it is a starting
            point for a clear, confidential conversation.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <BriefingCard>
          <SectionHeader eyebrow="Briefing" title="Executive Summary" />
          <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-zinc-300">
            {summary.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {production ? (
              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Production
                </p>
                <p className="mt-2 text-sm font-medium text-white">{production}</p>
              </div>
            ) : null}
            {timeline ? (
              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Timeline
                </p>
                <p className="mt-2 text-sm font-medium text-white">{timeline}</p>
              </div>
            ) : null}
          </div>
        </BriefingCard>
      </Reveal>

      <Reveal delay={0.1}>
        <div>
          <SectionHeader title="Biggest Opportunities" />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {opportunityCards.map((item) => (
              <BriefingCard key={item.title} className="p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
                  Opportunity
                </p>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </BriefingCard>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div>
          <SectionHeader title="Areas That Need Planning" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {challengeCards.map((item) => (
              <BriefingCard key={item.title} className="p-5 sm:p-6">
                <div className="molten-line mb-4 h-px w-10" />
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </BriefingCard>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <BriefingCard>
          <SectionHeader title="What Foundry Would Build" />
          <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
            You don&apos;t have to build these yourself.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {foundryBuilds.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3"
              >
                <span className="text-[#FF6A00]" aria-hidden>
                  ✓
                </span>
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </BriefingCard>
      </Reveal>

      <Reveal delay={0.25}>
        <BriefingCard>
          <SectionHeader title="Personalized Insight" />
          <p className="mt-6 text-lg leading-relaxed text-[#E6E6E6]/90">
            {personalizedInsight(result)}
          </p>
        </BriefingCard>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="steel-surface blueprint-frame relative overflow-hidden rounded-3xl border border-[#FF6A00]/20 px-6 py-10 text-center shadow-[0_40px_120px_-70px_rgba(255,106,0,0.55)] sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="molten-line absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-[#FF6A00]/10 blur-[90px]" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <SectionHeader title="Let's Build Your Ownership Roadmap" />
            <p className="mt-6 text-base leading-relaxed text-zinc-300">
              In one confidential strategy session we&apos;ll review your current
              business, discuss startup costs, explain licensing requirements,
              identify operational needs, build a realistic transition timeline,
              and tell you honestly whether ownership makes sense.
            </p>
            <ButtonLink href="/contact" className="mt-8 min-h-[50px] w-full sm:w-auto">
              Schedule My Confidential Strategy Session
            </ButtonLink>
            <p className="mt-6 text-sm text-zinc-500">
              No obligation. No sales pressure. Just experienced guidance.
            </p>
          </div>
        </div>
      </Reveal>

      <p className="text-[13px] leading-relaxed text-[#A7A7A7]/80">
        This review is confidential and for planning purposes only. It is not
        legal or compliance advice, and does not guarantee any licensing,
        examination, or approval outcome.
      </p>

      <div className="flex justify-center border-t border-white/10 pt-8">
        <Link
          href="/assessment"
          className="inline-flex min-h-[44px] items-center justify-center text-sm tracking-wide text-[#A7A7A7]/70 transition-colors hover:text-[#E6E6E6]"
        >
          Try another path
        </Link>
      </div>
    </div>
  );
}
