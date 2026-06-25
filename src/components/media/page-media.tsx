import { FoundryImage } from "./foundry-image";
import { FoundryVideo } from "./foundry-video";
import { MediaFrame } from "./media-frame";

type PageMediaProps = {
  className?: string;
  aspect?: string;
};

export function PageMediaVideo({
  src,
  lazy = true,
  aspect = "21 / 9",
  className,
}: PageMediaProps & { src: string; lazy?: boolean }) {
  return (
    <MediaFrame aspect={aspect} className={className}>
      <FoundryVideo
        src={src}
        lazy={lazy}
        overlay={false}
        className="absolute inset-0 h-full w-full"
      />
    </MediaFrame>
  );
}

export function PageMediaImage({
  src,
  alt = "",
  aspect = "21 / 9",
  className,
  priority = false,
}: PageMediaProps & { src: string; alt?: string; priority?: boolean }) {
  return (
    <MediaFrame aspect={aspect} className={className}>
      <FoundryImage src={src} alt={alt} priority={priority} />
    </MediaFrame>
  );
}
