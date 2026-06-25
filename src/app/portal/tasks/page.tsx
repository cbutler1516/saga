import { PortalPageHeader, PortalPanel, StatusPill } from "@/components/portal/portal-ui";
import { mockTasks } from "@/lib/portal/mock-data";

export default function PortalTasksPage() {
  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Tasks & Deadlines"
        description="Compliance and operating tasks tracked by Foundry for your company."
      />

      <PortalPanel title="All tasks">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                <th className="pb-3 pr-4 font-medium">Task</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Due</th>
                <th className="pb-3 pr-4 font-medium">Priority</th>
                <th className="pb-3 pr-4 font-medium">Owner</th>
                <th className="pb-3 font-medium">Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockTasks.map((task) => (
                <tr key={task.id} className="text-zinc-300">
                  <td className="py-4 pr-4 align-top text-zinc-200">
                    {task.title}
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <StatusPill
                      tone={
                        task.status === "Completed"
                          ? "good"
                          : task.priority === "High"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {task.status}
                    </StatusPill>
                  </td>
                  <td className="py-4 pr-4 align-top text-zinc-400">
                    {task.dueDate}
                  </td>
                  <td className="py-4 pr-4 align-top text-zinc-400">
                    {task.priority}
                  </td>
                  <td className="py-4 pr-4 align-top text-zinc-400">
                    {task.owner}
                  </td>
                  <td className="py-4 align-top text-zinc-400">
                    {task.complianceArea}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PortalPanel>
    </div>
  );
}
