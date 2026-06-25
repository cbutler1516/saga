import { cn } from "@/lib/utils";

/**
 * Forged "F" mark — the signature Foundry motif.
 * A structural "F" cut from black steel with a molten leading edge,
 * suspended in an architectural frame with subtle parallax float.
 * Pure SVG + CSS (no WebGL), reduced-motion aware via globals.css.
 */
export function ForgedMark({
  className,
  float = true,
}: {
  className?: string;
  float?: boolean;
}) {
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden>
      {/* molten halo */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[#FF6A00]/12 blur-3xl" />

      <svg
        viewBox="0 0 200 200"
        fill="none"
        className={cn("relative h-full w-full", float && "animate-forge-float")}
      >
        <defs>
          <linearGradient id="fm-steel" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#323b43" />
            <stop offset="55%" stopColor="#181c20" />
            <stop offset="100%" stopColor="#0c0e10" />
          </linearGradient>
          <linearGradient id="fm-molten" x1="0" y1="0" x2="0" y2="200">
            <stop offset="0%" stopColor="#ffb000" />
            <stop offset="55%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#9a2f00" />
          </linearGradient>
          <linearGradient id="fm-edge" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* architectural frame */}
        <rect
          x="20"
          y="20"
          width="160"
          height="160"
          rx="14"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <rect
          x="32"
          y="32"
          width="136"
          height="136"
          rx="10"
          fill="url(#fm-steel)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* the forged F — stem + two beams */}
        <g>
          <rect x="64" y="58" width="20" height="84" rx="3" fill="#11151a" stroke="rgba(255,255,255,0.06)" />
          <rect x="64" y="58" width="68" height="18" rx="3" fill="#11151a" stroke="rgba(255,255,255,0.06)" />
          <rect x="64" y="92" width="48" height="16" rx="3" fill="#11151a" stroke="rgba(255,255,255,0.06)" />

          {/* molten leading edges */}
          <rect x="64" y="58" width="4" height="84" rx="2" fill="url(#fm-molten)" />
          <rect x="64" y="58" width="68" height="3" rx="1.5" fill="url(#fm-molten)" />
          <rect x="64" y="92" width="48" height="3" rx="1.5" fill="url(#fm-molten)" />
        </g>

        {/* top light edge */}
        <rect x="32" y="32" width="136" height="2" rx="1" fill="url(#fm-edge)" />
      </svg>
    </div>
  );
}
