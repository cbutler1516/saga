import type { Metadata } from "next";
import Link from "next/link";
import { PlaybookCta } from "@/components/playbook/playbook-cta";
import { PageShell } from "@/components/site/page-shell";
import { ReadingProgress } from "@/components/library/reading-progress";
import {
  Checklist,
  ExecutiveSummary,
  FounderInsight,
  FrequentlyAskedQuestions,
  KeyTakeaways,
  NextStepCta,
  PillarSection,
  ProTip,
  RelatedGuides,
  Warning,
  slugifyHeading,
} from "@/components/library/pillar-components";

export const metadata: Metadata = {
  title: "The Complete Guide to Starting Your Own Mortgage Company (2026)",
  description:
    "Thinking about starting your own mortgage company? Learn the real costs, licensing requirements, compliance considerations, technology stack, operations, and launch process from experienced mortgage professionals.",
  keywords: [
    "start a mortgage company",
    "start a mortgage brokerage",
    "mortgage broker owner",
    "mortgage company licensing",
    "mortgage compliance",
    "correspondent mortgage",
    "mortgage broker startup",
    "own your own mortgage company",
  ],
};

const sections = [
  "Introduction",
  "Is Ownership Right for You?",
  "Understanding the Different Business Models",
  "What It Actually Costs",
  "Licensing & Regulatory Requirements",
  "Building Your Technology Stack",
  "Compliance Infrastructure",
  "Hiring Your First Team",
  "Creating Your Brand",
  "Choosing Broker vs Correspondent",
  "The First 90 Days",
  "Common Mistakes",
  "Frequently Asked Questions",
  "Final Thoughts",
  "Ownership Readiness Review CTA",
] as const;

const relatedGuides = [
  {
    title: "How Much Does It Cost?",
    href: "/library/mortgage-company-startup-costs",
    description: "Placeholder related guide card for startup cost planning.",
  },
  {
    title: "Broker vs Correspondent",
    href: "/library/building-a-scalable-mortgage-company",
    description: "Placeholder related guide card for channel decisions.",
  },
  {
    title: "Compliance Guide",
    href: "/library/compliance-infrastructure-for-new-mortgage-companies",
    description: "Placeholder related guide card for compliance infrastructure.",
  },
  {
    title: "First 90 Days",
    href: "/library/from-producer-to-owner",
    description: "Placeholder related guide card for launch sequencing.",
  },
  {
    title: "Technology Stack",
    href: "/library/choosing-a-mortgage-technology-stack",
    description: "Placeholder related guide card for systems and workflows.",
  },
  {
    title: "AI for Mortgage Companies",
    href: "/library/ai-in-mortgage-compliance-workflows",
    description: "Placeholder related guide card for responsible AI use.",
  },
];

const faqItems = [
  {
    question: "Placeholder: How much volume do I need before ownership makes sense?",
    answer:
      "Placeholder content. This answer will later explain how production, margin, fixed costs, and support needs should be evaluated together.",
  },
  {
    question: "Placeholder: How long does licensing usually take?",
    answer:
      "Placeholder content. This answer will later describe state sequencing, documentation, bonds, NMLS steps, and realistic timing ranges.",
  },
  {
    question: "Placeholder: Should I start as a broker or correspondent lender?",
    answer:
      "Placeholder content. This answer will later compare operating complexity, capital requirements, QC, warehouse expectations, and timing.",
  },
];

function PlaceholderCopy({ topic }: { topic: string }) {
  return (
    <div className="space-y-5 text-[17px] leading-[1.85] text-zinc-400">
      <p>
        Placeholder content for <strong className="font-medium text-zinc-200">{topic}</strong>.
        This section will be replaced with the final flagship guide copy.
      </p>
      <p>
        Placeholder content should preserve the intended reading rhythm: short
        paragraphs, specific examples, executive-level framing, and practical
        guidance for experienced mortgage professionals evaluating ownership.
      </p>
    </div>
  );
}

