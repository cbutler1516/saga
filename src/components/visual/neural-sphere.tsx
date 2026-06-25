import { cn } from "@/lib/utils";

/**
 * Neural sphere — orange energy orbiting a forged core, representing
 * Foundry AI / intelligence layer. Decorative SVG with a slow pulse ring.
 */
export function NeuralSphere({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden>
      <div className="pointer-events-none absolute inset-1/4 rounded-full bg-[#FF6A00]/15 blur-2xl" />
      <svg viewBox="0 0 160 160" fill="none" className="relative h-full w-full">
        <defs>
          <radialGradient id="ns-core" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#ffb000" />
            <stop offset="45%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#9a2f00" />
          </radialGradient>
        </defs>

        {/* orbital rings */}
        <ellipse cx="80" cy="80" rx="64" ry="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <ellipse
          cx="80"
          cy="80"
          rx="64"
          ry="26"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          transform="rotate(60 80 80)"
        />
        <ellipse
          cx="80"
          cy="80"
          rx="64"
          ry="26"
          stroke="rgba(255,106,0,0.25)"
          strokeWidth="1"
          transform="rotate(120 80 80)"
        />

        {/* pulsing energy ring */}
        <circle
          cx="80"
          cy="80"
          r="26"
          stroke="#ff6a00"
          strokeWidth="1.5"
          opacity="0.5"
          className="animate-pulse-ring"
          style={{ transformOrigin: "80px 80px" }}
        />

        {/* forged core */}
        <circle cx="80" cy="80" r="18" fill="url(#ns-core)" />
        <circle cx="74" cy="73" r="5" fill="rgba(255,255,255,0.35)" />

        {/* nodes */}
        {[
          [16, 80],
          [144, 80],
          [50, 32],
          [110, 128],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#ffb000" />
        ))}
      </svg>
    </div>
  );
}
