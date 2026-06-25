import { AssessmentFlow } from "@/components/assessment/assessment-flow";
import { AssessmentShell } from "@/components/assessment/assessment-shell";
import type { AssessmentId } from "@/lib/assessment-config";

export function AssessmentFunnelPage({
  assessmentId,
}: {
  assessmentId: AssessmentId;
}) {
  return (
    <AssessmentShell showFooter={false}>
      <section className="border-t border-white/5 py-10 md:py-24">
        <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-0">
          <AssessmentFlow assessmentId={assessmentId} />
        </div>
      </section>
    </AssessmentShell>
  );
}
