import type {
  AssessmentDefinition,
  AssessmentId,
  SnapshotTier,
} from "./assessment-config";

/** Roadmap phase — structured for future PDF export. */
export type BlueprintPhase = {
  horizon: "30-day" | "60-day" | "90-day" | "long-term";
  title: string;
  items: string[];
};

/** Full blueprint deliverable returned after assessment completion. */
export type AssessmentBlueprint = {
  version: 1;
  assessmentType: AssessmentId;
  blueprintTitle: string;
  scoreLabel: string;
  readinessScore: number;
  maxScore: number;
  readinessTier: string;
  currentState: string;
  keyGaps: string[];
  priorityActions: string[];
  recommendedNextSteps: string[];
  phases: BlueprintPhase[];
  /** ISO timestamp — populated at generation time. */
  generatedAt: string;
};

export function buildAssessmentBlueprint(
  config: AssessmentDefinition,
  tier: SnapshotTier,
  score: number,
): AssessmentBlueprint {
  return {
    version: 1,
    assessmentType: config.id,
    blueprintTitle: config.blueprintTitle,
    scoreLabel: config.scoreLabel,
    readinessScore: score,
    maxScore: config.maxScore,
    readinessTier: tier.label,
    currentState: tier.summary,
    keyGaps: tier.focusAreas,
    priorityActions: tier.priorityActions,
    recommendedNextSteps: tier.nextSteps,
    phases: [
      {
        horizon: "30-day",
        title: "30-Day Priorities",
        items: tier.roadmap.day30,
      },
      {
        horizon: "60-day",
        title: "60-Day Priorities",
        items: tier.roadmap.day60,
      },
      {
        horizon: "90-day",
        title: "90-Day Priorities",
        items: tier.roadmap.day90,
      },
      {
        horizon: "long-term",
        title: "Long-Term Considerations",
        items: tier.roadmap.longTerm,
      },
    ],
    generatedAt: new Date().toISOString(),
  };
}

/** Serializable blueprint payload for PDF generation (future). */
export type BlueprintPdfPayload = AssessmentBlueprint & {
  contact?: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
  };
  submissionId?: string | null;
};

export function toPdfPayload(
  blueprint: AssessmentBlueprint,
  extras?: Omit<BlueprintPdfPayload, keyof AssessmentBlueprint>,
): BlueprintPdfPayload {
  return { ...blueprint, ...extras };
}
