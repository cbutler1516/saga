import type { Metadata } from "next";
import Link from "next/link";
import {
  formatAssessmentType,
  formatContactName,
  formatDate,
} from "@/lib/admin-submissions";
import { isSupabaseConfigured, fetchAllSubmissions } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Assessments — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAssessmentsPage() {
  const configured = isSupabaseConfigured();
  let submissions: Awaited<ReturnType<typeof fetchAllSubmissions>> = [];
  let fetchError: string | null = null;

  if (configured) {
    try {
      submissions = await fetchAllSubmissions();
    } catch {
      fetchError = "Unable to load submissions. Check Supabase connection.";
    }
  }

  return (
    <div>
      <div className="border-b border-zinc-200/90 pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          Lead capture
        </p>
        <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-zinc-900">
          Assessment submissions
        </h1>
        <p className="mt-3 text-[15px] text-zinc-500">
          {configured
            ? `${submissions.length} submission${submissions.length === 1 ? "" : "s"}`
            : "Supabase not connected"}
        </p>
      </div>

      {!configured && (
        <div className="mt-10 border border-zinc-200/90 bg-white px-8 py-10">
          <h2 className="text-[15px] font-medium text-zinc-900">
            Supabase is not connected
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-zinc-600">
            Set{" "}
            <code className="font-mono text-[13px] text-zinc-700">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="font-mono text-[13px] text-zinc-700">
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            in your environment, then run the schema in{" "}
            <code className="font-mono text-[13px] text-zinc-700">
              supabase/schema.sql
            </code>
            . Submissions are logged to the console in dev when Supabase is
            unavailable.
          </p>
        </div>
      )}

      {fetchError && (
        <div className="mt-10 border border-red-200 bg-red-50 px-8 py-6 text-[15px] text-red-800">
          {fetchError}
        </div>
      )}

      {configured && !fetchError && submissions.length === 0 && (
        <div className="mt-10 border border-zinc-200/90 bg-white px-8 py-10">
          <p className="text-[15px] text-zinc-600">
            No submissions yet. Complete an assessment at{" "}
            <Link href="/assessment" className="text-zinc-900 underline">
              /assessment
            </Link>{" "}
            to see data here.
          </p>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="mt-10 overflow-x-auto border border-zinc-200/90 bg-white">
          <table className="w-full min-w-[800px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-zinc-200/90 bg-[#F7F6F3]">
                <th className="px-5 py-3 font-medium text-zinc-500">Type</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Score</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Tier</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Name</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Email</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Phone</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Company</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Date</th>
                <th className="px-5 py-3 font-medium text-zinc-500"></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="px-5 py-4 text-zinc-700">
                    {formatAssessmentType(row.assessment_type)}
                  </td>
                  <td className="px-5 py-4 font-mono text-[13px] text-zinc-600">
                    {row.score}
                  </td>
                  <td className="px-5 py-4 text-zinc-700">{row.tier}</td>
                  <td className="px-5 py-4 text-zinc-900">
                    {formatContactName(row.contact)}
                  </td>
                  <td className="px-5 py-4 text-zinc-600">
                    {row.contact.email ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-zinc-600">
                    {row.contact.phone ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-zinc-600">
                    {row.contact.company || "—"}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-zinc-500">
                    {row.created_at ? formatDate(row.created_at) : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/assessments/${row.id}`}
                      className="text-[13px] text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
