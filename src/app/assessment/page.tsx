import type { Metadata } from "next";
import { AssessmentLanding } from "@/components/assessment/assessment-landing";
import { AssessmentShell } from "@/components/assessment/assessment-shell";
import { siteKeywords } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Assessment — Could You Own Your Own Mortgage Company?",
  description:
    "Answer a few questions to understand what's realistic, what might slow you down, and what your best next step should be — whether you're thinking about ownership, already own a brokerage, or exploring correspondent.",
  keywords: [...siteKeywords],
};

export default function AssessmentLandingPage() {
  return (
    <AssessmentShell showFooter={false}>
      <AssessmentLanding />
    </AssessmentShell>
  );
}
