"use client";

import type { AssessmentContact } from "@/lib/assessment-submission";

type ContactStepProps = {
  totalSteps: number;
  currentStep: number;
  contact: AssessmentContact;
  onChange: (contact: AssessmentContact) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
};

const inputClass =
  "mt-2 w-full min-h-[46px] rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-base text-[#E6E6E6] placeholder:text-[#A7A7A7]/45 focus:border-[#FF6A00]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/20 sm:text-[15px]";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500";

export function ContactStep({
  totalSteps,
  currentStep,
  contact,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  error,
}: ContactStepProps) {
  function update(field: keyof AssessmentContact, value: string) {
    onChange({ ...contact, [field]: value });
  }

  const canSubmit =
    contact.firstName.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.tcpaConsent === "yes";

  return (
    <div>
      <div className="mb-8 md:mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          Ownership Readiness Review
        </p>
        <h1 className="mt-4 text-[clamp(1.5rem,4.8vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
          Let&apos;s personalize your Ownership Readiness Review.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
          We&apos;ll email your personalized review and only reach out if
          you&apos;d like to discuss your options.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between text-[12px] text-zinc-500">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>About 90 seconds left</span>
        </div>
        <div className="mt-2 h-px w-full bg-white/[0.08]">
          <div
            className="h-px bg-[#FF6A00]"
            style={{ width: `${Math.round((currentStep / totalSteps) * 100)}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit && !isSubmitting) onSubmit();
        }}
        className="steel-surface blueprint-frame rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.95)] sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={contact.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={contact.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Mobile Phone *
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              required
              value={contact.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company{" "}
              <span className="normal-case tracking-normal text-zinc-600">
                (optional)
              </span>
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={contact.company ?? ""}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nmls" className={labelClass}>
              NMLS{" "}
              <span className="normal-case tracking-normal text-zinc-600">
                (optional)
              </span>
            </label>
            <input
              id="nmls"
              type="text"
              inputMode="numeric"
              value={contact.nmls ?? ""}
              onChange={(e) => update("nmls", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-black/20 p-4">
          <input
            type="checkbox"
            checked={contact.tcpaConsent === "yes"}
            onChange={(e) =>
              update("tcpaConsent", e.target.checked ? "yes" : "")
            }
            className="mt-1 h-5 w-5 shrink-0 rounded border-white/20 bg-transparent text-[#FF6A00] focus:ring-[#FF6A00]/30"
            required
          />
          <span className="text-[12px] leading-relaxed text-zinc-500">
            I agree that Foundry may contact me by email, phone, or text about
            my review. Message/data rates may apply. Consent is not a condition
            of purchase.
          </span>
        </label>

        {error && (
          <p className="text-[14px] text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="sticky bottom-0 -mx-5 mt-6 flex items-center justify-between gap-4 border-t border-white/5 bg-[#050505]/95 px-5 py-4 pb-safe backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-6 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex min-h-[44px] items-center px-2 text-[14px] text-zinc-500 transition-colors hover:text-white disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="min-h-[46px] rounded-full bg-[#FF6A00] px-6 py-3 text-[14px] font-medium tracking-wide text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Continuing…" : "Continue My Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
