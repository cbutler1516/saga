"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";
import { AuditShield } from "@/components/visual/audit-shield";
import { BrowserFrame } from "./browser-frame";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Documents", active: false },
  { label: "Tasks", active: false },
  { label: "Compliance", active: false },
  { label: "Metrics", active: false },
];

const deadlines = [
  { label: "Mortgage Call Report — Q2", due: "Jul 15", tone: "soon" },
  { label: "WA annual license renewal", due: "Aug 02", tone: "ok" },
  { label: "HMDA data scrub", due: "Aug 20", tone: "ok" },
];

const tasks = [
  { label: "Review updated AML policy", done: true },
  { label: "Confirm QC sample for June", done: true },
  { label: "Approve new LO onboarding", done: false },
];

const documents = [
  { name: "Compliance Manual", meta: "PDF · Updated 3d ago" },
  { name: "QC Plan 2026", meta: "PDF · Updated 1w ago" },
  { name: "WA License", meta: "PDF · Current" },
];

function PanelCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 sm:p-5 ${className ?? ""}`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function WorkspacePreviewSection() {
  return (
    <Section className="border-t border-white/[0.06] bg-[#050505]">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionLabel>Foundry Workspace Preview</SectionLabel>
          <SectionHeading className="mt-7">
            One command center for the work that cannot slip.
          </SectionHeading>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            One calm place to see exactly where your company stands — compliance,
            deadlines, documents, and readiness, maintained continuously.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 md:mt-16">
          <BrowserFrame
            url="app.foundry.com/workspace"
            className="mx-auto max-w-5xl ring-1 ring-[#FF6A00]/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
              {/* Sidebar */}
              <div className="hidden border-r border-white/[0.06] bg-white/[0.012] p-5 md:block">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-md bg-gradient-to-br from-[#FF8420] to-[#FF6A00]" />
                  <span className="text-[13px] font-semibold tracking-tight text-white">
                    Foundry
                  </span>
                </div>
                <nav className="mt-8 space-y-1">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-lg px-3 py-2 text-[13px] ${
                        item.active
                          ? "bg-white/[0.04] font-medium text-white"
                          : "text-zinc-500"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </nav>
                <div className="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.015] p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                    Workspace
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium text-white">
                    Cascade Mortgage Co.
                  </p>
                </div>
                <div className="mt-3 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
                    Current posture
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium text-emerald-200">
                    Exam ready
                  </p>
                </div>
              </div>

              {/* Main */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Good morning, Daniel
                    </h3>
                    <p className="mt-1 text-[12px] text-zinc-500">
                      Compliance operations · Updated 4 minutes ago
                    </p>
                  </div>
                  <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[11px] font-medium text-emerald-300/90 sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    All systems current
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {/* Compliance Health */}
                  <PanelCard title="Compliance Health" className="col-span-2 lg:col-span-1">
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-semibold tracking-tight text-white">
                        96
                        <span className="text-lg text-zinc-500">%</span>
                      </span>
                      <span className="mb-1 text-[12px] font-medium text-emerald-300/90">
                        Healthy
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#FF8420] to-[#FFB000]" />
                    </div>
                  </PanelCard>

                  {/* Audit Readiness */}
                  <PanelCard title="Audit Readiness">
                    <div className="flex items-center gap-3">
                      <AuditShield className="h-9 w-8 shrink-0" />
                      <div>
                        <p className="text-[15px] font-semibold text-white">
                          Exam ready
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          WA · OR · ID licensed
                        </p>
                      </div>
                    </div>
                  </PanelCard>

                  {/* Foundry AI teaser */}
                  <PanelCard title="Foundry AI">
                    <p className="text-[13px] leading-snug text-zinc-400">
                      “Two items to confirm before your WA exam.”
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FF6A00]">
                      Ask Foundry AI
                      <span aria-hidden>→</span>
                    </p>
                  </PanelCard>

                  {/* Upcoming Deadlines */}
                  <PanelCard title="Upcoming Deadlines" className="col-span-2 lg:col-span-1">
                    <ul className="space-y-3">
                      {deadlines.map((d) => (
                        <li key={d.label} className="flex items-center justify-between gap-3">
                          <span className="truncate text-[13px] text-zinc-300">
                            {d.label}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                              d.tone === "soon"
                                ? "bg-[#FF6A00]/10 text-[#FF8A2E]"
                                : "bg-white/[0.05] text-zinc-400"
                            }`}
                          >
                            {d.due}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </PanelCard>

                  {/* Tasks */}
                  <PanelCard title="Tasks">
                    <ul className="space-y-3">
                      {tasks.map((t) => (
                        <li key={t.label} className="flex items-center gap-2.5">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
                              t.done
                                ? "border-[#FF6A00]/40 bg-[#FF6A00]/15 text-[#FF8A2E]"
                                : "border-white/15"
                            }`}
                            aria-hidden
                          >
                            {t.done ? (
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                <path
                                  d="M2 5.2 4 7.2 8 2.8"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : null}
                          </span>
                          <span
                            className={`text-[13px] ${
                              t.done ? "text-zinc-500 line-through" : "text-zinc-300"
                            }`}
                          >
                            {t.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </PanelCard>

                  {/* Documents */}
                  <PanelCard title="Documents">
                    <ul className="space-y-3">
                      {documents.map((doc) => (
                        <li key={doc.name} className="flex items-center gap-3">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03]"
                            aria-hidden
                          >
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                              <path
                                d="M3.5 1.5h4L11 5v7.5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
                                stroke="#98a3ac"
                                strokeWidth="1"
                                strokeLinejoin="round"
                              />
                              <path d="M7.5 1.5V5H11" stroke="#98a3ac" strokeWidth="1" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-zinc-200">
                              {doc.name}
                            </p>
                            <p className="truncate text-[11px] text-zinc-600">
                              {doc.meta}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </PanelCard>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </FadeIn>
      </Container>
    </Section>
  );
}
