import { AtmosphericBackdrop } from "@/components/media/atmospheric-backdrop";
import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

type SectionAtmosphere =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export function PageSection({
  children,
  className,
  containerClassName,
  atmosphere,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  atmosphere?: SectionAtmosphere;
}) {
  return (
    <section
      className={cn(
        "relative border-t border-white/[0.06] py-20 sm:py-24 md:py-28 lg:py-32",
        atmosphere && "overflow-hidden",
        className,
      )}
    >
      {atmosphere?.type === "video" ? (
        <AtmosphericBackdrop
          videoSrc={atmosphere.src}
          poster={atmosphere.poster}
          variant="section"
        />
      ) : null}
      {atmosphere?.type === "image" ? (
        <AtmosphericBackdrop imageSrc={atmosphere.src} variant="texture" />
      ) : null}
      <PageContainer className={cn("relative z-10", containerClassName)}>
        {children}
      </PageContainer>
    </section>
  );
}
