"use client";

import { Lottie } from "lottie-react";

export function LottiePlayer({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <Lottie
        src={src}
        loop
        autoplay
        className="size-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
}
