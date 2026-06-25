import Link from "next/link";

export function PlaybookCta({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`steel-surface blueprint-frame rounded-3xl border border-[#FF6A00]/20 bg-[#FF6A00]/[0.035] ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8 lg:p-10"
      }`}
    >
      <div className="molten-line mb-6 h-px w-14" />
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Free Playbook
      </p>
      <h2
        className={`mt-4 font-semibold leading-[1.08] tracking-[-0.04em] text-white ${
          compact ? "text-2xl" : "text-[clamp(1.75rem,3vw,2.75rem)]"
        }`}
      >
        The Mortgage Ownership Playbook
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
        A practical guide for experienced mortgage professionals exploring
        ownership, licensing, compliance infrastructure, startup costs,
        operations, and the first 90 days.
      </p>
      <Link
        href="/playbook"
        className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-medium text-[#050505] transition-colors hover:bg-[#FF7A1A] sm:w-auto"
      >
        Get the Playbook
      </Link>
    </div>
  );
}
