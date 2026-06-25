import Image from "next/image";
import { cn } from "@/lib/utils";

export type FoundrySize = "small" | "medium" | "large" | "header";

const markHeights: Record<FoundrySize, number> = {
  small: 24,
  medium: 32,
  large: 40,
  header: 52,
};

/** Icon-only Foundry F mark. Heights: small 24px, medium 32px, large 40px, header 52px. */
export function FoundryMark({
  size = "medium",
  className,
}: {
  size?: FoundrySize;
  className?: string;
}) {
  const height = markHeights[size];
  // foundry-mark is a 1024x1024 (1:1) asset — keep the box square to avoid
  // layout shift and letterboxing.
  const width = height;

  return (
    <Image
      src="/brand/foundry-mark.png"
      alt=""
      width={width}
      height={height}
      className={cn("shrink-0 object-contain", className)}
      aria-hidden={true}
      priority={size === "medium" || size === "header"}
    />
  );
}
