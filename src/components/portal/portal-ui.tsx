export function PortalPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PortalPanel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#101010]/80 ${className}`}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <div className="h-px w-16 bg-gradient-to-r from-[#FF6A00]/70 to-transparent" />
        <h2 className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

export function PortalStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "good" | "warn" | "neutral";
}) {
  const tones = {
    good: "border-[#FFB000]/30 bg-[#FFB000]/10 text-[#FFB000]",
    warn: "border-[#FF6A00]/30 bg-[#FF6A00]/10 text-[#FF6A00]",
    neutral: "border-white/10 bg-white/5 text-zinc-400",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
