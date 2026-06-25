import Link from "next/link";
import { FoundryLogo } from "@/components/brand/FoundryLogo";
import { primaryPromise } from "@/lib/site-content";

const footerNav = [
  { href: "/what-we-do", label: "What We Do" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/assessment", label: "Assessment" },
  { href: "/why-us", label: "Why Foundry" },
  { href: "/trust-and-security", label: "Trust & Security" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <FoundryLogo size="large" variant="full" asLink={true} />
            <p className="mt-6 text-sm leading-relaxed text-[#A7A7A7]">
              {primaryPromise}
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#A7A7A7] transition-colors hover:text-[#E6E6E6]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#A7A7A7]/70">
            © {new Date().getFullYear()} Foundry. All rights reserved.
          </p>
          <Link
            href="/assessment"
            className="text-xs text-[#A7A7A7] transition-colors hover:text-[#FF6A00]"
          >
            Find Out If You&apos;re Ready →
          </Link>
        </div>
      </div>
    </footer>
  );
}
