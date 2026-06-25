import {
  assessments,
  type AssessmentId,
  getAssessment,
} from "./assessment-config";
import type { AdminSubmission } from "./supabase/server";

export function getFollowUpAngle(submission: AdminSubmission): string {
  const type = submission.assessment_type as AssessmentId;
  const tier = submission.tier.toLowerCase();
  const note = submission.contact?.note;

  if (note?.trim()) {
    return `They left a confidential note — lead with their stated context before discussing ${formatAssessmentType(type)} readiness. Review the note carefully and acknowledge it directly.`;
  }

  if (type === "independence") {
    if (tier.includes("early") || tier.includes("exploration")) {
      return "Producer is in early exploration. Focus the conversation on licensing requirements, entity structure, and a realistic launch timeline — not urgency.";
    }
    if (tier.includes("building")) {
      return "Producer has groundwork but clear gaps. Discuss standing up CMS, policies, and licensing in parallel — offer a structured launch plan.";
    }
    return "Producer appears launch-ready. Discuss transition timing, wholesale lender relationships, and day-one exam-ready compliance file.";
  }

  if (type === "existing-broker") {
    if (tier.includes("significant") || tier.includes("gaps")) {
      return "Compliance operation has material gaps. Lead with a gap assessment conversation — CMS, control testing, and exam readiness documentation.";
    }
    if (tier.includes("moderate")) {
      return "Foundation exists but needs strengthening. Discuss continuous control testing, reporting integration, and exam evidence organization.";
    }
    return "Operation appears structurally sound. Explore optimization — automated testing, scaling with growth, and reducing manual compliance burden.";
  }

  if (type === "correspondent") {
    if (tier.includes("foundation")) {
      return "Correspondent channel requires stronger broker foundation first. Discuss QC plan development and compliance program maturity before warehouse conversations.";
    }
    if (tier.includes("preparation")) {
      return "Building toward correspondent readiness. Focus on QC documentation, seller approval package assembly — do not imply any specific warehouse approval.";
    }
    return "May be ready to explore correspondent channel. Discuss seller approval documentation and operational capacity — approval is never guaranteed.";
  }

  return "Review responses and tier before the conversation. Lead with advisory tone — understand their situation before suggesting next steps.";
}

export function formatAssessmentType(type: string): string {
  const map: Record<string, string> = {
    independence: "Independence Readiness",
    "existing-broker": "Existing Broker Health Check",
    correspondent: "Correspondent Readiness",
  };
  return map[type] ?? type;
}

export function resolveAnswerLabels(
  assessmentType: string,
  answers: Record<string, string>,
): { question: string; answer: string }[] {
  const id = assessmentType as AssessmentId;
  if (!assessments[id]) return [];

  const config = getAssessment(id);
  return config.questions.map((q) => {
    const value = answers[q.id];
    const option = q.options.find((o) => o.value === value);
    return {
      question: q.question,
      answer: option?.label ?? value ?? "—",
    };
  });
}

export function formatContactName(
  contact: Record<string, string | undefined>,
): string {
  const first = contact.firstName ?? "";
  const last = contact.lastName ?? "";
  return [first, last].filter(Boolean).join(" ") || "—";
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
