"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
  authMode: "supabase" | "dev" | "unavailable";
};

const inputClass =
  "mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-base text-zinc-200 placeholder:text-zinc-600 focus:border-[#FF6A00]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/20 sm:text-[15px]";

export function PortalLoginForm({ authMode }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authMode === "unavailable") {
    return (
      <div className="rounded-xl border border-white/10 bg-[#101010] px-6 py-8 text-center">
        <p className="text-[15px] text-zinc-300">
          Client portal access is not configured yet.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Contact Foundry to enable your secure client workspace.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex text-sm font-medium text-[#FF6A00] hover:text-[#FF7A1A]"
        >
          Contact Foundry →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {authMode === "dev" ? (
        <div className="rounded-xl border border-[#FF6A00]/20 bg-[#FF6A00]/5 px-4 py-3 text-[13px] leading-relaxed text-zinc-400">
          Development placeholder login. Use any email with the dev password
          configured in{" "}
          <code className="text-zinc-300">PORTAL_DEV_PASSWORD</code> (default:{" "}
          <code className="text-zinc-300">foundry-dev</code>).
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-medium text-[#050505] transition-colors hover:bg-[#FF7A1A] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing in…" : "Sign in to portal"}
      </button>

      <p className="text-center text-xs leading-relaxed text-zinc-600">
        Secure client access for Foundry mortgage company clients only.
      </p>
    </form>
  );
}
