"use client";

export function HeroVideo({
  src,
  startTime = 0,
  className,
  onReady,
}: {
  src: string;
  startTime?: number;
  className?: string;
  onReady?: () => void;
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
      onCanPlayThrough={onReady}
      onEnded={(e) => {
        e.currentTarget.currentTime = startTime;
        e.currentTarget.play();
      }}
    />
  );
}
