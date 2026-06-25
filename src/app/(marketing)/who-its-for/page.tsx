import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { BlueprintOverlay } from "@/components/visual/blueprint-overlay";
import { audiences, siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Who It's For — Professionals Exploring Ownership",
  description:
    "Foundry is for experienced mortgage professionals evaluating ownership and for broker owners strengthening compliance, reporting, and operational readiness.",
  keywords: [...siteKeywords],
};

export default function WhoItsForPage() {
  return (
    <PageShell>
      <PageHero
        label="Who it's for"
        title="For professionals evaluating ownership — and owners strengthening what they have built."
        description="Foundry supports experienced producers exploring company ownership and broker owners who want structured help with compliance, reporting, and operational readiness."
        atmosphere={{ type: "video", src: "/video/independence-blueprint.mp4" }}
      />

      <PageSection>
        <SectionLabel>The bigger idea</SectionLabel>
        <SerifHeading className="mt-8 max-w-[26ch]">
          Can you sell? Probably. Can you operate? That is the question worth
          answering first.
        </SerifHeading>
        <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
          Many experienced loan officers and broker owners are capable of
          building strong companies. Foundry helps you understand what
          operating responsibly would involve — and provides structure when you
          decide to move forward.
        </p>
      </PageSection>

      <PageSection>
        <BlueprintOverlay intensity="subtle" />
        <SectionLabel>Two starting points</SectionLabel>
        <SerifHeading className="mt-8 max-w-[18ch]">
          Where you are — and what Foundry helps with.
        </SerifHeading>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="forge-card flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="border-b border-white/5 px-8 py-7 lg:px-10">
                <h2 className="text-xl font-semibold text-white">
                  {audience.title}
                </h2>
              </div>
              <div className="flex flex-1 flex-col px-8 py-8 lg:px-10">
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    The situation
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.75] text-zinc-400">
                    {audience.block}
                  </p>
                </div>
                <div className="mt-10 border-t border-white/5 pt-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    How Foundry helps
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.75] text-zinc-300">
                    {audience.unblock}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <ContactCta />
      </PageSection>
    </PageShell>
  );
}
