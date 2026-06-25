import { cn } from "@/lib/utils";

/**
 * Audit shield — forged steel shield representing audit readiness and
 * institutional compliance. Decorative SVG.
 */
export function AuditShield({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <svg viewBox="0 0 120 140" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="as-steel" x1="0" y1="0" x2="120" y2="140">
            <stop offset="0%" stopColor="#323b43" />
            <stop offset="60%" stopColor="#181c20" />
            <stop offset="100%" stopColor="#0c0e10" />
          </linearGradient>
          <linearGradient id="as-molten" x1="0" y1="0" x2="0" y2="140">
            <stop offset="0%" stopColor="#ffb000" />
            <stop offset="100%" stopColor="#ff6a00" />
          </linearGradient>
        </defs>

        <path
          d="M60 6 L108 24 V70 C108 100 88 122 60 134 C32 122 12 100 12 70 V24 Z"
          fill="url(#as-steel)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
        />
        <path
          d="M60 6 L108 24 V70 C108 100 88 122 60 134"
          fill="none"
          stroke="url(#as-molten)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* verified check, self-drawing */}
        <path
          d="M42 70 L55 84 L82 52"
          fill="none"
          stroke="url(#as-molten)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="70"
          strokeDashoffset="70"
          style={{ animation: "draw-stroke 0.9s ease-out 0.3s forwards" }}
        />
        {/* inner blueprint datum */}
        <line x1="24" y1="46" x2="96" y2="46" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
    </div>
  );
}
