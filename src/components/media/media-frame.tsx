import { cn } from "@/lib/utils";

type MediaFrameProps = {
  children: React.ReactNode;
  className?: string;
  aspect?: string;
  overlay?: boolean;
};

export function MediaFrame({
  children,
  className,
  aspect = "21 / 9",
  overlay = true,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010]",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {children}
      {overlay ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/35 to-[#050505]/25"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
