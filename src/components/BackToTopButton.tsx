"use client";

import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById("site-navbar");
    if (!navbar) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    observer.observe(navbar);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
      }
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border-default bg-background-default/60 px-5 py-3 font-body text-label-md text-text-subdued shadow-md backdrop-blur-md transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-background-case-study-offset/80 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      Back to the top ↑
    </button>
  );
}
