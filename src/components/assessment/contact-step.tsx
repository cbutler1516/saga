"use client";

import { FoundryMark } from "@/components/brand/FoundryMark";
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
  "mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-base text-[#E6E6E6] placeholder:text-[#A7A7A7]/50 focus:border-[#FF6A00]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/20 sm:text-[15px]";

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
    contact.lastName.trim() &&
    contact.email.trim() &&
    contact.phone.trim();

  return (
    <div>
      <div className="mb-8 md:mb-12">
        <h1 className="mt-2 text-[clamp(1.375rem,4.5vw,2rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-white md:mt-4">
          Almost done — where should we send your summary?
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
          Your responses stay confidential. We only use this to follow up if you
          want to talk through your options.
        </p>
      </div>

      <div className="mb-10">
        <FoundryMark size="small" className="mb-6 opacity-50" />
        <div className="flex items-center justify-between text-[12px] text-zinc-500">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>Last step</span>
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
        className="space-y-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First name
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
            <label htmlFor="lastName" className={labelClass}>
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={contact.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
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
            Phone
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
            Company / current employer{" "}
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
          <label htmlFor="note" className={labelClass}>
            Anything else?{" "}
            <span className="normal-case tracking-normal text-zinc-600">
              (optional)
            </span>
          </label>
          <textarea
            id="note"
            rows={4}
            value={contact.note ?? ""}
            onChange={(e) => update("note", e.target.value)}
            placeholder="Anything you'd like us to know before a conversation."
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-[14px] text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-4 border-t border-white/5 bg-[#050505]/95 px-4 py-4 pb-safe backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-8 sm:backdrop-blur-none">
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
            className="min-h-[44px] rounded-full bg-[#FF6A00] px-6 py-3 text-[14px] font-medium tracking-wide text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Submitting…" : "See My Results"}
          </button>
        </div>
      </form>
    </div>
  );
}
