import type { Metadata } from "next";
import { AssessmentFunnelPage } from "@/components/assessment/assessment-funnel-page";
import { getAssessment } from "@/lib/assessment-config";

const config = getAssessment("independence");

export const metadata: Metadata = {
  title: `${config.pageTitle} — Foundry`,
  description: config.pageDescription,
};

export default function IndependenceAssessmentPage() {
  return <AssessmentFunnelPage assessmentId="independence" />;
}
