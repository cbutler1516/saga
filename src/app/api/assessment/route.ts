import { NextResponse } from "next/server";
import { buildAssessmentBlueprint } from "@/lib/assessment-blueprint";
import {
  generatePdfReadinessReport,
  sendInternalNotification,
  syncToCrm,
} from "@/lib/assessment-integrations";
import {
  getAssessment,
  getSnapshotTier,
  scoreAssessment,
} from "@/lib/assessment-config";
import {
  validateAnswersForAssessment,
  validateQuestionOptions,
  validateSubmissionBody,
} from "@/lib/assessment-submission";
import {
  insertAssessmentSubmission,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validation = validateSubmissionBody(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { data } = validation;
  const config = getAssessment(data.assessment_type);
  const questionIds = config.questions.map((q) => q.id);

  const answersCheck = validateAnswersForAssessment(
    data.assessment_type,
    data.answers,
    questionIds,
  );
  if (!answersCheck.valid) {
    return NextResponse.json({ error: answersCheck.error }, { status: 400 });
  }

  const optionsCheck = validateQuestionOptions(
    data.assessment_type,
    data.answers,
  );
  if (!optionsCheck.valid) {
    return NextResponse.json({ error: optionsCheck.error }, { status: 400 });
  }

  const score = scoreAssessment(config, data.answers);
  const tier = getSnapshotTier(config, score);
  const blueprint = buildAssessmentBlueprint(config, tier, score);

  const submission = {
    ...data,
    score,
    tier: tier.label,
  };

  let submissionId: string | null = null;
  let persisted = false;

  try {
    if (isSupabaseConfigured()) {
      const result = await insertAssessmentSubmission({
        assessment_type: data.assessment_type,
        score,
        tier: tier.label,
        answers: data.answers,
        contact: data.contact,
        utm: data.utm ?? null,
        source: data.source ?? "assessment_funnel",
      });
      submissionId = result.id;
      persisted = result.persisted;
    } else if (process.env.NODE_ENV === "development") {
      console.info("[Assessment submission — Supabase not configured]", {
        assessment_type: data.assessment_type,
        score,
        tier: tier.label,
        contact: {
          email: data.contact.email,
          name: `${data.contact.firstName} ${data.contact.lastName}`,
        },
        answers: data.answers,
        utm: data.utm,
      });
    } else {
      return NextResponse.json(
        {
          error:
            "Submission storage is not configured. Please contact us directly.",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("[Assessment submission error]", error);
    return NextResponse.json(
      { error: "Unable to save submission. Please try again." },
      { status: 500 },
    );
  }

  // Integration placeholders — non-blocking
  await Promise.allSettled([
    syncToCrm({ ...submission, id: submissionId }),
    sendInternalNotification({ ...submission, id: submissionId }),
    generatePdfReadinessReport({ ...submission, id: submissionId, blueprint }),
  ]);

  return NextResponse.json({
    success: true,
    id: submissionId,
    persisted,
    score,
    tier: tier.label,
    tierHeadline: tier.headline,
    tierSummary: tier.summary,
    strengths: tier.strengths,
    focusAreas: tier.focusAreas,
    priorityActions: tier.priorityActions,
    nextSteps: tier.nextSteps,
    maxScore: config.maxScore,
    scoreLabel: config.scoreLabel,
    blueprintTitle: config.blueprintTitle,
    deliverableName: config.deliverableName,
    blueprint,
  });
}
