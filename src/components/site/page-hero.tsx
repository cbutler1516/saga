import { FoundryMark } from "@/components/brand/FoundryMark";
import { AtmosphericBackdrop } from "@/components/media/atmospheric-backdrop";
import { PageContainer } from "./page-container";
import { SectionLabel } from "./section-label";

type PageHeroAtmosphere =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; variant?: "hero" | "texture" };

export function PageHero({
  label,
  title,
  description,
  showBrandMark = false,
  atmosphere,
}: {
  label: string;
  title: string;
  description: string;
  showBrandMark?: boolean;
  atmosphere?: PageHeroAtmosphere;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {atmosphere?.type === "video" ? (
        <AtmosphericBackdrop
          videoSrc={atmosphere.src}
          poster={atmosphere.poster}
          variant="hero"
        />
      ) : atmosphere?.type === "image" ? (
        <AtmosphericBackdrop
          imageSrc={atmosphere.src}
          variant={atmosphere.variant ?? "hero"}
        />
      ) : (
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6A00]/16 to-transparent" />
        </div>
      )}

      <PageContainer className="relative z-10 py-24 sm:py-28 lg:py-36">
        {showBrandMark && (
          <div className="mb-10 opacity-50">
            <FoundryMark size="medium" />
          </div>
        )}
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-7 max-w-[20ch] text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-gradient">
          {title}
        </h1>
        <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-[#A7A7A7] lg:text-xl lg:leading-[1.7]">
          {description}
        </p>
      </PageContainer>
    </section>
  );
}
