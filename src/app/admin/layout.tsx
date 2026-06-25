import { notFound } from "next/navigation";
import Link from "next/link";
import { isAdminEnabled } from "@/lib/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminEnabled()) {
    notFound();
  }

  return (
    <div className="min-h-full bg-[#F7F6F3] text-zinc-800 antialiased">
      <header className="border-b border-zinc-200/90 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-serif text-[16px] font-medium text-zinc-900"
            >
              Foundry
            </Link>
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Internal · Dev only
            </span>
          </div>
          <nav className="flex items-center gap-6 text-[13px] text-zinc-500">
            <Link
              href="/admin/assessments"
              className="transition-colors hover:text-zinc-800"
            >
              Assessments
            </Link>
            <Link href="/" className="transition-colors hover:text-zinc-800">
              Public site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
        {children}
      </main>
    </div>
  );
}
