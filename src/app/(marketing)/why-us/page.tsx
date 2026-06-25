import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { BlueprintOverlay } from "@/components/visual/blueprint-overlay";
import { credibilityPoints, founders, siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Why Foundry — Operating Partner for Mortgage Company Owners",
  description:
    "Foundry helps experienced mortgage professionals evaluate ownership and build operational infrastructure — with regulatory perspective, compliance leadership, and ongoing support.",
  keywords: [...siteKeywords],
};

export default function WhyUsPage() {
  return (
    <PageShell>
      <PageHero
        label="Why Foundry"
        title="An operating partner for professionals who take ownership seriously."
        description="Leadership with regulatory examination experience and deep operating experience building compliance programs — helping you evaluate the path and build infrastructure responsibly."
        atmosphere={{
          type: "video",
          src: "/video/scale-framework.mp4",
        }}
      />

      <PageSection>
        <div className="max-w-[52ch] space-y-7 text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
          <p>
            Foundry works with serious mortgage professionals — not to push a
            single outcome, but to provide clarity, structure, and ongoing
            support when ownership or expansion is the right fit.
          </p>
          <p>
            We turn hard-won regulatory and operating experience into
            infrastructure you can rely on — designed for stewardship and
            readiness, not shortcuts or shelf templates.
          </p>
        </div>

        <div className="steel-surface blueprint-frame mt-16 overflow-hidden rounded-2xl">
          <div className="border-b border-white/5 bg-white/[0.02] px-8 py-5 lg:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Who built this
            </p>
          </div>
          <div className="grid lg:grid-cols-2">
            {founders.map((founder, i) => (
              <div
                key={founder.role}
                className={`px-8 py-10 lg:px-10 lg:py-12 ${
                  i === 0 ? "lg:border-r lg:border-white/5" : ""
                }`}
              >
                <div className="molten-line h-px w-10" />
                <h2 className="mt-5 text-xl font-semibold text-white">
                  {founder.role}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-zinc-400">
                  {founder.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <BlueprintOverlay intensity="subtle" />
        <SectionLabel>What sets us apart</SectionLabel>
        <SerifHeading className="mt-8 max-w-[24ch]">
          Infrastructure for serious mortgage professionals.
        </SerifHeading>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {credibilityPoints.map((item) => (
            <div
              key={item.title}
              className="forge-card blueprint-frame rounded-2xl p-8 lg:p-10"
            >
              <div className="molten-line h-px w-10" />
              <h3 className="mt-5 text-[15px] font-medium tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <ContactCta />
      </PageSection>
    </PageShell>
  );
}
