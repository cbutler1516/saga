"use client";

import { useEffect, useState } from "react";
import {
  ConfirmationView,
  type SubmissionResult,
} from "./confirmation-view";
import { ContactStep } from "./contact-step";
import { ProgressIndicator } from "./progress-indicator";
import { motion } from "@/lib/motion";
import {
  type AssessmentAnswers,
  type AssessmentId,
  getAssessment,
} from "@/lib/assessment-config";
import type { AssessmentContact, AssessmentUtm } from "@/lib/assessment-submission";

type Phase = "questions" | "contact" | "building" | "confirmation";
type MomentumTone = "start" | "middle" | "nearly";

const emptyContact: AssessmentContact = {
  firstName: "",
  email: "",
  phone: "",
  company: "",
  nmls: "",
  tcpaConsent: "",
  note: "",
};

function captureUtmFromUrl(): AssessmentUtm | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: AssessmentUtm = {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };

  const hasValue = Object.values(utm).some(Boolean);
  return hasValue ? utm : null;
}

function getSelectedValues(answer: string | undefined): string[] {
  if (!answer) return [];
  return answer.split(",").filter(Boolean);
}

function isQuestionAnswered(
  answer: string | undefined,
  allowMultiple?: boolean,
): boolean {
  if (!answer) return false;
  if (allowMultiple) return getSelectedValues(answer).length > 0;
  return true;
}

const buildingSteps = [
  "Reviewing your responses...",
  "Evaluating operational readiness...",
  "Building your ownership roadmap...",
  "Preparing recommendations...",
] as const;

