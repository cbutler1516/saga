"use client";

import { cn } from "@/lib/utils";
import { FoundryImage } from "./foundry-image";
import { FoundryVideo } from "./foundry-video";

type AtmosphericVariant = "hero" | "section" | "texture" | "editorial";

type AtmosphericBackdropProps = {
  videoSrc?: string;
  imageSrc?: string;
  poster?: string;
  priority?: boolean;
  disableVideoOnMobile?: boolean;
  variant?: AtmosphericVariant;
  className?: string;
};

const overlayByVariant: Record<AtmosphericVariant, string> = {
  hero: "from-[#050505]/62 via-[#050505]/48 to-[#050505]/78",
  section: "from-[#050505]/90 via-[#050505]/84 to-[#050505]/95",
  texture: "from-[#050505]/94 via-[#050505]/90 to-[#050505]/97",
  editorial: "from-[#050505] via-[#050505]/90 to-[#050505]/75",
};

export function AtmosphericBackdrop({
  videoSrc,
  imageSrc,
  poster,
  priority = false,
  disableVideoOnMobile = true,
  variant = "section",
  className,
}: AtmosphericBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {videoSrc ? (
        <FoundryVideo
          src={videoSrc}
          poster={poster}
          lazy={!priority}
          priority={priority}
          overlay={false}
          disableVideoOnMobile={disableVideoOnMobile}
          className="absolute inset-0"
        />
      ) : null}
      {imageSrc ? (
        <div
          className={cn(
            "absolute inset-0",
            variant === "editorial" && "lg:left-[35%]",
          )}
        >
          <FoundryImage
            src={imageSrc}
            alt=""
            className={cn(
              variant === "editorial" && "opacity-30 lg:opacity-35",
              variant === "texture" && "opacity-15",
              variant === "hero" && "opacity-25",
              variant === "section" && "opacity-20",
            )}
          />
        </div>
      ) : null}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          overlayByVariant[variant],
        )}
      />
      {variant === "editorial" ? (
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent lg:via-[#050505]/85" />
      ) : null}
      <div
        className={cn(
          "grid-bg absolute inset-0",
          variant === "hero" ? "opacity-25" : "opacity-15",
        )}
      />
      {variant === "hero" ? (
        <>
          <div className="absolute bottom-0 left-1/2 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[#FF6A00]/10 blur-[120px]" />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/25 to-transparent" />
        </>
      ) : null}
    </div>
  );
}
