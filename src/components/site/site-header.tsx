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
  { href: "/library", label: "Library" },
  { href: "/assessment", label: "Assessment", emphasize: true },
  { href: "/why-us", label: "Why Foundry" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 min-h-16 border-b border-white/[0.06] bg-[#050505]/80 pt-safe backdrop-blur-xl sm:min-h-[72px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8 lg:px-10 xl:px-12">
        <div className="min-w-0 shrink">
          <FoundryLogo
            size="header"
            variant="compact"
            markClassName="!h-9 sm:!h-10 lg:!h-[42px]"
          />
        </div>

        <nav className="hidden items-center gap-9 xl:gap-11 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative whitespace-nowrap py-2 text-sm text-[#A7A7A7] transition-colors hover:text-[#FF8A2E]",
                pathname.startsWith(item.href) && "text-[#FF6A00]",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#FF6A00] transition-transform duration-300",
                  pathname.startsWith(item.href)
                    ? "scale-x-100"
                    : "group-hover:scale-x-100",
                )}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/login"
            className="whitespace-nowrap text-sm text-[#A7A7A7] transition-colors hover:text-[#E6E6E6]"
          >
            Client Login
          </Link>
          <ButtonLink
            href="/assessment"
            variant="primary"
            className="min-h-0 whitespace-nowrap px-5 py-2 text-[13px]"
          >
            Start Assessment
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
