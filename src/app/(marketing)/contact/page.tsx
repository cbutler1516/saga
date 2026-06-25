import type { Metadata } from "next";
import { AtmosphericBackdrop } from "@/components/media/atmospheric-backdrop";
import { PageHero } from "@/components/site/page-hero";
import { PageSection } from "@/components/site/page-section";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/site/section-label";
import { SerifHeading } from "@/components/site/serif-heading";
import { BlueprintOverlay } from "@/components/visual/blueprint-overlay";
import { siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact — Start a Confidential Conversation",
  description:
    "Start a confidential, advisory conversation about ownership, compliance infrastructure, or expansion readiness.",
  keywords: [...siteKeywords],
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="relative">
        <AtmosphericBackdrop
          imageSrc="/images/infrastructure-framework.png"
          variant="texture"
        />

        <div className="relative z-10">
          <PageHero
            label="Contact"
            title="Start a confidential conversation."
            description="Whether you are exploring ownership, strengthening an existing brokerage, or preparing for expansion — we are happy to discuss where you are and what the path forward looks like. No pricing on this site. No urgency. Just a direct conversation."
            showBrandMark
          />

          <PageSection className="border-t-0">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionLabel>Reach us</SectionLabel>
                <SerifHeading className="mt-8 max-w-[20ch]">
                  Ownership, infrastructure, or expansion readiness.
                </SerifHeading>
                <p className="mt-8 text-base leading-relaxed text-zinc-400 lg:text-[1.0625rem] lg:leading-[1.8]">
                  Email is the simplest way to begin. Tell us a little about your
                  situation — whether you are a producer considering ownership,
                  a broker owner seeking operational support, or preparing for
                  correspondent readiness — and we will respond personally.
                </p>

                <div className="mt-12 space-y-6 border-t border-white/5 pt-10">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                      General inquiries
                    </p>
                    <a
                      href="mailto:hello@saga.com"
                      className="mt-3 block text-[15px] text-zinc-300 transition-colors hover:text-white"
                    >
                      hello@saga.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                      Discuss ownership
                    </p>
                    <a
                      href="mailto:hello@saga.com?subject=Discussing%20ownership"
                      className="mt-3 block text-[15px] text-zinc-300 transition-colors hover:text-white"
                    >
                      hello@saga.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="steel-surface blueprint-frame rounded-2xl p-8 lg:p-10">
                <div className="molten-line mb-6 h-px w-10" />
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  What to expect
                </p>
                <ul className="mt-8 space-y-6">
                  {[
                    "A direct response — not an automated sequence.",
                    "A conversation about your situation, not a sales pitch.",
                    "Plain language about what standing up or strengthening requires.",
                    "No pricing discussion on this site — that belongs in conversation.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-[15px] leading-[1.75] text-zinc-400"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]/60"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PageSection>

          <PageSection>
            <div className="steel-surface blueprint-frame relative overflow-hidden rounded-2xl px-8 py-16 text-center lg:px-20 lg:py-20">
              <BlueprintOverlay intensity="subtle" />
              <div className="pointer-events-none absolute inset-0">
                <div className="molten-line absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2" />
              </div>
              <div className="relative">
                <SerifHeading className="mx-auto max-w-[28ch]">
                  Start a confidential conversation about ownership, compliance
                  infrastructure, or expansion readiness.
                </SerifHeading>
                <p className="mx-auto mt-8 max-w-[44ch] text-lg leading-relaxed text-zinc-400">
                  If you are a high-producing LO or broker owner wondering what
                  ownership requires — the question is usually operational, not
                  whether you can sell. That is what we are here to discuss.
                </p>
                <div className="mt-12">
                  <a
                    href="mailto:hello@saga.com"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF8420] to-[#FF6A00] px-6 py-3 text-sm font-medium text-[#050505] shadow-[0_6px_24px_-6px_rgba(255,106,0,0.45)] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:from-[#FF9433] hover:to-[#FF7A1A] hover:shadow-[0_10px_36px_-6px_rgba(255,106,0,0.55)]"
                  >
                    Start a Confidential Conversation
                  </a>
                </div>
              </div>
            </div>
          </PageSection>
        </div>
      </div>
    </PageShell>
  );
}
