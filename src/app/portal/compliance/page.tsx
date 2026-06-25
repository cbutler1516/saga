import {
  PortalPageHeader,
  PortalPanel,
  PortalStat,
  StatusPill,
} from "@/components/portal/portal-ui";
import { mockComplianceOverview } from "@/lib/portal/mock-data";

export default function PortalCompliancePage() {
  const data = mockComplianceOverview;

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Compliance Overview"
        description="High-level readiness across policies, reporting, licensing, and exam preparation."
      />

      <PortalPanel title="Compliance readiness">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Overall readiness</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {data.readinessScore}
            </p>
          </div>
          <StatusPill tone="good">{data.readinessScore}</StatusPill>
        </div>
      </PortalPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <PortalPanel title="Policy library">
          <p className="text-lg font-medium text-zinc-200">
            {data.policyLibrary.status}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Last updated {data.policyLibrary.lastUpdated}
          </p>
        </PortalPanel>

        <PortalPanel title="MCR / HMDA">
          <p className="text-lg font-medium text-zinc-200">{data.mcrHmda.status}</p>
          <p className="mt-2 text-sm text-zinc-500">
            Next due: {data.mcrHmda.nextDue}
          </p>
        </PortalPanel>

        <PortalPanel title="State licensing">
          <p className="text-lg font-medium text-zinc-200">
            {data.stateLicensing.status}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {data.stateLicensing.renewalsDue} renewal due · Next:{" "}
            {data.stateLicensing.nextRenewal}
          </p>
        </PortalPanel>

        <PortalPanel title="Exam readiness">
          <p className="text-lg font-medium text-zinc-200">
            {data.examReadiness.status}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Last review {data.examReadiness.lastReview}
          </p>
          <div className="mt-4">
            <PortalStat
              label="Open gaps"
              value={data.examReadiness.openGaps}
            />
          </div>
        </PortalPanel>
      </div>
    </div>
  );
}
