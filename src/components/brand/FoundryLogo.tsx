import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { brandTagline } from "@/lib/site-content";
import { FoundryMark, type FoundrySize } from "./FoundryMark";

const wordmarkStyles: Record<FoundrySize, string> = {
  small: "text-[11px] tracking-[0.32em]",
  medium: "text-[14px] tracking-[0.36em]",
  large: "text-[16px] tracking-[0.38em]",
  header: "text-[14px] tracking-[0.36em]",
};

const taglineStyles: Record<FoundrySize, string> = {
  small: "text-[8px] tracking-[0.22em]",
  medium: "text-[9px] tracking-[0.24em]",
  large: "text-[10px] tracking-[0.26em]",
  header: "text-[9px] tracking-[0.24em]",
};

const compactMarkStyles: Record<FoundrySize, string> = {
  small: "!h-6 !w-auto",
  medium: "!h-8 !w-auto",
  large: "!h-10 !w-auto",
  header: "!h-11 !w-auto sm:!h-12 lg:!h-[52px]",
};

type FoundryLogoProps = {
  size?: FoundrySize;
  variant?: "full" | "mark" | "compact";
  showTagline?: boolean;
  hideTaglineOnMobile?: boolean;
  href?: string;
  className?: string;
  markClassName?: string;
  asLink?: boolean;
};

export function FoundryLogo({
  size = "medium",
  variant = "full",
  showTagline = false,
  hideTaglineOnMobile = false,
  href = "/",
  className,
  markClassName,
  asLink = true,
}: FoundryLogoProps) {
  const content =
    variant === "mark" ? (
      <FoundryMark size={size} className={markClassName} />
    ) : variant === "compact" ? (
      <span
        className={cn(
          "inline-flex items-center gap-1.5",
          className,
        )}
      >
        <FoundryMark
          size={size}
          className={cn(compactMarkStyles[size], markClassName)}
        />
        <span className="flex shrink-0 flex-col justify-center">
          <span
            className={cn(
              "font-semibold uppercase text-[#E6E6E6]",
              wordmarkStyles[size],
            )}
          >
            FOUNDRY
          </span>
          {showTagline && (
            <span
              className={cn(
                "mt-0.5 font-medium uppercase text-[#FF6A00]",
                taglineStyles[size],
                hideTaglineOnMobile && "hidden lg:block",
              )}
            >
              {brandTagline}
            </span>
          )}
        </span>
      </span>
    ) : (
      <span className={cn("inline-flex flex-col", className)}>
        <ImageLockup size={size} />
        {showTagline && size !== "small" && (
          <span
            className={cn(
              "mt-1.5 pl-[calc(var(--mark-width)+12px)] font-medium uppercase text-[#FF6A00]",
              taglineStyles[size],
            )}
            style={
              {
                "--mark-width": `${Math.round(markHeights[size] * 0.82)}px`,
              } as CSSProperties
            }
          >
            {brandTagline}
          </span>
        )}
      </span>
    );

  if (asLink && href) {
    return (
      <Link
        href={href}
        className="group inline-flex shrink-0 rounded-sm transition-opacity duration-200 hover:opacity-[0.88] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6A00]/40"
        aria-label="Foundry home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

const markHeights: Record<FoundrySize, number> = {
  small: 24,
  medium: 32,
  large: 40,
  header: 52,
};

function ImageLockup({ size }: { size: FoundrySize }) {
  const height = size === "small" ? 28 : size === "medium" ? 36 : size === "header" ? 52 : 44;
  // foundry-logo-horizontal is a 1024x512 (2:1) asset — set an explicit width
  // so the browser reserves space before the image loads (prevents CLS).
  const width = height * 2;

  return (
    <span className="inline-flex items-center" style={{ width, height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/foundry-logo-horizontal.png"
        alt="Foundry"
        width={width}
        height={height}
        className="object-contain"
        style={{ width, height }}
      />
    </span>
  );
}
