"use client";

import { useEffect, useState } from "react";
import {
  ConfirmationView,
  type SubmissionResult,
} from "./confirmation-view";
import { ContactStep } from "./contact-step";
import { ProgressIndicator } from "./progress-indicator";
import {
  type AssessmentAnswers,
  type AssessmentId,
  getAssessment,
} from "@/lib/assessment-config";
import type { AssessmentContact, AssessmentUtm } from "@/lib/assessment-submission";

type Phase = "questions" | "contact" | "confirmation";

const emptyContact: AssessmentContact = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
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

export function AssessmentFlow({ assessmentId }: { assessmentId: AssessmentId }) {
  const config = getAssessment(assessmentId);
  const totalSteps = config.questions.length + 1;

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
  const canContinue = isQuestionAnswered(selectedValue, question?.allowMultiple);

  function selectOption(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function toggleMultipleOption(questionId: string, value: string) {
    setAnswers((prev) => {
      const current = getSelectedValues(prev[questionId]);
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: next.join(",") };
    });
  }

  function goNext() {
    if (!canContinue) return;
    if (isLastQuestion) {
      setPhase("contact");
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function goBackFromContact() {
    setPhase("questions");
    setStep(config.questions.length - 1);
    setSubmitError(null);
  }

  async function submitAssessment() {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessment_type: assessmentId,
          answers,
          contact: {
            firstName: contact.firstName.trim(),
            lastName: contact.lastName.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            ...(contact.company?.trim()
              ? { company: contact.company.trim() }
              : {}),
            ...(contact.note?.trim() ? { note: contact.note.trim() } : {}),
          },
          utm,
          source: "assessment_funnel",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error ?? "Unable to submit. Please try again.");
        return;
      }

      setResult({
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
    } finally {
      setIsSubmitting(false);
    }
  }

  if (phase === "confirmation" && result) {
    return <ConfirmationView result={result} />;
  }

  if (phase === "contact") {
    return (
      <ContactStep
        totalSteps={totalSteps}
        currentStep={totalSteps}
        contact={contact}
        onChange={setContact}
        onBack={goBackFromContact}
        onSubmit={submitAssessment}
        isSubmitting={isSubmitting}
        error={submitError}
      />
    );
  }

  return (
    <div className="pb-4">
      <div className="mb-8 md:mb-12">
        <h1 className="text-[clamp(1.375rem,4.5vw,2rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
          {question.question}
        </h1>
        {question.helperText && (
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-500 md:mt-4">
            {question.helperText}
          </p>
        )}
      </div>

      <ProgressIndicator current={step + 1} total={totalSteps} />

      <fieldset className="mt-8 space-y-3 md:mt-10">
        <legend className="sr-only">{question.question}</legend>
        {question.allowMultiple
          ? question.options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`flex min-h-[44px] cursor-pointer items-start gap-4 rounded-xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-4 ${
                    isSelected
                      ? "border-[#FF6A00]/50 bg-[#FF6A00]/8 ring-1 ring-[#FF6A00]/25"
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
          disabled={!canContinue}
          className="min-h-[44px] rounded-full bg-[#FF6A00] px-6 py-3 text-[14px] font-medium tracking-wide text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
