"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FoundryLogo } from "@/components/brand/FoundryLogo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/portal", label: "Dashboard", exact: true },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/tasks", label: "Tasks" },
  { href: "/portal/compliance", label: "Compliance" },
  { href: "/portal/metrics", label: "Metrics" },
  { href: "/portal/settings", label: "Settings" },
];

export function PortalSidebar({
  companyName,
  userEmail,
}: {
  companyName: string;
  userEmail: string;
}) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-[#080808] lg:w-64 lg:shrink-0">
      <div className="border-b border-white/10 px-5 py-5">
        <FoundryLogo size="small" variant="compact" />
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
          Client Portal
        </p>
        <p className="mt-2 truncate text-sm font-medium text-zinc-200">
          {companyName}
        </p>
        <p className="mt-1 truncate text-xs text-zinc-500">{userEmail}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-[#FF6A00]/10 text-[#E6E6E6] ring-1 ring-[#FF6A00]/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <Link
          href="/"
          className="block text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          ← Public site
        </Link>
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="mt-3 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
