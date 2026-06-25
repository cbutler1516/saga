import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PlaybookForm } from "@/components/playbook/playbook-form";

export const metadata: Metadata = {
  title: "The Mortgage Ownership Playbook | Foundry",
  description:
    "Request The Mortgage Ownership Playbook, a practical guide for experienced mortgage professionals exploring ownership, licensing, compliance infrastructure, startup costs, operations, and the first 90 days.",
};

const playbookTopics = [
  "Ownership readiness",
  "Licensing roadmap",
  "Compliance infrastructure",
  "Startup costs",
  "Operating model",
  "First 90 days",
] as const;

export default function PlaybookPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.08] blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_440px] lg:px-8 lg:py-32">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#FF6A00]">
              Foundry Playbook
            </p>
            <h1 className="mt-6 max-w-[13ch] text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-gradient">
              The Mortgage Ownership Playbook
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl lg:leading-[1.7]">
              A practical guide for experienced mortgage professionals exploring
              ownership, licensing, compliance infrastructure, startup costs,
              operations, and the first 90 days.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {playbookTopics.map((topic) => (
                <div
                  key={topic}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-zinc-300"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <PlaybookForm source="playbook_page" />
        </div>
      </section>
    </PageShell>
  );
}
