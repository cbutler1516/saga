import Link from "next/link";
import { PlaybookCta } from "@/components/playbook/playbook-cta";
import { ButtonLink } from "@/components/ui/button-link";
import type { LibraryArticle } from "@/lib/library";
import {
  getLibraryArticle,
  getLibraryCollection,
} from "@/lib/library";
import { ReadingProgress } from "./reading-progress";

function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ArticleSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.06] py-12">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-white">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3"
        >
          <span className="text-[#FF6A00]" aria-hidden>
            ✓
          </span>
          <span className="text-[15px] leading-relaxed text-zinc-300">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function ArticleTemplate({ article }: { article: LibraryArticle }) {
  const collection = getLibraryCollection(article.collectionId);
  const tocItems = [
    { id: "executive-summary", label: "Executive Summary" },
    ...article.mainContent.map((section) => ({
      id: slugifyHeading(section.heading),
      label: section.heading,
    })),
    { id: "practical-checklist", label: "Practical Checklist" },
    { id: "common-mistakes", label: "Common Mistakes" },
    { id: "related-resources", label: "Related Resources" },
    { id: "next-step", label: "Next Recommended Step" },
  ];
  const related = article.relatedSlugs
    .map((slug) => getLibraryArticle(slug))
    .filter(Boolean) as LibraryArticle[];

  return (
    <>
      <ReadingProgress />
      <article className="relative">
        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute inset-0">
            <div className="grid-bg absolute inset-0 opacity-20" />
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.06] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <Link
              href="/library"
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              ← Foundry Library
            </Link>
            <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
              {collection?.title}
            </p>
            <h1 className="mt-5 max-w-[18ch] text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-gradient">
              {article.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl lg:leading-[1.7]">
              {article.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-500">
              <span>{article.readTime}</span>
              <span aria-hidden>·</span>
              <span>{article.eyebrow}</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-24">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                Contents
              </p>
              <nav className="mt-5 space-y-3">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm leading-relaxed text-zinc-500 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="steel-surface blueprint-frame rounded-2xl border border-white/[0.08] p-6 sm:p-8">
              <p className="text-2xl font-medium leading-snug tracking-[-0.03em] text-white sm:text-3xl">
                “{article.pullQuote}”
              </p>
            </div>

            <ArticleSection
              id="executive-summary"
              eyebrow="Briefing"
              title="Executive Summary"
            >
              <div className="space-y-4 text-[17px] leading-[1.8] text-zinc-300">
                {article.executiveSummary.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </ArticleSection>

            {article.mainContent.map((section) => (
              <ArticleSection
                key={section.heading}
                id={slugifyHeading(section.heading)}
                title={section.heading}
              >
                <div className="space-y-5 text-[17px] leading-[1.85] text-zinc-400">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </ArticleSection>
            ))}

            <ArticleSection id="practical-checklist" title="Practical Checklist">
              <Checklist items={article.practicalChecklist} />
            </ArticleSection>

            <ArticleSection id="common-mistakes" title="Common Mistakes">
              <div className="grid gap-3">
                {article.commonMistakes.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[15px] leading-relaxed text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ArticleSection>

            <div className="my-10 rounded-2xl border border-[#FF6A00]/20 bg-[#FF6A00]/[0.04] p-6 sm:p-8">
              <p className="text-xl font-semibold tracking-[-0.02em] text-white">
                Wondering how this applies to your business?
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                Take the Foundry Ownership Readiness Review.
              </p>
              <ButtonLink href="/assessment" className="mt-6 min-h-[46px] w-full sm:w-auto">
                Start the Ownership Readiness Review
              </ButtonLink>
            </div>

            <div className="my-10">
              <PlaybookCta compact />
            </div>

            <ArticleSection id="related-resources" title="Related Resources">
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/library/${item.slug}`}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-[#FF6A00]/30 hover:bg-[#FF6A00]/[0.035]"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FF6A00]">
                      {getLibraryCollection(item.collectionId)?.title}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </ArticleSection>

            <ArticleSection id="next-step" title="Next Recommended Step">
              <div className="steel-surface blueprint-frame rounded-3xl border border-white/[0.08] p-6 sm:p-8">
                <div className="molten-line mb-6 h-px w-16" />
                <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white">
                  {article.nextStep.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                  {article.nextStep.body}
                </p>
                <ButtonLink href="/assessment" className="mt-7 min-h-[46px] w-full sm:w-auto">
                  Take the Foundry Ownership Readiness Review
                </ButtonLink>
              </div>
            </ArticleSection>
          </div>
        </div>
      </article>
    </>
  );
}
