import type { ChatMessage, ChatSessionLog } from "./types";

const sessionStore = new Map<string, ChatSessionLog>();

export function createSessionLog(
  sessionId: string,
  pagePath: string,
): ChatSessionLog {
  const now = new Date().toISOString();
  const log: ChatSessionLog = {
    sessionId,
    messages: [],
    pagePath,
    createdAt: now,
    updatedAt: now,
    leadCaptured: false,
  };
  sessionStore.set(sessionId, log);
  return log;
}

export function appendToSessionLog(
  sessionId: string,
  pagePath: string,
  newMessages: ChatMessage[],
  options?: { leadCaptured?: boolean },
): ChatSessionLog {
  const existing = sessionStore.get(sessionId);
  const now = new Date().toISOString();

  const log: ChatSessionLog = existing ?? createSessionLog(sessionId, pagePath);

  log.messages = [...log.messages, ...newMessages];
  log.pagePath = pagePath || log.pagePath;
  log.updatedAt = now;
  if (options?.leadCaptured) {
    log.leadCaptured = true;
  }

  sessionStore.set(sessionId, log);

  if (process.env.NODE_ENV === "development") {
    console.info("[Foundry Chat session]", {
      sessionId: log.sessionId,
      messageCount: log.messages.length,
      pagePath: log.pagePath,
      leadCaptured: log.leadCaptured,
    });
  }

  return log;
}

/** Reserved for future persistence (Supabase, CRM, etc.). */
export function getSessionLog(sessionId: string): ChatSessionLog | undefined {
  return sessionStore.get(sessionId);
}
