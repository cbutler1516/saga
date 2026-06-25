import { NextResponse } from "next/server";
import { adminNotFoundResponse, isAdminEnabled } from "@/lib/admin";
import {
  fetchAllSubmissions,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export async function GET() {
  if (!isAdminEnabled()) {
    return adminNotFoundResponse();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      submissions: [],
    });
  }

  try {
    const submissions = await fetchAllSubmissions();
    return NextResponse.json({
      configured: true,
      submissions,
    });
  } catch (error) {
    console.error("[Admin assessments fetch]", error);
    return NextResponse.json(
      { error: "Unable to fetch submissions." },
      { status: 500 },
    );
  }
}
