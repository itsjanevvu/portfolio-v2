"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

// Rotation doesn't start until the full-screen LoadingIntro has finished
// (see PageReveal for the same window.__introDone / "intro:done"
// handshake). Otherwise the interval starts ticking the moment this
// mounts, hidden behind the intro overlay, so the first message the
// user actually sees is already partway into the rotation instead of
// the first one.
export function StatusRotator({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.__introDone === true) {
      setIntroDone(true);
      return;
    }
    const onIntroDone = () => setIntroDone(true);
    window.addEventListener("intro:done", onIntroDone);
    return () => window.removeEventListener("intro:done", onIntroDone);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [introDone, messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="size-2.5 shrink-0 rounded-full bg-green-500" />
      <p
        key={index}
        className="animate-[fade-in_0.5s_ease-out] font-body text-body-lg text-text-subdued"
      >
        {messages[index]}
      </p>
    </div>
  );
}
