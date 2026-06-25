"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FOUNDRY_CHAT_STARTER_PROMPTS } from "@/lib/chat/system-prompt";
import type { ChatMessage } from "@/lib/chat/types";
import { cn } from "@/lib/utils";

const SESSION_KEY = "foundry-chat-session-id";

const ASSESSMENT_FUNNEL_PATTERN =
  /^\/assessment\/(independence|existing-broker|correspondent)$/;

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

function renderMessageContent(content: string) {
  const parts = content.split(/(\/assessment[^\s]*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("/assessment")) {
      return (
        <Link
          key={`${part}-${index}`}
          href={part}
          className="font-medium text-[#FF6A00] underline-offset-2 hover:underline"
        >
          {part}
        </Link>
      );
    }

    return (
      <span key={`${part}-${index}`}>
        {part.split(/\*\*(.*?)\*\*/g).map((segment, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-medium text-zinc-200">
              {segment}
            </strong>
          ) : (
            segment
          ),
        )}
      </span>
    );
  });
}

export function FoundryChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isAdminRoute = pathname.startsWith("/admin");
  const isPortalRoute =
    pathname.startsWith("/portal") || pathname === "/login";
  const isAssessmentFunnel = ASSESSMENT_FUNNEL_PATTERN.test(pathname);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isAssessmentFunnel) setOpen(false);
  }, [isAssessmentFunnel]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !sessionId) return;

      setError(null);
      setInput("");

      const userMessage = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: trimmed,
            messages,
            pagePath: pathname,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? "Something went wrong. Please try again.");
          return;
        }

        setMessages((prev) => [
          ...prev,
          createMessage("assistant", data.reply as string),
        ]);
      } catch {
        setError("Unable to reach the assistant. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, pathname, sessionId],
  );

  if (isAdminRoute || isPortalRoute || isAssessmentFunnel) {
    return null;
  }

  const showStarters = messages.length === 0 && !isLoading;

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-[70] bg-[#050505]/50 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "fixed z-[80] flex flex-col",
          open
            ? "inset-x-0 bottom-0 items-stretch pb-safe lg:inset-auto lg:bottom-6 lg:right-6 lg:items-end"
            : "bottom-4 right-4 items-end pb-safe sm:bottom-6 sm:right-6",
        )}
      >
        {open ? (
          <div
            id="foundry-chat-panel"
            role="dialog"
            aria-label="Foundry Assistant"
            className={cn(
              "flex flex-col overflow-hidden border border-white/10 bg-[#0a0a0a]/98 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl",
              "max-h-[min(92dvh,720px)] rounded-t-2xl lg:max-h-none lg:w-[min(100vw-2rem,380px)] lg:rounded-2xl",
            )}
          >
            <div className="relative border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6A00]/60 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">
                    Foundry Assistant
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">
                    Ask about ownership, compliance infrastructure, or which path
                    fits you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                  aria-label="Close chat"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 3L11 11M11 3L3 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex min-h-[200px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:max-h-[min(52vh,420px)] sm:px-5"
            >
              {showStarters ? (
                <div className="space-y-3">
                  <p className="text-[12px] text-zinc-500">Suggested prompts</p>
                  <div className="flex flex-col gap-2">
                    {FOUNDRY_CHAT_STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="min-h-[44px] rounded-xl border border-white/10 bg-[#101010] px-3.5 py-3 text-left text-[14px] leading-snug text-zinc-300 transition-colors hover:border-[#FF6A00]/30 hover:bg-[#FF6A00]/5"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                      message.role === "user"
                        ? "bg-[#FF6A00]/15 text-zinc-100"
                        : "border border-white/10 bg-[#101010] text-zinc-300"
                    }`}
                  >
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-white/10 bg-[#101010] px-3.5 py-2.5 text-[13px] text-zinc-500">
                    Thinking…
                  </div>
                </div>
              ) : null}

              {error ? (
                <p className="text-[13px] text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-4 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendMessage(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask a question…"
                  disabled={isLoading}
                  className="max-h-24 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-[#101010] px-3 py-3 text-base text-zinc-200 placeholder:text-zinc-600 focus:border-[#FF6A00]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/20 disabled:opacity-50 sm:text-[13px]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 13V3M8 3L4 7M8 3L12 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-600 sm:text-[10px]">
                Advisory only — not legal advice. No guaranteed outcomes.
              </p>
            </div>
          </div>
        ) : null}

        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#FF6A00]/30 bg-[#101010]/95 px-4 py-3 text-sm font-medium text-[#E6E6E6] shadow-[0_8px_32px_rgba(255,106,0,0.15)] backdrop-blur-md transition-colors hover:border-[#FF6A00]/50 hover:bg-[#141414]"
            aria-expanded={open}
            aria-controls="foundry-chat-panel"
          >
            <span
              className="flex h-2 w-2 rounded-full bg-[#FF6A00]"
              aria-hidden
            />
            Ask Foundry
          </button>
        ) : null}
      </div>
    </>
  );
}
