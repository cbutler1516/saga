import {
  PortalPageHeader,
  PortalPanel,
  PortalStat,
} from "@/components/portal/portal-ui";
import { mockMetrics } from "@/lib/portal/mock-data";

export default function PortalMetricsPage() {
  const data = mockMetrics;

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Operating Metrics"
        description="High-level operating and compliance metrics for your mortgage company. No borrower-level data is stored or displayed."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <PortalStat label="Active states" value={data.activeStates} />
        <PortalStat label="LOs tracked" value={data.loanOfficersTracked} />
        <PortalStat label="Reports completed" value={data.reportsCompleted} />
        <PortalStat label="Upcoming renewals" value={data.upcomingRenewals} />
        <PortalStat label="Open exceptions" value={data.openExceptions} />
      </div>

      <PortalPanel title="Reporting activity (last 6 months)">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {data.monthlyTrend.map((month) => (
            <div
              key={month.label}
              className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-4 text-center"
            >
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                {month.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {month.reports}
              </p>
              <p className="mt-1 text-[10px] text-zinc-600">reports</p>
            </div>
          ))}
        </div>
      </PortalPanel>
    </div>
  );
}
