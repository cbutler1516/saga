import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import {
  isDevPortalAuthEnabled,
  isSupabaseAuthConfigured,
} from "./auth";
import {
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE_SECONDS,
} from "./constants";
import type { PortalSession, PortalSessionPayload } from "./session-types";

function encodeSession(payload: PortalSessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeSession(value: string): PortalSessionPayload | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(value, "base64url").toString("utf8"),
    ) as PortalSessionPayload;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.exp !== "number" ||
      typeof parsed.email !== "string" ||
      typeof parsed.userId !== "string" ||
      typeof parsed.companyId !== "string" ||
      (parsed.mode !== "supabase" && parsed.mode !== "dev")
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function buildSessionCookieValue(
  payload: Omit<PortalSessionPayload, "exp">,
): string {
  return encodeSession({
    ...payload,
    exp: Date.now() + PORTAL_SESSION_MAX_AGE_SECONDS * 1000,
  });
}

export async function setPortalSessionCookie(value: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(PORTAL_SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PORTAL_SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearPortalSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PORTAL_SESSION_COOKIE);
}

export function readPortalSessionFromCookieValue(
  value: string | undefined,
): PortalSessionPayload | null {
  if (!value) return null;
  const payload = decodeSession(value);
  if (!payload || payload.exp < Date.now()) return null;
  return payload;
}

async function validateSupabaseSession(
  payload: PortalSessionPayload,
): Promise<PortalSessionPayload | null> {
  if (!payload.accessToken || !isSupabaseAuthConfigured()) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const client = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await client.auth.getUser(payload.accessToken);
  if (error || !data.user) return null;

  return {
    ...payload,
    email: data.user.email ?? payload.email,
    userId: data.user.id,
  };
}

/** Resolve the current portal session from cookies. Mock company name for v1. */
export async function getPortalSession(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const payload = readPortalSessionFromCookieValue(
    cookieStore.get(PORTAL_SESSION_COOKIE)?.value,
  );

  if (!payload) return null;

  if (payload.mode === "supabase") {
    const validated = await validateSupabaseSession(payload);
    if (!validated) return null;
    return {
      ...validated,
      companyName: "Summit Home Lending LLC",
    };
  }

  if (payload.mode === "dev" && isDevPortalAuthEnabled()) {
    return {
      ...payload,
      companyName: "Summit Home Lending LLC",
    };
  }

  return null;
}
