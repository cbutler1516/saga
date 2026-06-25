"use client";

import { useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

type PlaybookFormProps = {
  source?: string;
};

const inputClass =
  "mt-2 w-full min-h-[44px] rounded-xl border border-white/[0.08] bg-black/25 px-4 py-3 text-base text-[#E6E6E6] placeholder:text-zinc-600 focus:border-[#FF6A00]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/20 sm:text-[15px]";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500";

export function PlaybookForm({ source = "playbook_page" }: PlaybookFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          currentRole,
          source,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to submit. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to submit. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="steel-surface blueprint-frame rounded-3xl border border-white/[0.08] p-6 sm:p-8">
        <div className="molten-line mb-6 h-px w-16" />
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
          Playbook requested
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white">
          Your playbook request has been received.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
          We&apos;ll use the email you provided to send the Mortgage Ownership
          Playbook when delivery is connected.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/assessment" className="min-h-[46px] w-full sm:w-auto">
            Start Assessment
          </ButtonLink>
          <Link
            href="/library"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/[0.08] px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="steel-surface blueprint-frame rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_40px_120px_-80px_rgba(255,106,0,0.45)] sm:p-8"
    >
      <div className="molten-line mb-6 h-px w-16" />
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
        Lead magnet
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white">
        Get the Mortgage Ownership Playbook
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
        A practical guide for experienced mortgage professionals exploring
        ownership, licensing, compliance infrastructure, startup costs,
        operations, and the first 90 days.
      </p>

      <div className="mt-7 grid gap-5">
        <div>
          <label htmlFor={`${source}-first-name`} className={labelClass}>
            First name
          </label>
          <input
            id={`${source}-first-name`}
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${source}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${source}-phone`} className={labelClass}>
              Phone{" "}
              <span className="normal-case tracking-normal text-zinc-600">
                (optional)
              </span>
            </label>
            <input
              id={`${source}-phone`}
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${source}-role`} className={labelClass}>
              Current role{" "}
              <span className="normal-case tracking-normal text-zinc-600">
                (optional)
              </span>
            </label>
            <input
              id={`${source}-role`}
              value={currentRole}
              onChange={(event) => setCurrentRole(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-5 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 min-h-[48px] w-full rounded-full bg-gradient-to-b from-[#FF7A1A] to-[#FF6A00] px-6 py-3 text-sm font-medium text-[#050505] transition-colors hover:from-[#FF8A2E] hover:to-[#FF7411] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Requesting..." : "Request the Playbook"}
      </button>
    </form>
  );
}
