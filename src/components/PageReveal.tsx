"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades/slides content in every time this component mounts (i.e. every
// time the home page is visited, including client-side back navigation) —
// but only once the full-screen LoadingIntro animation has finished. The
// intro itself only plays on a full page load/refresh (see LoadingIntro),
// so on a revisit within the same browser session it has already finished
// and the reveal below plays immediately instead of waiting.
//
// trigger="timer" reveals `delay`ms after the intro is done.
// trigger="scroll" additionally waits until the element scrolls into
// view, so a list of cards stagger in one by one as the user scrolls.

export function PageReveal({
  children,
  delay = 0,
  className,
  trigger = "timer",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  trigger?: "timer" | "scroll";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [inView, setInView] = useState(trigger !== "scroll");
  const [interactive, setInteractive] = useState(false);

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
    if (trigger !== "scroll") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const revealed = introDone && inView;

  return (
    <div
      ref={ref}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && revealed) setInteractive(true);
      }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        revealed ? "opacity-100 translate-y-0" : "translate-y-4 opacity-0"
      } ${interactive ? "" : "pointer-events-none"} ${className ?? ""}`}
      style={{ transitionDelay: trigger === "timer" ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
