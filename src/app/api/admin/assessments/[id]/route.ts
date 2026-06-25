import { NextResponse } from "next/server";
import { adminNotFoundResponse, isAdminEnabled } from "@/lib/admin";
import {
  fetchSubmissionById,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import {
  getFollowUpAngle,
  resolveAnswerLabels,
} from "@/lib/admin-submissions";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isAdminEnabled()) {
    return adminNotFoundResponse();
  }

  const { id } = await context.params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  try {
    const submission = await fetchSubmissionById(id);

    if (!submission) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({
      submission,
      answerLabels: resolveAnswerLabels(
        submission.assessment_type,
        submission.answers,
      ),
      followUpAngle: getFollowUpAngle(submission),
    });
  } catch (error) {
    console.error("[Admin assessment detail]", error);
    return NextResponse.json(
      { error: "Unable to fetch submission." },
      { status: 500 },
    );
  }
}
