import { cn } from "@/lib/utils";

/**
 * Floating browser window chrome used to frame Foundry product concept
 * previews. Decorative — communicates "real software" without functionality.
 */
export function BrowserFrame({
  url = "app.foundry.com",
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0d0f] shadow-[0_50px_140px_-50px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#101316]/90 px-4 py-3">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/[0.07]" />
        </div>
        <div className="mx-auto flex max-w-full items-center gap-2 truncate rounded-lg border border-white/[0.06] bg-[#070809] px-3 py-1.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0"
            aria-hidden
          >
            <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="#6b757e" strokeWidth="1" />
            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="#6b757e" strokeWidth="1" />
          </svg>
          <span className="truncate text-[11px] tracking-wide text-zinc-500">
            {url}
          </span>
        </div>
        <div className="hidden w-[52px] shrink-0 sm:block" aria-hidden />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
