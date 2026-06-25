import Link from "next/link";
import {
  PortalPageHeader,
  PortalPanel,
  PortalStat,
  StatusPill,
} from "@/components/portal/portal-ui";
import {
  mockClientDashboard,
  mockRecentDocuments,
  mockTasks,
} from "@/lib/portal/mock-data";
import { getPortalSession } from "@/lib/portal/session";

export default async function PortalDashboardPage() {
  const session = await getPortalSession();
  const data = mockClientDashboard;

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title={`Welcome back${session?.email ? "" : ""}`}
        description="Your operating snapshot — documents, compliance readiness, tasks, and metrics in one place."
      />

      <PortalPanel title="Welcome">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-medium text-white">{data.companyName}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusPill tone="good">{data.status}</StatusPill>
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              Next compliance milestone:{" "}
              <span className="text-zinc-200">{data.nextMilestone}</span>
            </p>
          </div>
          <p className="text-xs text-zinc-600">
            Signed in as {session?.email}
          </p>
        </div>
      </PortalPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <PortalPanel title="Compliance Readiness">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Overall status</span>
              <StatusPill tone="good">
                {data.complianceReadiness.overall}
              </StatusPill>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PortalStat
                label="Open items"
                value={data.complianceReadiness.openItems}
              />
              <PortalStat
                label="Upcoming deadlines"
                value={data.complianceReadiness.upcomingDeadlines}
              />
            </div>
            <p className="text-xs text-zinc-500">
              Last review: {data.complianceReadiness.lastReviewDate}
            </p>
            <Link
              href="/portal/compliance"
              className="inline-flex text-sm text-[#FF6A00] hover:text-[#FF7A1A]"
            >
              View compliance overview →
            </Link>
          </div>
        </PortalPanel>

        <PortalPanel title="Metrics Snapshot">
          <div className="grid grid-cols-2 gap-3">
            <PortalStat label="States active" value={data.metrics.statesActive} />
            <PortalStat
              label="Loan officers"
              value={data.metrics.loanOfficersTracked}
            />
            <PortalStat
              label="Open compliance items"
              value={data.metrics.openComplianceItems}
            />
            <PortalStat
              label="Documents stored"
              value={data.metrics.documentsStored}
            />
          </div>
          <Link
            href="/portal/metrics"
            className="mt-4 inline-flex text-sm text-[#FF6A00] hover:text-[#FF7A1A]"
          >
            View metrics →
          </Link>
        </PortalPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PortalPanel title="Document Vault — Recent">
          <ul className="space-y-3">
            {mockRecentDocuments.map((doc) => (
              <li
                key={doc.id}
                className="rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3"
              >
                <p className="text-sm font-medium text-zinc-200">{doc.name}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {doc.category} · Updated {doc.updatedAt}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/portal/documents"
            className="mt-4 inline-flex text-sm text-[#FF6A00] hover:text-[#FF7A1A]"
          >
            Open document vault →
          </Link>
        </PortalPanel>

        <PortalPanel title="Tasks & Deadlines">
          <ul className="space-y-3">
            {mockTasks.slice(0, 4).map((task) => (
              <li
                key={task.id}
                className="rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-zinc-200">{task.title}</p>
                  <StatusPill
                    tone={task.priority === "High" ? "warn" : "neutral"}
                  >
                    {task.status}
                  </StatusPill>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Due {task.dueDate} · {task.complianceArea}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/portal/tasks"
            className="mt-4 inline-flex text-sm text-[#FF6A00] hover:text-[#FF7A1A]"
          >
            View all tasks →
          </Link>
        </PortalPanel>
      </div>
    </div>
  );
}
