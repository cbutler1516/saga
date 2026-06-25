import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

export function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PillarSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.06] py-14">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function ExecutiveSummary({ children }: { children: React.ReactNode }) {
  return (
    <div className="steel-surface blueprint-frame rounded-3xl border border-white/[0.08] p-6 sm:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Executive Summary
      </p>
      <div className="mt-5 space-y-4 text-[17px] leading-[1.8] text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Key Takeaways
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-[15px] leading-relaxed text-zinc-300">
            <span className="text-[#FF6A00]" aria-hidden>
              ✓
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FounderInsight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-10 rounded-2xl border border-[#FF6A00]/20 bg-[#FF6A00]/[0.04] p-6 sm:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Founder Insight
      </p>
      <div className="mt-4 text-xl font-medium leading-snug tracking-[-0.025em] text-white">
        {children}
      </div>
    </aside>
  );
}

export function Checklist({
  title = "Checklist",
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="steel-surface rounded-2xl border border-white/[0.08] p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        {title}
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[15px] leading-relaxed text-zinc-300"
          >
            <span className="text-[#FF6A00]" aria-hidden>
              ✓
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-[#FFB000]/20 bg-[#FFB000]/[0.04] p-5 text-[15px] leading-relaxed text-zinc-300">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFB000]">
        Common Risk
      </p>
      {children}
    </div>
  );
}

export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-[15px] leading-relaxed text-zinc-300">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Pro Tip
      </p>
      {children}
    </div>
  );
}

export function FrequentlyAskedQuestions({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
      {items.map((item) => (
        <div key={item.question} className="bg-white/[0.02] p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">{item.question}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export function RelatedGuides({
  guides,
}: {
  guides: Array<{ title: string; href: string; description: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-[#FF6A00]/30 hover:bg-[#FF6A00]/[0.035]"
        >
          <h3 className="text-lg font-semibold leading-snug text-white">
            {guide.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            {guide.description}
          </p>
          <p className="mt-5 text-sm font-medium text-zinc-300 transition-colors group-hover:text-[#FF6A00]">
            Read guide →
          </p>
        </Link>
      ))}
    </div>
  );
}

export function NextStepCta() {
  return (
    <div className="steel-surface blueprint-frame relative overflow-hidden rounded-3xl border border-[#FF6A00]/20 p-6 text-center sm:p-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="molten-line absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-[#FF6A00]/10 blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
          Wondering how this applies to your business?
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
          Take the Foundry Ownership Readiness Review and get a personalized
          briefing on ownership, infrastructure, and next steps.
        </p>
        <ButtonLink href="/assessment" className="mt-7 min-h-[48px] w-full sm:w-auto">
          Take the Ownership Readiness Review
        </ButtonLink>
      </div>
    </div>
  );
}
