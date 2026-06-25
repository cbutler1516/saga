import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { journeySteps, siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "How It Works — Assess, Build, Maintain, Stay Ready, Grow",
  description:
    "How Foundry works: assess your situation, build the infrastructure, maintain ongoing operations, stay ready for growth and examinations, and expand when the time is right.",
  keywords: [...siteKeywords],
};

export default function HowItWorksPage() {
  return (
    <PageShell>
      <PageHero
        label="How it works"
        title="Assess. Build. Maintain. Stay Ready. Grow."
        description="A continuous operating relationship — not a one-time project. We learn your situation, stand up what the company needs, support it ongoing, keep you ready, and help you grow when the time is right."
      />

      <PageSection
        atmosphere={{ type: "video", src: "/video/blueprint-preview.mp4" }}
      >
        <SectionLabel>The journey</SectionLabel>
        <SerifHeading className="mt-8 max-w-[20ch]">
          Five steps. One operating partner.
        </SerifHeading>
        <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
          You stay focused on production and leadership. Foundry helps build and
          maintain the infrastructure behind the company — from first assessment
          through ongoing support and growth.
        </p>

        <div className="mt-20">
          <JourneyTimeline steps={[...journeySteps]} />
        </div>
      </PageSection>

      <PageSection>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-20">
          <div>
            <SectionLabel>Correspondent readiness</SectionLabel>
            <SerifHeading className="mt-8 max-w-[20ch]">
              When you are ready for the next level of margin and control.
            </SerifHeading>
            <div className="mt-10 space-y-7 text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
              <p>
                Many owners want to move beyond brokering into correspondent
                lending — funding and closing in their own name and keeping more
                margin. That move requires stronger controls, documentation, and
                approval readiness.
              </p>
              <p>
                Foundry helps prepare the compliance program, quality-control
                plan, and documentation that warehouse lenders and correspondent
                investors expect — so you can pursue correspondent mortgage
                readiness with confidence.
              </p>
              <p className="font-medium text-zinc-300">
                We describe this capability generically. Preparation does not
                imply any specific warehouse, investor, or approval outcome.
              </p>
            </div>
          </div>
          <aside className="steel-surface blueprint-frame mt-16 rounded-2xl p-8 lg:mt-24">
            <div className="molten-line mb-6 h-px w-10" />
            <p className="text-xl font-semibold leading-snug text-white">
              Growth is not just adding LOs. It is building a company that can
              scale.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              New states, new warehouse relationships, and correspondent entry
              each require an operating model that holds up under scrutiny.
            </p>
          </aside>
        </div>
      </PageSection>

      <PageSection>
        <ContactCta />
      </PageSection>
    </PageShell>
  );
}
