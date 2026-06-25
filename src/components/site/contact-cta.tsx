import { ButtonLink } from "@/components/ui/button-link";
import { confidentialityReassurance } from "@/lib/site-content";
import { SerifHeading } from "./serif-heading";

export function ContactCta({
  className = "",
  bordered = true,
}: {
  className?: string;
  bordered?: boolean;
}) {
  const reassurance = confidentialityReassurance.join(" · ");

  const inner = (
    <>
      <SerifHeading className="mx-auto max-w-[24ch]">
        Curious what ownership or expansion would require?
      </SerifHeading>
      <p className="mx-auto mt-8 max-w-[44ch] text-lg leading-relaxed text-[#A7A7A7]">
        Start with a short, confidential assessment — or reach out for a
        direct conversation. Foundry is advisory; the next step is always
        yours.
      </p>
      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
        <ButtonLink href="/assessment" className="w-full sm:w-auto">
          Find Out If You&apos;re Ready
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
          Start a Conversation
        </ButtonLink>
      </div>
      <p className="mt-10 text-sm tracking-wide text-[#A7A7A7]/70">
        {reassurance}
      </p>
    </>
  );

  if (bordered) {
    return (
      <div
        className={`steel-surface blueprint-frame relative overflow-hidden rounded-3xl border border-white/[0.08] px-5 py-12 text-center shadow-[0_30px_100px_-70px_rgba(0,0,0,0.95)] sm:px-8 sm:py-16 lg:px-20 lg:py-20 ${className}`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="molten-line absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 opacity-80" />
        </div>
        <div className="relative">{inner}</div>
      </div>
    );
  }

  return <div className={`text-center ${className}`}>{inner}</div>;
}
