import { PageBackdrop } from "./page-backdrop";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full bg-[#050505] text-[#E6E6E6] antialiased">
      <PageBackdrop />
      <main className="relative pt-[64px] sm:pt-[72px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
