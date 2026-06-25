import type { Metadata } from "next";
import { Suspense } from "react";
import { FoundryMark } from "@/components/brand/FoundryMark";
import { PortalLoginForm } from "@/components/portal/portal-login-form";
import { getPortalAuthMode } from "@/lib/portal/auth";

export const metadata: Metadata = {
  title: "Client Portal Sign In",
  description: "Secure sign in for Foundry client portal.",
};

export default function LoginPage() {
  const authMode = getPortalAuthMode();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/25 to-transparent" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <FoundryMark size="medium" className="mx-auto opacity-60" />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF6A00]">
            Client Portal
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">
            Sign in to your workspace
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Access documents, compliance tasks, and operating metrics for your
            mortgage company.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-6 backdrop-blur-sm sm:p-8">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-white/5" />}>
            <PortalLoginForm authMode={authMode} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
