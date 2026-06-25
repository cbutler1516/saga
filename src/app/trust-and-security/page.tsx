import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { AuditShield } from "@/components/visual/audit-shield";
import { NeuralSphere } from "@/components/visual/neural-sphere";
import { trustPoints } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Trust & Security — Foundry",
  description:
    "Built for due diligence from day one. Responsible AI. Framework-aligned information security.",
};

export default function TrustAndSecurityPage() {
  return (
    <PageShell>
      <PageHero
        label="Trust & security"
        title="Built for the scrutiny our clients face."
        description="Our buyers are regulated companies that will scrutinize any vendor. This was built by people who understand that scrutiny — architecture, access controls, and documentation designed to pass a vendor risk assessment."
      />

      <PageSection>
        <div className="max-w-[52ch] text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
          <p>
            A short, confident trust posture signals that this was built by
            people who understand vendor due diligence — because our clients
            are mortgage companies subject to the same regulatory oversight we
            help them navigate.
          </p>
        </div>

        <div className="steel-surface blueprint-frame mt-16 divide-y divide-white/5 overflow-hidden rounded-2xl">
          {trustPoints.map((item, i) => (
            <div key={item.title} className="px-8 py-10 lg:px-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[48px_1fr] lg:gap-10">
                <span className="font-mono text-[12px] text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[15px] font-medium tracking-wide text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.75] text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden rounded-2xl glass-card p-8 lg:p-10">
            <NeuralSphere
              className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-60 lg:h-36 lg:w-36"
            />
            <SectionLabel>Responsible AI</SectionLabel>
            <SerifHeading className="mt-8 max-w-[18ch]" as="h3">
              AI that accelerates — never replaces — judgment.
            </SerifHeading>
            <p className="mt-8 text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
              AI accelerates compliance work — document review, pattern
              detection, regulatory change mapping. It does not replace human
              judgment on matters that affect borrowers or regulatory
              outcomes. Borrower-level data is never handed to third-party AI
              tools, and every AI-assisted judgment has human review.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl glass-card p-8 lg:p-10">
            <AuditShield className="pointer-events-none absolute -right-2 -top-4 h-28 w-24 opacity-60 lg:h-36 lg:w-32" />
            <SectionLabel>Vendor due diligence</SectionLabel>
            <SerifHeading className="mt-8 max-w-[18ch]" as="h3">
              Ready when your compliance team asks.
            </SerifHeading>
            <p className="mt-8 text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
              Architecture, access controls, and documentation are designed to
              pass a vendor risk assessment from day one. Information-security
              practices are aligned to recognized standards, with privacy and
              data handling treated as first-class — not bolted on after the
              fact.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <ContactCta />
      </PageSection>
    </PageShell>
  );
}
