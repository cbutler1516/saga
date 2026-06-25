"use client";

import { FoundryVideo } from "@/components/media/foundry-video";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/section";
import { brandTagline } from "@/lib/site-content";
import { motion } from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-screen">
      <FoundryVideo
        src="/video/hero-forge.mp4"
        poster="/images/foundry-hero-image.png"
        lazy={false}
        priority
        overlay={false}
        disableVideoOnMobile
        className="absolute inset-0 z-0 h-full w-full"
        videoClassName="object-cover object-[center_30%] sm:object-center"
      />

      {/* Cinematic depth grade */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#050505]/55 lg:bg-[#050505]/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/70 via-[#050505]/35 to-[#050505]/85 lg:from-[#050505]/55 lg:via-[#050505]/20 lg:to-[#050505]/75"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] grid-bg opacity-[0.08] lg:opacity-[0.12]"
        aria-hidden
      />

      {/* Molten floor glow */}
      <div
        className="pointer-events-none absolute bottom-[14%] left-1/2 z-[1] hidden h-[280px] w-[620px] -translate-x-1/2 rounded-full bg-[#FF6A00]/[0.06] blur-[130px] lg:block"
        aria-hidden
      />

      <Container className="relative z-10 w-full py-20 pt-24 sm:py-28 md:py-40 lg:-mt-16 xl:-mt-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Blueprint eyebrow with molten datum */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-7 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF6A00]/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF6A00]">
              Foundry
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF6A00]/70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.25rem,7.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[clamp(2.5rem,6.8vw,5.25rem)] sm:leading-[1.02]"
          >
            <span className="text-gradient">Own the Company. </span>
            <span className="text-molten">Keep Selling.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#E6E6E6]/90 sm:mt-8 sm:text-lg md:text-xl md:leading-[1.65]"
          >
            Foundry helps experienced mortgage professionals evaluate ownership,
            understand what it requires, and build the operational foundation to
            move forward with confidence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mx-auto mt-3 max-w-xl text-sm text-zinc-500 sm:mt-5"
          >
            Exploratory and confidential — no pressure, no obligation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4"
          >
            <ButtonLink href="/assessment" className="min-h-[44px] w-full sm:w-auto">
              Find Out If You&apos;re Ready
            </ButtonLink>
            <ButtonLink
              href="/assessment/independence"
              variant="secondary"
              className="min-h-[44px] w-full sm:w-auto"
            >
              Explore Ownership
            </ButtonLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[#FF6A00]/90 sm:mt-10 sm:text-sm sm:tracking-[0.24em]"
          >
            {brandTagline}
          </motion.p>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[#FF6A00]/60 to-transparent" />
      </div>
    </section>
  );
}
