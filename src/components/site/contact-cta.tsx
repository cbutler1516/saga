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
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] px-5 py-12 text-center sm:px-8 sm:py-16 lg:px-20 lg:py-20 ${className}`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/40 to-transparent" />
        </div>
        <div className="relative">{inner}</div>
      </div>
    );
  }

  return <div className={`text-center ${className}`}>{inner}</div>;
}
