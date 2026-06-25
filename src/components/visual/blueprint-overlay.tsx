import { cn } from "@/lib/utils";

/**
 * Blueprint geometry overlay — fine technical grid with measurement ticks
 * and a molten datum line. Used to frame sections with engineering precision.
 * Decorative only.
 */
export function BlueprintOverlay({
  className,
  intensity = "subtle",
}: {
  className?: string;
  intensity?: "subtle" | "medium";
}) {
  const opacity = intensity === "medium" ? 0.5 : 0.28;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={{ opacity }}>
        <defs>
          <pattern id="bp-fine" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <pattern id="bp-coarse" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M120 0H0V120" fill="none" stroke="rgba(255,106,0,0.10)" strokeWidth="1" />
          </pattern>
          <linearGradient id="bp-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="40%" stopColor="#000" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <mask id="bp-mask">
            <rect width="100%" height="100%" fill="url(#bp-fade)" />
          </mask>
        </defs>
        <g mask="url(#bp-mask)">
          <rect width="100%" height="100%" fill="url(#bp-fine)" />
          <rect width="100%" height="100%" fill="url(#bp-coarse)" />
        </g>
      </svg>
    </div>
  );
}