function BuildingReviewScreen() {
  return (
    <div className="min-h-[520px] py-12">
      <div className="steel-surface blueprint-frame mx-auto max-w-2xl rounded-3xl border border-white/[0.08] bg-white/[0.025] px-6 py-10 text-center shadow-[0_40px_120px_-80px_rgba(255,106,0,0.45)] sm:px-10 sm:py-14">
        <div className="molten-line mx-auto mb-8 h-px w-20" />
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          Foundry Review
        </p>
        <h1 className="mx-auto mt-5 max-w-[18ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-gradient">
          Building Your Ownership Readiness Review
        </h1>
        <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
          {buildingSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.45 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3"
            >
              <span className="text-[#FF6A00]" aria-hidden>
                ✓
              </span>
              <span className="text-sm text-zinc-300">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AssessmentFlow({ assessmentId }: { assessmentId: AssessmentId }) {
  const config = getAssessment(assessmentId);
  const totalSteps = config.questions.length + 1;
  const contactStepIndex = 2;

  const [phase, setPhase] = useState<Phase>("questions");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [contact, setContact] = useState<AssessmentContact>(emptyContact);
  const [utm, setUtm] = useState<AssessmentUtm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    setUtm(captureUtmFromUrl());
  }, []);

  const question = config.questions[step];
  const isLastQuestion = step === config.questions.length - 1;
  const selectedValue = answers[question?.id ?? ""];
  const selectedValues = getSelectedValues(selectedValue);
  const isSlider = question?.inputType === "slider";
  const sliderValue = selectedValue ?? "5";
  const canContinue =
    isSlider || isQuestionAnswered(selectedValue, question?.allowMultiple);
  const currentScreen = step < contactStepIndex ? step + 1 : step + 2;
  const momentumTone: MomentumTone =
    currentScreen <= 2
      ? "start"
      : currentScreen >= totalSteps - 1
        ? "nearly"
        : "middle";

  function selectOption(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function toggleMultipleOption(questionId: string, value: string) {
    setAnswers((prev) => {
      const current = getSelectedValues(prev[questionId]);
      const maxSelections =
        config.questions.find((q) => q.id === questionId)?.maxSelections ??
        Number.POSITIVE_INFINITY;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : current.length >= maxSelections
          ? current
        : [...current, value];
      return { ...prev, [questionId]: next.join(",") };
    });
  }

  function normalizeAnswers(nextAnswers: AssessmentAnswers): AssessmentAnswers {
    return config.questions.reduce<AssessmentAnswers>((acc, q) => {
      acc[q.id] = q.inputType === "slider" && !nextAnswers[q.id]
        ? "5"
        : (nextAnswers[q.id] ?? "");
      return acc;
    }, {});
  }

  function goNext() {
    if (!canContinue) return;
    if (question?.inputType === "slider" && !answers[question.id]) {
      setAnswers((prev) => ({ ...prev, [question.id]: sliderValue }));
    }
    if (step === contactStepIndex - 1) {
      setPhase("contact");
      setSubmitError(null);
      return;
    }
    if (isLastQuestion) {
      void submitAssessment();
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step === contactStepIndex) {
      setPhase("contact");
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  }

  function goBackFromContact() {
    setPhase("questions");
    setStep(contactStepIndex - 1);
    setSubmitError(null);
  }

  function continueFromContact() {
    setPhase("questions");
    setStep(contactStepIndex);
    setSubmitError(null);
  }

  async function submitAssessment() {
    setIsSubmitting(true);
    setSubmitError(null);
    const finalAnswers = normalizeAnswers(answers);
    setPhase("building");
    const minimumBriefingDelay = new Promise((resolve) =>
      window.setTimeout(resolve, 2400),
    );

    try {
      const responsePromise = fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessment_type: assessmentId,
          answers: finalAnswers,
          contact: {
            firstName: contact.firstName.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            ...(contact.company?.trim()
              ? { company: contact.company.trim() }
              : {}),
            ...(contact.nmls?.trim() ? { nmls: contact.nmls.trim() } : {}),
            ...(contact.tcpaConsent
              ? { tcpaConsent: contact.tcpaConsent }
              : {}),
            ...(contact.note?.trim() ? { note: contact.note.trim() } : {}),
          },
          utm,
          source: "assessment_funnel",
        }),
      });
      const [response] = await Promise.all([responsePromise, minimumBriefingDelay]);

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error ?? "Unable to submit. Please try again.");
        setPhase("questions");
        return;
      }

      setResult({
        assessmentId,
        answers: finalAnswers,
        score: data.score,
        tier: data.tier,
        tierHeadline: data.tierHeadline,
        tierSummary: data.tierSummary,
        strengths: data.strengths,
        focusAreas: data.focusAreas,
        priorityActions: data.priorityActions,
        nextSteps: data.nextSteps,
        maxScore: data.maxScore,
        scoreLabel: data.scoreLabel,
        blueprintTitle: data.blueprintTitle,
        deliverableName: data.deliverableName,
        blueprint: data.blueprint,
        contactEmail: contact.email.trim(),
      });
      setPhase("confirmation");
    } catch {
      setSubmitError("Unable to submit. Please check your connection and try again.");
      setPhase("questions");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (phase === "building") {
    return <BuildingReviewScreen />;
  }

  if (phase === "confirmation" && result) {
    return <ConfirmationView result={result} />;
  }

  if (phase === "contact") {
    return (
      <ContactStep
        totalSteps={totalSteps}
        currentStep={contactStepIndex + 1}
        contact={contact}
        onChange={setContact}
        onBack={goBackFromContact}
        onSubmit={continueFromContact}
        isSubmitting={isSubmitting}
        error={submitError}
      />
    );
  }

  return (
    <div className="pb-4">
      <div className="mb-8 md:mb-10">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          {step === 0
            ? "Ownership Readiness Review"
            : momentumTone === "middle"
              ? "You're almost halfway there."
              : momentumTone === "nearly"
                ? "Almost finished."
                : "Ownership Readiness Review"}
        </p>
        <h1 className="text-[clamp(1.375rem,4.5vw,2rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
          {question.question}
        </h1>
        {question.subheadline ? (
          <p className="mt-3 text-lg leading-relaxed text-[#E6E6E6]/90">
            {question.subheadline}
          </p>
        ) : null}
        {question.helperText && (
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-500 md:mt-4">
            {question.helperText}
          </p>
        )}
      </div>

      <ProgressIndicator current={currentScreen} total={totalSteps} />

      <fieldset className="mt-8 space-y-3 md:mt-10">
        <legend className="sr-only">{question.question}</legend>
        {question.inputType === "slider" ? (
          <div className="rounded-2xl border border-white/10 bg-[#101010] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Not confident yet</span>
              <span className="text-sm text-zinc-500">Very confident</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={sliderValue}
              onChange={(event) => selectOption(question.id, event.target.value)}
              className="mt-8 w-full accent-[#FF6A00]"
              aria-label={question.question}
            />
            <div className="mt-6 flex items-end justify-between">
              <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Confidence
              </span>
              <span className="text-4xl font-semibold tracking-[-0.04em] text-white">
                {sliderValue}
                <span className="text-base text-zinc-500">/10</span>
              </span>
            </div>
          </div>
        ) : question.allowMultiple
          ? question.options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              const maxReached =
                Boolean(question.maxSelections) &&
                selectedValues.length >= (question.maxSelections ?? 0);
              const isDisabled = maxReached && !isSelected;
              return (
                <label
                  key={option.value}
                  className={`flex min-h-[44px] cursor-pointer items-start gap-4 rounded-xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-4 ${
                    isSelected
                      ? "border-[#FF6A00]/50 bg-[#FF6A00]/8 ring-1 ring-[#FF6A00]/25"
                      : isDisabled
                        ? "cursor-not-allowed border-white/[0.06] bg-[#101010]/60 opacity-45"
                        : "border-white/10 bg-[#101010] hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={question.id}
                    value={option.value}
                    checked={isSelected}
                    onChange={() =>
                      toggleMultipleOption(question.id, option.value)
                    }
                    disabled={isDisabled}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/20 bg-transparent text-[#FF6A00] focus:ring-[#FF6A00]/30"
                  />
                  <span className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                    {option.label}
                  </span>
                </label>
              );
            })
          : question.options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex min-h-[44px] cursor-pointer items-start gap-4 rounded-xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-4 ${
                    isSelected
                      ? "border-[#FF6A00]/40 bg-[#FF6A00]/5"
                      : "border-white/10 bg-[#101010] hover:border-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => selectOption(question.id, option.value)}
                    className="mt-0.5 h-5 w-5 shrink-0 border-white/20 bg-transparent text-[#FF6A00] focus:ring-[#FF6A00]/30"
                  />
                  <span className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                    {option.label}
                  </span>
                </label>
              );
            })}
      </fieldset>

      {submitError ? (
        <p className="mt-6 text-[14px] text-red-400" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between gap-4 border-t border-white/5 bg-[#050505]/95 px-4 py-4 pb-safe backdrop-blur-md sm:static sm:mx-0 sm:mt-12 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-8 sm:backdrop-blur-none">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="flex min-h-[44px] items-center px-2 text-[14px] text-zinc-500 transition-colors hover:text-white disabled:invisible"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!canContinue || isSubmitting}
          className="min-h-[44px] rounded-full bg-[#FF6A00] px-6 py-3 text-[14px] font-medium tracking-wide text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLastQuestion
            ? isSubmitting
              ? "Building Review..."
              : "Build My Review"
            : "Continue"}
        </button>
      </div>
    </div>
  );
}
