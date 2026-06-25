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
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] active:duration-100",
        variant === "primary" &&
          "bg-gradient-to-b from-[#FF7A1A] to-[#FF6A00] text-[#0A0A0A] shadow-[0_4px_16px_-8px_rgba(255,106,0,0.42)] hover:from-[#FF8424] hover:to-[#FF7411] hover:shadow-[0_8px_24px_-12px_rgba(255,106,0,0.5)]",
        variant === "secondary" &&
          "border border-white/[0.08] bg-white/[0.018] text-[#E6E6E6] hover:border-white/[0.14] hover:bg-white/[0.04]",
        variant === "ghost" && "text-[#A7A7A7] hover:text-[#E6E6E6] hover:translate-y-0",
        className,
      )}
    >
      {children}
    </Link>
  );
}
