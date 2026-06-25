import type { Metadata } from "next";
import { AssessmentFunnelPage } from "@/components/assessment/assessment-funnel-page";
import { getAssessment } from "@/lib/assessment-config";

const config = getAssessment("correspondent");

export const metadata: Metadata = {
  title: `${config.pageTitle} — Foundry`,
  description: config.pageDescription,
};

export default function CorrespondentAssessmentPage() {
  return <AssessmentFunnelPage assessmentId="correspondent" />;
}
