export type JourneyStep = {
  number: string;
  title: string;
  description: string;
};

export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <>
      <div className="hidden lg:block">
        <div className="relative">
          {/* molten connector line */}
          <div
            className="molten-line absolute left-[10%] right-[10%] top-6 h-px opacity-70"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-5 gap-4">
            {steps.map((step) => (
              <li key={step.title} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6A00]/30 bg-[#0c0e10] font-mono text-[11px] text-[#FF6A00] shadow-[0_0_18px_-4px_rgba(255,106,0,0.4)]">
                  {step.number}
                  <span
                    className="absolute inset-0 rounded-full border border-[#FF6A00]/40 animate-pulse-ring"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#E6E6E6]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A7A7A7]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className="mt-12 space-y-0 lg:hidden">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex gap-6 py-6 pl-8"
          >
            {/* vertical molten rail */}
            <span
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-[#FF6A00]/50 via-[#FF6A00]/25 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute -left-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-[#FF6A00]/40 bg-[#0c0e10] shadow-[0_0_12px_-2px_rgba(255,106,0,0.5)]">
              <span className="font-mono text-[10px] text-[#FF6A00]">
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#E6E6E6]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A7A7A7]">
                {step.description}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span className="sr-only">Next: {steps[i + 1]?.title}</span>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
