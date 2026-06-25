import type { AssessmentAnswers, AssessmentId } from "./assessment-config";
import { getAssessment } from "./assessment-config";

export type AssessmentContact = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  company?: string;
  nmls?: string;
  tcpaConsent?: string;
  note?: string;
};

export type AssessmentUtm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type AssessmentSubmissionPayload = {
  assessment_type: AssessmentId;
  answers: AssessmentAnswers;
  contact: AssessmentContact;
  utm?: AssessmentUtm | null;
  source?: string | null;
};

export type AssessmentSubmissionRecord = AssessmentSubmissionPayload & {
  score: number;
  tier: string;
};

const ASSESSMENT_IDS: AssessmentId[] = [
  "independence",
  "existing-broker",
  "correspondent",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isAssessmentId(value: string): value is AssessmentId {
  return ASSESSMENT_IDS.includes(value as AssessmentId);
}

export function validateSubmissionBody(
  body: unknown,
):
  | { success: true; data: AssessmentSubmissionPayload }
  | { success: false; error: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;

  if (
    typeof record.assessment_type !== "string" ||
    !isAssessmentId(record.assessment_type)
  ) {
    return { success: false, error: "A valid assessment_type is required." };
  }

  if (!record.answers || typeof record.answers !== "object") {
    return { success: false, error: "Assessment answers are required." };
  }

  if (!record.contact || typeof record.contact !== "object") {
    return { success: false, error: "Contact information is required." };
  }

  const contact = record.contact as Record<string, unknown>;

  const firstName =
    typeof contact.firstName === "string" ? contact.firstName.trim() : "";
  const lastName =
    typeof contact.lastName === "string" ? contact.lastName.trim() : "";
  const email = typeof contact.email === "string" ? contact.email.trim() : "";
  const phone = typeof contact.phone === "string" ? contact.phone.trim() : "";

  if (!firstName) {
    return { success: false, error: "First name is required." };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { success: false, error: "A valid email address is required." };
  }
  if (!phone) {
    return { success: false, error: "Phone number is required." };
  }

  const company =
    typeof contact.company === "string" ? contact.company.trim() : undefined;
  const nmls =
    typeof contact.nmls === "string" ? contact.nmls.trim() : undefined;
  const tcpaConsent =
    typeof contact.tcpaConsent === "string"
      ? contact.tcpaConsent.trim()
      : undefined;
  const note =
    typeof contact.note === "string" ? contact.note.trim() : undefined;

  const answers = record.answers as AssessmentAnswers;

  let utm: AssessmentUtm | null = null;
  if (record.utm && typeof record.utm === "object") {
    const raw = record.utm as Record<string, unknown>;
    utm = {
      utm_source:
        typeof raw.utm_source === "string" ? raw.utm_source : undefined,
      utm_medium:
        typeof raw.utm_medium === "string" ? raw.utm_medium : undefined,
      utm_campaign:
        typeof raw.utm_campaign === "string" ? raw.utm_campaign : undefined,
      utm_term: typeof raw.utm_term === "string" ? raw.utm_term : undefined,
      utm_content:
        typeof raw.utm_content === "string" ? raw.utm_content : undefined,
    };
  }

  const source =
    typeof record.source === "string" ? record.source.trim() : null;

  return {
    success: true,
    data: {
      assessment_type: record.assessment_type,
      answers,
      contact: {
        firstName,
        ...(lastName ? { lastName } : {}),
        email,
        phone,
        ...(company ? { company } : {}),
        ...(nmls ? { nmls } : {}),
        ...(tcpaConsent ? { tcpaConsent } : {}),
        ...(note ? { note } : {}),
      },
      utm,
      source,
    },
  };
}

export function validateAnswersForAssessment(
  assessmentType: AssessmentId,
  answers: AssessmentAnswers,
  questionIds: string[],
): { valid: true } | { valid: false; error: string } {
  for (const id of questionIds) {
    if (!answers[id] || typeof answers[id] !== "string") {
      return {
        valid: false,
        error: `Missing or invalid answer for question: ${id}`,
      };
    }
  }

  const extraKeys = Object.keys(answers).filter(
    (k) => !questionIds.includes(k),
  );
  if (extraKeys.length > 0) {
    return { valid: false, error: "Unexpected answer keys in submission." };
  }

  void assessmentType;
  return { valid: true };
}

export function validateQuestionOptions(
  assessmentType: AssessmentId,
  answers: AssessmentAnswers,
): { valid: true } | { valid: false; error: string } {
  const config = getAssessment(assessmentType);

  for (const question of config.questions) {
    const value = answers[question.id];
    if (!value || typeof value !== "string") {
      return {
        valid: false,
        error: `Missing or invalid answer for question: ${question.id}`,
      };
    }

    if (question.allowMultiple) {
      const selected = value.split(",").filter(Boolean);
      if (selected.length === 0) {
        return {
          valid: false,
          error: `Select at least one option for question: ${question.id}`,
        };
      }
      for (const selection of selected) {
        if (!question.options.some((o) => o.value === selection)) {
          return {
            valid: false,
            error: `Invalid option for question: ${question.id}`,
          };
        }
      }
    } else if (!question.options.some((o) => o.value === value)) {
      return {
        valid: false,
        error: `Invalid option for question: ${question.id}`,
      };
    }
  }

  return { valid: true };
}
