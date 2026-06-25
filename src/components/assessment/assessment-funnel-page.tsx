import { AssessmentFlow } from "@/components/assessment/assessment-flow";
import { AssessmentShell } from "@/components/assessment/assessment-shell";
import type { AssessmentId } from "@/lib/assessment-config";
import { getAssessment } from "@/lib/assessment-config";

export function AssessmentFunnelPage({
  assessmentId,
}: {
  assessmentId: AssessmentId;
}) {
  const config = getAssessment(assessmentId);

  return (
    <AssessmentShell showFooter={false}>
      <section className="border-t border-white/5 py-10 md:py-24">
        <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-0">
          <p className="mb-8 text-[15px] leading-relaxed text-zinc-500 md:mb-12">
            {config.pageDescription}
          </p>
          <AssessmentFlow assessmentId={assessmentId} />
        </div>
      </section>
    </AssessmentShell>
  );
}
