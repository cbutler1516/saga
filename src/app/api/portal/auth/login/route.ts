import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getPortalAuthMode,
  isDevPortalAuthEnabled,
  isSupabaseAuthConfigured,
} from "@/lib/portal/auth";
import {
  buildSessionCookieValue,
  setPortalSessionCookie,
} from "@/lib/portal/session";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const password = typeof record.password === "string" ? record.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  const mode = getPortalAuthMode();

  if (mode === "unavailable") {
    return NextResponse.json(
      { error: "Client portal authentication is not configured." },
      { status: 503 },
    );
  }

  if (mode === "supabase" && isSupabaseAuthConfigured()) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const cookieValue = buildSessionCookieValue({
      mode: "supabase",
      userId: data.user.id,
      email: data.user.email ?? email,
      companyId: "mock-company-1",
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    });

    await setPortalSessionCookie(cookieValue);

    return NextResponse.json({
      success: true,
      mode: "supabase",
      email: data.user.email,
    });
  }

  if (mode === "dev" && isDevPortalAuthEnabled()) {
    const devPassword =
      process.env.PORTAL_DEV_PASSWORD?.trim() || "foundry-dev";

    if (password !== devPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const cookieValue = buildSessionCookieValue({
      mode: "dev",
      userId: "dev-portal-user",
      email,
      companyId: "mock-company-1",
    });

    await setPortalSessionCookie(cookieValue);

    return NextResponse.json({
      success: true,
      mode: "dev",
      email,
    });
  }

  return NextResponse.json(
    { error: "Client portal authentication is not available." },
    { status: 503 },
  );
}
