import type { Metadata } from "next";
import Link from "next/link";
import { PlaybookCta } from "@/components/playbook/playbook-cta";
import { PageShell } from "@/components/site/page-shell";
import {
  getLibraryArticlesByCollection,
  libraryCollections,
} from "@/lib/library";

export const metadata: Metadata = {
  title: "Foundry Library — Mortgage Company Ownership Education",
  description:
    "The Foundry Library helps experienced mortgage professionals make better decisions about ownership, compliance, operations, growth, technology, and AI.",
};

export default function LibraryPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.06] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#FF6A00]">
            Foundry Library
          </p>
          <h1 className="mt-6 max-w-[14ch] text-[clamp(3rem,8vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-gradient">
            Ownership intelligence for serious mortgage professionals.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl lg:leading-[1.7]">
            Practical, executive-level guidance on starting, operating, scaling,
            and modernizing a mortgage company. Built to help you make better
            ownership decisions.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            <Link
              href="/library/complete-guide-starting-mortgage-company"
              className="group steel-surface blueprint-frame rounded-3xl border border-[#FF6A00]/20 p-6 transition-colors hover:border-[#FF6A00]/35 sm:p-8 lg:p-10"
            >
              <div className="molten-line mb-6 h-px w-16" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
                Flagship Guide · 2026
              </p>
              <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
                The Complete Guide to Starting Your Own Mortgage Company
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                Placeholder framework for Foundry&apos;s definitive guide to
                ownership, costs, licensing, compliance, operations, technology,
                and launch planning.
              </p>
              <p className="mt-7 text-sm font-medium text-zinc-300 transition-colors group-hover:text-[#FF6A00]">
                Open flagship guide →
              </p>
            </Link>
            <PlaybookCta />
            {libraryCollections.map((collection) => {
              const articles = getLibraryArticlesByCollection(collection.id);
              return (
                <section
                  key={collection.id}
                  className="steel-surface blueprint-frame rounded-3xl border border-white/[0.08] p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
                    <div>
                      <div className="molten-line mb-6 h-px w-14" />
                      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
                        {collection.title}
                      </h2>
                      <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
                        {collection.description}
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/library/${article.slug}`}
                          className="group rounded-2xl border border-white/[0.08] bg-black/20 p-5 transition-colors hover:border-[#FF6A00]/30 hover:bg-[#FF6A00]/[0.035]"
                        >
                          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
                            {article.readTime}
                          </p>
                          <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                            {article.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                            {article.description}
                          </p>
                          <p className="mt-5 text-sm font-medium text-zinc-300 transition-colors group-hover:text-[#FF6A00]">
                            Read briefing →
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
