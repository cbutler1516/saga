export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ChatSessionLog = {
  sessionId: string;
  messages: ChatMessage[];
  pagePath: string;
  createdAt: string;
  updatedAt: string;
  leadCaptured: boolean;
};

/** Placeholder for optional future lead capture from chat. */
export type ChatContactCapture = {
  name?: string;
  email?: string;
  phone?: string;
  questionSummary?: string;
  capturedAt?: string;
};

export type ChatApiRequest = {
  sessionId: string;
  message: string;
  messages?: ChatMessage[];
  pagePath?: string;
};

export type ChatApiResponse = {
  reply: string;
  sessionId: string;
  mode: "openai" | "mock";
  suggestAssessment?: boolean;
  assessmentUrl?: string;
};
