"use client";

import { Lottie } from "lottie-react";

export function LottiePlayer({
  src,
  className,
  onReady,
}: {
  src: string;
  className?: string;
  onReady?: () => void;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <Lottie
        src={src}
        loop
        autoplay
        className="size-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        subscriptions={onReady ? { ready: onReady } : undefined}
      />
    </div>
  );
}
