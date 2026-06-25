"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobileViewport } from "./use-match-media";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type FoundryVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  overlay?: boolean;
  lazy?: boolean;
  priority?: boolean;
  /** Use poster still instead of autoplay video below lg breakpoint. */
  disableVideoOnMobile?: boolean;
};

export function FoundryVideo({
  src,
  poster,
  className,
  videoClassName,
  overlay = true,
  lazy = true,
  priority = false,
  disableVideoOnMobile = false,
}: FoundryVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();
  const [active, setActive] = useState(!lazy || priority);

  useEffect(() => {
    if (active || lazy === false || priority) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, lazy, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!active || !video || prefersReducedMotion) return;
    if (disableVideoOnMobile && isMobile) return;
    video.play().catch(() => {});
  }, [active, prefersReducedMotion, disableVideoOnMobile, isMobile]);

  const usePosterOnly =
    prefersReducedMotion || (disableVideoOnMobile && isMobile);
  const showVideo = active && !usePosterOnly;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden bg-[#101010]", className)}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            videoClassName,
          )}
          aria-hidden
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            videoClassName,
          )}
          aria-hidden
        />
      ) : null}
      {overlay ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/45 to-[#050505]/80"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
