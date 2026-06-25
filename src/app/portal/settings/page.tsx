import { PortalPageHeader, PortalPanel } from "@/components/portal/portal-ui";
import { getPortalSession } from "@/lib/portal/session";

export default async function PortalSettingsPage() {
  const session = await getPortalSession();

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Settings"
        description="Company and user preferences. Profile management will expand in a future release."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <PortalPanel title="Company profile">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-zinc-500">Company name</dt>
              <dd className="mt-1 text-zinc-200">{session?.companyName}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Client status</dt>
              <dd className="mt-1 text-zinc-200">Active client</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Company ID</dt>
              <dd className="mt-1 font-mono text-xs text-zinc-500">
                {session?.companyId}
              </dd>
            </div>
          </dl>
        </PortalPanel>

        <PortalPanel title="User profile">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="mt-1 text-zinc-200">{session?.email}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">User ID</dt>
              <dd className="mt-1 font-mono text-xs text-zinc-500">
                {session?.userId}
              </dd>
            </div>
          </dl>
        </PortalPanel>
      </div>

      <PortalPanel title="Notification preferences">
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3">
            <span>Compliance deadline reminders</span>
            <span className="text-xs text-zinc-600">Coming soon</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3">
            <span>Document upload notifications</span>
            <span className="text-xs text-zinc-600">Coming soon</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3">
            <span>Monthly operating summary</span>
            <span className="text-xs text-zinc-600">Coming soon</span>
          </li>
        </ul>
      </PortalPanel>
    </div>
  );
}
