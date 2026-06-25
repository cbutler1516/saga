import { NextResponse } from "next/server";
import { appendToSessionLog } from "@/lib/chat/log";
import { generateMockResponse } from "@/lib/chat/mock-response";
import { callOpenAIChat, isOpenAIConfigured } from "@/lib/chat/openai";
import { FOUNDRY_ASSESSMENT_URL } from "@/lib/chat/system-prompt";
import type { ChatApiRequest, ChatMessage } from "@/lib/chat/types";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

function shouldSuggestAssessment(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("/assessment") ||
    lower.includes("assessment takes about two minutes") ||
    lower.includes("find out where you stand")
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const record = body as Partial<ChatApiRequest>;
  const sessionId =
    typeof record.sessionId === "string" ? record.sessionId.trim() : "";
  const message =
    typeof record.message === "string" ? record.message.trim() : "";
  const pagePath =
    typeof record.pagePath === "string" ? record.pagePath : "/";
  const history = Array.isArray(record.messages)
    ? record.messages.filter(
        (entry): entry is ChatMessage =>
          Boolean(entry) &&
          typeof entry === "object" &&
          typeof (entry as ChatMessage).role === "string" &&
          typeof (entry as ChatMessage).content === "string",
      )
    : [];

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId is required." },
      { status: 400 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: "message is required." },
      { status: 400 },
    );
  }

  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  const userMessage = createMessage("user", message);

  try {
    let reply: string;
    let mode: "openai" | "mock" = "mock";
    let suggestAssessment = false;
    let assessmentUrl = FOUNDRY_ASSESSMENT_URL;

    if (isOpenAIConfigured()) {
      reply = await callOpenAIChat(history, message);
      mode = "openai";
      suggestAssessment = shouldSuggestAssessment(reply);
    } else {
      const mock = generateMockResponse(message);
      reply = mock.reply;
      suggestAssessment = mock.suggestAssessment;
      assessmentUrl = mock.assessmentUrl;
    }

    const assistantMessage = createMessage("assistant", reply);

    appendToSessionLog(sessionId, pagePath, [userMessage, assistantMessage], {
      leadCaptured: suggestAssessment,
    });

    return NextResponse.json({
      reply,
      sessionId,
      mode,
      suggestAssessment,
      assessmentUrl,
    });
  } catch (error) {
    console.error("[Foundry Chat API error]", error);

    if (isOpenAIConfigured()) {
      const mock = generateMockResponse(message);
      const assistantMessage = createMessage("assistant", mock.reply);
      appendToSessionLog(sessionId, pagePath, [userMessage, assistantMessage], {
        leadCaptured: mock.suggestAssessment,
      });

      return NextResponse.json({
        reply: mock.reply,
        sessionId,
        mode: "mock",
        suggestAssessment: mock.suggestAssessment,
        assessmentUrl: mock.assessmentUrl,
        fallback: true,
      });
    }

    return NextResponse.json(
      { error: "Unable to generate a response. Please try again." },
      { status: 500 },
    );
  }
}
