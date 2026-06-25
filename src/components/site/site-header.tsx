"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FoundryLogo } from "@/components/brand/FoundryLogo";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/what-we-do", label: "What We Do" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/assessment", label: "Assessment", emphasize: true },
  { href: "/why-us", label: "Why Foundry" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 min-h-16 border-b border-white/[0.06] bg-[#050505]/80 pt-safe backdrop-blur-xl sm:min-h-[72px]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <div className="min-w-0 shrink">
          <FoundryLogo
            size="header"
            variant="compact"
            showTagline
            hideTaglineOnMobile
          />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                item.emphasize
                  ? "rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/8 px-4 py-1.5 font-medium text-[#E6E6E6] hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/12"
                  : "text-[#A7A7A7] hover:text-[#E6E6E6]",
                !item.emphasize &&
                  pathname.startsWith(item.href) &&
                  "text-[#E6E6E6]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/login"
            className="text-sm text-[#A7A7A7] transition-colors hover:text-[#E6E6E6]"
          >
            Client Login
          </Link>
          <ButtonLink
            href="/assessment"
            variant="primary"
            className="px-5 py-2.5 text-[13px]"
          >
            Find Out If You&apos;re Ready
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#A7A7A7] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d={open ? "M4 4L14 14M14 4L4 14" : "M2 5H16M2 9H16M2 13H16"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#050505]/95 pb-safe lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[44px] items-center rounded-lg px-3 text-sm hover:bg-white/5",
                  item.emphasize
                    ? "font-medium text-[#FF6A00]"
                    : "text-[#A7A7A7]",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-[#A7A7A7] hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              Client Login
            </Link>
            <ButtonLink
              href="/assessment"
              variant="primary"
              className="mt-2 min-h-[44px] w-full"
            >
              Find Out If You&apos;re Ready
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
