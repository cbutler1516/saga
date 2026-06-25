import Link from "next/link";
import { PageContainer } from "@/components/site/page-container";
import { PageShell } from "@/components/site/page-shell";

export function AssessmentShell({
  children,
  showFooter = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <PageShell>
      {children}
      {showFooter ? (
        <section className="border-t border-white/5 py-12">
          <PageContainer className="max-w-3xl text-center">
            <p className="text-sm leading-relaxed text-zinc-500">
              These assessments are confidential and advisory. They do not
              constitute legal advice, guarantee any regulatory outcome, or
              imply approval by any warehouse lender or investor.
            </p>
            <Link
              href="/assessment"
              className="mt-4 inline-block text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Find Out If You&apos;re Ready →
            </Link>
          </PageContainer>
        </section>
      ) : null}
    </PageShell>
  );
}
