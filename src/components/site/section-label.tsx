export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
      <span className="h-px w-5 bg-[#FF6A00]/50" aria-hidden />
      {children}
    </span>
  );
}