export default function CompleteGuideStartingMortgageCompanyPage() {
  return (
    <PageShell>
      <ReadingProgress />
      <article className="relative">
        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute inset-0">
            <div className="grid-bg absolute inset-0 opacity-20" />
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.07] blur-[130px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
            <Link
              href="/library"
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              ← Foundry Library
            </Link>
            <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
              Flagship Guide · 2026
            </p>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(3.25rem,8vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-gradient">
              The Complete Guide to Starting Your Own Mortgage Company
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl lg:leading-[1.7]">
              Placeholder introduction. This flagship guide framework is ready
              for final editorial content on costs, licensing, compliance,
              operations, technology, and launch sequencing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-500">
              <span>Estimated 28 min read</span>
              <span aria-hidden>·</span>
              <span>Definitive ownership guide</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8 lg:py-24">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                Contents
              </p>
              <nav className="mt-5 space-y-3">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${slugifyHeading(section)}`}
                    className="block text-sm leading-relaxed text-zinc-500 transition-colors hover:text-white"
                  >
                    {section}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <ExecutiveSummary>
              <p>
                Placeholder content. This executive summary will become the
                high-level briefing for mortgage professionals evaluating
                whether to start their own company.
              </p>
              <p>
                Placeholder content. It will summarize the decision, the risks,
                the operating requirements, and the first practical next step.
              </p>
            </ExecutiveSummary>

            <PillarSection id="introduction" eyebrow="Start Here" title="Introduction">
              <PlaceholderCopy topic="Introduction" />
              <FounderInsight>
                Placeholder founder insight. This will later provide a concise,
                experience-based observation about the ownership decision.
              </FounderInsight>
            </PillarSection>

            <PillarSection
              id="is-ownership-right-for-you"
              title="Is Ownership Right for You?"
            >
              <PlaceholderCopy topic="Is Ownership Right for You?" />
              <KeyTakeaways
                items={[
                  "Placeholder takeaway about production and ownership fit.",
                  "Placeholder takeaway about operating readiness.",
                  "Placeholder takeaway about transition timing.",
                ]}
              />
            </PillarSection>

            <PillarSection
              id="understanding-the-different-business-models"
              title="Understanding the Different Business Models"
            >
              <PlaceholderCopy topic="Business Models" />
              <ProTip>
                Placeholder pro tip. This will later explain how business model
                choice changes licensing, capital, operations, and risk.
              </ProTip>
            </PillarSection>

            <PillarSection id="what-it-actually-costs" title="What It Actually Costs">
              <PlaceholderCopy topic="Startup Costs" />
              <Checklist
                title="Download Checklist Placeholder"
                items={[
                  "Placeholder checklist item for one-time launch costs.",
                  "Placeholder checklist item for recurring operating costs.",
                  "Placeholder checklist item for working capital planning.",
                ]}
              />
            </PillarSection>

            <div className="my-12">
              <NextStepCta />
            </div>

            <PillarSection
              id="licensing-regulatory-requirements"
              title="Licensing & Regulatory Requirements"
            >
              <PlaceholderCopy topic="Licensing & Regulatory Requirements" />
              <Warning>
                Placeholder warning. This will later call out a common licensing
                sequencing mistake without using fear-based language.
              </Warning>
            </PillarSection>

            <PillarSection
              id="building-your-technology-stack"
              title="Building Your Technology Stack"
            >
              <PlaceholderCopy topic="Technology Stack" />
            </PillarSection>

            <PillarSection
              id="compliance-infrastructure"
              title="Compliance Infrastructure"
            >
              <PlaceholderCopy topic="Compliance Infrastructure" />
              <Checklist
                title="Infrastructure Checklist Placeholder"
                items={[
                  "Placeholder checklist item for policies and procedures.",
                  "Placeholder checklist item for QC and evidence.",
                  "Placeholder checklist item for compliance calendar ownership.",
                ]}
              />
            </PillarSection>

            <PillarSection id="hiring-your-first-team" title="Hiring Your First Team">
              <PlaceholderCopy topic="Hiring Your First Team" />
            </PillarSection>

            <PillarSection id="creating-your-brand" title="Creating Your Brand">
              <PlaceholderCopy topic="Creating Your Brand" />
            </PillarSection>

            <PillarSection
              id="choosing-broker-vs-correspondent"
              title="Choosing Broker vs Correspondent"
            >
              <PlaceholderCopy topic="Broker vs Correspondent" />
              <ProTip>
                Placeholder pro tip. This will later compare broker flexibility
                with correspondent complexity and economics.
              </ProTip>
            </PillarSection>

            <PillarSection id="the-first-90-days" title="The First 90 Days">
              <PlaceholderCopy topic="The First 90 Days" />
              <Checklist
                title="First 90 Days Checklist Placeholder"
                items={[
                  "Placeholder checklist item for first 30 days.",
                  "Placeholder checklist item for first 60 days.",
                  "Placeholder checklist item for first 90 days.",
                ]}
              />
            </PillarSection>

            <PillarSection id="common-mistakes" title="Common Mistakes">
              <div className="grid gap-3">
                {[
                  "Placeholder common mistake about underestimating compliance.",
                  "Placeholder common mistake about startup costs.",
                  "Placeholder common mistake about technology sequencing.",
                  "Placeholder common mistake about correspondent readiness.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[15px] leading-relaxed text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </PillarSection>

            <PillarSection
              id="frequently-asked-questions"
              title="Frequently Asked Questions"
            >
              <FrequentlyAskedQuestions items={faqItems} />
            </PillarSection>

            <PillarSection id="final-thoughts" title="Final Thoughts">
              <PlaceholderCopy topic="Final Thoughts" />
              <PlaybookCta compact />
            </PillarSection>

            <PillarSection
              id="ownership-readiness-review-cta"
              title="Ownership Readiness Review CTA"
            >
              <NextStepCta />
            </PillarSection>

            <PillarSection id="related-guides" title="Related Guides">
              <RelatedGuides guides={relatedGuides} />
            </PillarSection>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
