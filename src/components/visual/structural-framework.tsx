import { cn } from "@/lib/utils";

/**
 * Structural framework — layered foundation beams revealing the
 * operational structure beneath a growing business. The frame "assembles"
 * via staggered self-drawing strokes, with molten energy in the base layer.
 * Decorative; CSS-driven, reduced-motion aware.
 */
export function StructuralFramework({ className }: { className?: string }) {
  const beams = [
    { y: 150, w: 200, x: 0, molten: true },
    { y: 116, w: 168, x: 16, molten: false },
    { y: 84, w: 132, x: 34, molten: false },
    { y: 54, w: 92, x: 54, molten: false },
  ];

  return (
    <div className={cn("relative", className)} aria-hidden>
      <svg viewBox="0 0 200 180" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="sf-molten" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="#9a2f00" />
            <stop offset="50%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#ffb000" />
          </linearGradient>
        </defs>

        {/* vertical structural columns */}
        {[28, 100, 172].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="158"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="160"
            strokeDashoffset="160"
            style={{
              animation: `draw-stroke 1.1s ease-out ${0.1 + i * 0.12}s forwards`,
            }}
          />
        ))}

        {/* horizontal foundation layers, widest at the base */}
        {beams.map((beam, i) => {
          const cx = 100;
          const half = beam.w / 2;
          return (
            <line
              key={beam.y}
              x1={cx - half}
              y1={beam.y}
              x2={cx + half}
              y2={beam.y}
              stroke={beam.molten ? "url(#sf-molten)" : "rgba(255,255,255,0.16)"}
              strokeWidth={beam.molten ? 3 : 1.5}
              strokeLinecap="round"
              strokeDasharray={beam.w}
              strokeDashoffset={beam.w}
              style={{
                animation: `draw-stroke 1s ease-out ${0.4 + i * 0.14}s forwards`,
                filter: beam.molten ? "drop-shadow(0 0 6px rgba(255,106,0,0.5))" : undefined,
              }}
            />
          );
        })}

        {/* node joints */}
        {[28, 100, 172].map((x) =>
          beams.map((beam) => {
            const inRange = Math.abs(x - 100) <= beam.w / 2;
            if (!inRange) return null;
            return (
              <circle
                key={`${x}-${beam.y}`}
                cx={x}
                cy={beam.y}
                r="2.5"
                fill={beam.molten ? "#ff6a00" : "#232a30"}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
