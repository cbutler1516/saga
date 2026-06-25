import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatAssessmentType,
  formatContactName,
  formatDate,
  getFollowUpAngle,
  resolveAnswerLabels,
} from "@/lib/admin-submissions";
import {
  fetchSubmissionById,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { getAssessment, type AssessmentId } from "@/lib/assessment-config";

export const metadata: Metadata = {
  title: "Submission detail — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAssessmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    notFound();
  }

  let submission;
  try {
    submission = await fetchSubmissionById(id);
  } catch {
    notFound();
  }

  if (!submission) {
    notFound();
  }

  const answerLabels = resolveAnswerLabels(
    submission.assessment_type,
    submission.answers,
  );
  const followUp = getFollowUpAngle(submission);
  const config = getAssessment(submission.assessment_type as AssessmentId);

  return (
    <div>
      <Link
        href="/admin/assessments"
        className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-800"
      >
        ← All submissions
      </Link>

      <div className="mt-8 border-b border-zinc-200/90 pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          Submission detail
        </p>
        <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-zinc-900">
          {formatContactName(submission.contact)}
        </h1>
        <p className="mt-2 text-[15px] text-zinc-500">
          {formatAssessmentType(submission.assessment_type)} ·{" "}
          {submission.created_at
            ? formatDate(submission.created_at)
            : "—"}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="border border-zinc-200/90 bg-white p-6 lg:col-span-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Readiness
          </p>
          <p className="mt-4 font-serif text-xl font-medium text-zinc-900">
            {submission.tier}
          </p>
          <p className="mt-2 font-mono text-[13px] text-zinc-500">
            {submission.score} / {config.maxScore} points
          </p>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Assessment
          </p>
          <p className="mt-2 text-[15px] text-zinc-700">
            {formatAssessmentType(submission.assessment_type)}
          </p>
        </div>

        <div className="border border-zinc-200/90 bg-white p-6 lg:col-span-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Contact
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] text-zinc-500">Name</dt>
              <dd className="mt-1 text-[15px] text-zinc-900">
                {formatContactName(submission.contact)}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-zinc-500">Email</dt>
              <dd className="mt-1 text-[15px] text-zinc-900">
                <a
                  href={`mailto:${submission.contact.email}`}
                  className="underline underline-offset-2"
                >
                  {submission.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-zinc-500">Phone</dt>
              <dd className="mt-1 text-[15px] text-zinc-900">
                {submission.contact.phone}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-zinc-500">Company</dt>
              <dd className="mt-1 text-[15px] text-zinc-900">
                {submission.contact.company || "—"}
              </dd>
            </div>
          </dl>
          {submission.contact.note && (
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                Confidential note
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
                {submission.contact.note}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border border-zinc-200/90 bg-white p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
          Suggested follow-up angle
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">
          {followUp}
        </p>
      </div>

      <div className="mt-6 border border-zinc-200/90 bg-white">
        <div className="border-b border-zinc-200/90 bg-[#F7F6F3] px-6 py-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Assessment answers
          </p>
        </div>
        <div className="divide-y divide-zinc-100">
          {answerLabels.map((item) => (
            <div
              key={item.question}
              className="grid gap-2 px-6 py-5 sm:grid-cols-[1fr_1fr]"
            >
              <p className="text-[14px] text-zinc-500">{item.question}</p>
              <p className="text-[14px] font-medium text-zinc-900">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-zinc-200/90 bg-white p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
          Source &amp; attribution
        </p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] text-zinc-500">Source</dt>
            <dd className="mt-1 font-mono text-[13px] text-zinc-700">
              {submission.source ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] text-zinc-500">Submission ID</dt>
            <dd className="mt-1 font-mono text-[13px] text-zinc-700">
              {submission.id}
            </dd>
          </div>
          {submission.utm &&
            Object.entries(submission.utm).map(([key, value]) =>
              value ? (
                <div key={key}>
                  <dt className="text-[12px] text-zinc-500">{key}</dt>
                  <dd className="mt-1 font-mono text-[13px] text-zinc-700">
                    {value}
                  </dd>
                </div>
              ) : null,
            )}
          {(!submission.utm ||
            !Object.values(submission.utm).some(Boolean)) && (
            <div className="sm:col-span-2">
              <p className="text-[14px] text-zinc-500">No UTM parameters recorded.</p>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
