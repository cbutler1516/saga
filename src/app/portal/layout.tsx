import { redirect } from "next/navigation";
import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { getPortalSession } from "@/lib/portal/session";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPortalSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#E6E6E6]">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
        <PortalSidebar
          companyName={session.companyName}
          userEmail={session.email}
        />
      </div>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <div className="border-b border-white/10 bg-[#080808] px-4 py-3 lg:hidden">
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
            {session.companyName}
          </p>
          <nav className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1">
            {[
              ["Dashboard", "/portal"],
              ["Documents", "/portal/documents"],
              ["Tasks", "/portal/tasks"],
              ["Compliance", "/portal/compliance"],
              ["Metrics", "/portal/metrics"],
              ["Settings", "/portal/settings"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-[44px] shrink-0 items-center rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <main className="flex-1 px-4 py-6 pb-safe sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
