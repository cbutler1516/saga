import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 will-change-transform hover:-translate-y-px active:translate-y-0 active:duration-100",
        variant === "primary" &&
          "bg-gradient-to-b from-[#FF7A1A] to-[#FF6A00] text-[#0A0A0A] shadow-[0_4px_16px_-6px_rgba(255,106,0,0.4)] hover:from-[#FF8A2E] hover:to-[#FF7411] hover:shadow-[0_8px_24px_-8px_rgba(255,106,0,0.5)]",
        variant === "secondary" &&
          "border border-white/[0.08] bg-white/[0.02] text-[#E6E6E6] hover:border-white/15 hover:bg-white/[0.05]",
        variant === "ghost" && "text-[#A7A7A7] hover:text-[#E6E6E6]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
