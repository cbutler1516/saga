import { cn } from "@/lib/utils";

export function SerifHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const base =
    Tag === "h1"
      ? "text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#E6E6E6]"
      : Tag === "h3"
        ? "text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.015em] text-[#E6E6E6]"
        : "text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#E6E6E6]";

  return <Tag className={cn(base, className)}>{children}</Tag>;
}
