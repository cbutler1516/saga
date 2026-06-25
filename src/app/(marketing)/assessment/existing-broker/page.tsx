import type { Metadata } from "next";
import { AssessmentFunnelPage } from "@/components/assessment/assessment-funnel-page";
import { getAssessment } from "@/lib/assessment-config";

const config = getAssessment("existing-broker");

export const metadata: Metadata = {
  title: `${config.pageTitle} — Foundry`,
  description: config.pageDescription,
};

export default function ExistingBrokerAssessmentPage() {
  return <AssessmentFunnelPage assessmentId="existing-broker" />;
}
