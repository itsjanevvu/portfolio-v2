"use client";

export function HeroVideo({
  src,
  startTime = 0,
  className,
}: {
  src: string;
  startTime?: number;
  className?: string;
}) {
  return (
    <video
      src={src}
      autoPlay
      muted
      playsInline
      className={className}
      onLoadedMetadata={(e) => {
        e.currentTarget.currentTime = startTime;
      }}
      onEnded={(e) => {
        e.currentTarget.currentTime = startTime;
        e.currentTarget.play();
      }}
    />
  );
}
