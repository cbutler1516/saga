import type { ChatContactCapture } from "./types";

/**
 * Placeholder for optional future contact capture from chat.
 * Not required before chatting — wire to Supabase/CRM when ready.
 */
export type ChatContactCapturePayload = ChatContactCapture & {
  sessionId: string;
};

export async function submitChatContactCapture(
  payload: ChatContactCapturePayload,
): Promise<{ accepted: true; stored: false }> {
  if (process.env.NODE_ENV === "development") {
    console.info("[Foundry Chat contact capture — not persisted yet]", payload);
  }

  return { accepted: true, stored: false };
}
