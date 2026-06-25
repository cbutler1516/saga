/** Supabase Auth for client portal (anon key — never use service role in browser). */
export function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Development-only placeholder login when Supabase Auth is not configured. */
export function isDevPortalAuthEnabled(): boolean {
  return !isSupabaseAuthConfigured() && process.env.NODE_ENV === "development";
}

export function isPortalAuthAvailable(): boolean {
  return isSupabaseAuthConfigured() || isDevPortalAuthEnabled();
}

export function getPortalAuthMode(): "supabase" | "dev" | "unavailable" {
  if (isSupabaseAuthConfigured()) return "supabase";
  if (isDevPortalAuthEnabled()) return "dev";
  return "unavailable";
}
