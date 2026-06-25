import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { StructuralFramework } from "@/components/visual/structural-framework";
import { services, siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "What We Do — Mortgage Broker Compliance & Licensing Support",
  description:
    "What Foundry takes off your plate: mortgage company licensing, NMLS licensing, policies and procedures, mortgage call reports, HMDA reporting, compliance control testing, exam readiness, and correspondent preparation.",
  keywords: [...siteKeywords],
};

export default function WhatWeDoPage() {
  return (
    <PageShell>
      <PageHero
        label="What we do"
        title="Operational and compliance infrastructure — thoughtfully supported."
        description="You stay focused on clients, referral partners, production, and leadership. Foundry helps evaluate, stand up, and support the infrastructure that lets a mortgage company run properly."
        atmosphere={{ type: "video", src: "/video/precision-engine.mp4" }}
      />

      <PageSection>
        <div className="max-w-[52ch] text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
          <p>
            These are not features on a menu. They are the work behind the loan
            that has to run properly while you keep selling — licensing,
            policies, reporting, oversight, and readiness, maintained as your
            company grows.
          </p>
        </div>

        <div className="steel-surface blueprint-frame mt-16 divide-y divide-white/5 overflow-hidden rounded-2xl">
          {services.map((service) => (
            <article key={service.title} className="px-8 py-10 lg:px-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-16">
                <h2 className="text-[15px] font-medium tracking-wide text-white">
                  {service.title}
                </h2>
                <div className="space-y-5">
                  <p className="text-[15px] leading-[1.75] text-zinc-400">
                    {service.description}
                  </p>
                  <p className="text-[15px] leading-[1.75] text-zinc-500">
                    {service.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionLabel>How to think about it</SectionLabel>
            <SerifHeading className="mt-8 max-w-[22ch]">
              Structure and stewardship — not a shortcut around responsibility.
            </SerifHeading>
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
              Ownership means the company has to run properly. Foundry helps you
              evaluate what that requires and build the infrastructure to support
              production, compliance, and growth — with clarity and ongoing
              stewardship.
            </p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#FF6A00]/8 blur-3xl" />
            <StructuralFramework className="aspect-[10/9] w-full" />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <ContactCta />
      </PageSection>
    </PageShell>
  );
}
