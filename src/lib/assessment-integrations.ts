import type { BlueprintPdfPayload } from "./assessment-blueprint";
import type { AssessmentSubmissionRecord } from "./assessment-submission";

/**
 * Placeholder: sync submission to CRM (HubSpot, Salesforce, etc.)
 */
export async function syncToCrm(
  submission: AssessmentSubmissionRecord & { id?: string | null },
): Promise<void> {
  // TODO: Implement CRM sync when integration is selected.
  if (process.env.NODE_ENV === "development") {
    console.info("[CRM sync placeholder]", {
      assessment_type: submission.assessment_type,
      email: submission.contact.email,
      tier: submission.tier,
    });
  }
}

/**
 * Placeholder: notify internal team of new assessment submission.
 */
export async function sendInternalNotification(
  submission: AssessmentSubmissionRecord & { id?: string | null },
): Promise<void> {
  // TODO: Wire to email provider or Slack webhook.
  if (process.env.NODE_ENV === "development") {
    console.info("[Internal notification placeholder]", {
      assessment_type: submission.assessment_type,
      name: `${submission.contact.firstName} ${submission.contact.lastName}`,
      tier: submission.tier,
      score: submission.score,
    });
  }
}

/**
 * Placeholder: generate PDF blueprint for the submitter.
 */
export async function generatePdfReadinessReport(
  submission: AssessmentSubmissionRecord & {
    id?: string | null;
    blueprint?: BlueprintPdfPayload;
  },
): Promise<void> {
  // TODO: Generate PDF from blueprint payload; optionally email to submitter.
  if (process.env.NODE_ENV === "development") {
    console.info("[PDF blueprint placeholder]", {
      assessment_type: submission.assessment_type,
      tier: submission.tier,
      blueprintTitle: submission.blueprint?.blueprintTitle,
    });
  }
}
