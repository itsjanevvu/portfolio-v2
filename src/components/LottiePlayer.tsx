"use client";

import { useEffect, useRef, useState } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

// autoplay is disabled and playback is started manually once the
// full-screen LoadingIntro has finished (see PageReveal for the same
// window.__introDone / "intro:done" handshake). Without this, the
// animation autoplays the moment it mounts — hidden behind the intro
// overlay — so by the time the overlay fades out it's already several
// seconds into its loop instead of starting from frame 0.
export function LottiePlayer({
  src,
  className,
  onReady,
}: {
  src: string;
  className?: string;
  onReady?: () => void;
}) {
  const lottieRef = useRef<LottieHandle>(null);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (!dataReady) return;
    if (typeof window !== "undefined" && window.__introDone === true) {
      lottieRef.current?.play();
      return;
    }
    const onIntroDone = () => lottieRef.current?.play();
    window.addEventListener("intro:done", onIntroDone);
    return () => window.removeEventListener("intro:done", onIntroDone);
  }, [dataReady]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <Lottie
        lottieRef={lottieRef}
        src={src}
        loop
        autoplay={false}
        className="size-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        subscriptions={{
          ready: () => {
            setDataReady(true);
            onReady?.();
          },
        }}
      />
    </div>
  );
}
