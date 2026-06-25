import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function createServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type AssessmentSubmissionRow = {
  id?: string;
  assessment_type: string;
  score: number;
  tier: string;
  answers: Record<string, string>;
  contact: Record<string, string | undefined>;
  utm?: Record<string, string | undefined> | null;
  source?: string | null;
  created_at?: string;
};

export type AdminSubmission = AssessmentSubmissionRow & {
  id: string;
  created_at: string;
};

export async function insertAssessmentSubmission(
  row: AssessmentSubmissionRow,
): Promise<{ id: string | null; persisted: boolean }> {
  const client = createServiceClient();

  if (!client) {
    return { id: null, persisted: false };
  }

  const { data, error } = await client
    .from("assessment_submissions")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return { id: data?.id ?? null, persisted: true };
}

export async function fetchAllSubmissions(): Promise<AdminSubmission[]> {
  const client = createServiceClient();
  if (!client) return [];

  const { data, error } = await client
    .from("assessment_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  return (data ?? []) as AdminSubmission[];
}

export async function fetchSubmissionById(
  id: string,
): Promise<AdminSubmission | null> {
  const client = createServiceClient();
  if (!client) return null;

  const { data, error } = await client
    .from("assessment_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  return data as AdminSubmission | null;
}
