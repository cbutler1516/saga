import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const record = body as Record<string, unknown>;
  const firstName =
    typeof record.firstName === "string" ? record.firstName.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const currentRole =
    typeof record.currentRole === "string" ? record.currentRole.trim() : "";
  const source = typeof record.source === "string" ? record.source.trim() : "";

  if (!firstName) {
    return NextResponse.json(
      { error: "First name is required." },
      { status: 400 },
    );
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const lead = {
    firstName,
    email,
    ...(phone ? { phone } : {}),
    ...(currentRole ? { currentRole } : {}),
    source: source || "playbook_lead_magnet",
    leadMagnet: "mortgage_ownership_playbook",
    createdAt: new Date().toISOString(),
  };

  // Supabase-ready placeholder:
  // await insertPlaybookLead(lead)
  // The storage helper can write this payload to a future playbook_leads table.
  if (process.env.NODE_ENV === "development") {
    console.info("[Playbook lead placeholder]", lead);
  }

  return NextResponse.json({ success: true });
}
