"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/section";
import { motion } from "@/lib/motion";

const assessmentOptions = [
  {
    label: "Thinking About Ownership",
    href: "/assessment/independence",
  },
  {
    label: "Already Own a Brokerage",
    href: "/assessment/existing-broker",
  },
  {
    label: "Exploring Correspondent",
    href: "/assessment/correspondent",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-screen">
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#050505]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_30%]"
          aria-hidden
        >
          <source
            src="/video/hero-forge.mp4"
            type="video/mp4"
            media="(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
          />
        </video>
      </div>

      {/* Cinematic depth grade */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#050505]/70 lg:bg-[#050505]/62"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/82 via-[#050505]/48 to-[#050505]/92 lg:from-[#050505]/72 lg:via-[#050505]/36 lg:to-[#050505]/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] grid-bg opacity-[0.05] lg:opacity-[0.08]"
        aria-hidden
      />

      {/* Molten floor glow */}
      <div
        className="pointer-events-none absolute bottom-[14%] left-1/2 z-[1] hidden h-[280px] w-[620px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.06] blur-[130px] lg:block"
        aria-hidden
      />

      <Container className="relative z-10 w-full py-16 pt-24 sm:py-24 md:py-32 lg:-mt-8 lg:py-36 xl:-mt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          {/* Blueprint eyebrow with molten datum */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-7 flex items-center justify-center gap-3 lg:mx-0 lg:justify-start"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF6A00]/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF6A00]">
              Foundry
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF6A00]/70" />
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.25rem,7.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[clamp(2.5rem,6.8vw,5.25rem)] sm:leading-[1.02]"
          >
            <span className="text-gradient">Own the Company. </span>
            <span className="text-molten">Keep Selling.</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#E6E6E6]/90 sm:mt-7 sm:text-lg md:text-xl md:leading-[1.55] lg:mx-0"
          >
            Find out if ownership is realistic, what could slow you down, and
            what your next step should be.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center lg:justify-start"
          >
            <ButtonLink
              href="/assessment"
              className="min-h-[52px] w-full px-8 py-4 text-base shadow-[0_12px_36px_-12px_rgba(255,106,0,0.65)] sm:w-auto"
            >
              Start the 2-Minute Assessment
            </ButtonLink>
          </motion.div>

            <p className="mt-5 text-xs text-zinc-500">
              Confidential · advisory only · no obligation
            </p>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="blueprint-frame relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(10,10,10,0.50)] p-4 text-left shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-5 lg:mx-0"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent"
              aria-hidden
            />
            <div className="relative">
              <div className="molten-line mb-4 h-px w-12" />
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">
                Start Here
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Answer a few questions. We&apos;ll help you understand whether
                ownership, stronger infrastructure, or correspondent readiness
                makes sense.
              </p>

              <div className="mt-5 space-y-2">
                {assessmentOptions.map((option) => (
                  <Link
                    key={option.href}
                    href={option.href}
                    className="group flex min-h-[42px] items-center justify-between rounded-xl border border-white/[0.08] bg-black/[0.18] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.045]"
                  >
                    <span>{option.label}</span>
                    <span
                      className="text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#FF6A00]"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <ButtonLink
                href="/assessment"
                className="mt-4 min-h-[46px] w-full py-3 text-base"
              >
                Start Assessment
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
