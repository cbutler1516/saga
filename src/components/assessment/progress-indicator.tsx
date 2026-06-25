export function ProgressIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const estimatedSeconds = Math.max(20, (total - current + 1) * 15);

  return (
    <div>
      <div className="flex items-center justify-between text-[12px] text-[#A7A7A7]">
        <span>
          Step {current} of {total}
        </span>
        <span>About {estimatedSeconds} seconds left</span>
      </div>
      <div className="mt-2 h-px w-full bg-white/10">
        <div
          className="h-px bg-[#FF6A00] transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-zinc-500 sm:mt-4">
        You&apos;re not committing to anything. This simply helps us understand
        your situation.
      </p>
    </div>
  );
}
