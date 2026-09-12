"use client";

import { useEffect, useRef } from "react";

const CASE_STUDY_TARGET_SELECTOR = ".cursor-spin";
const FADE_TARGET_SELECTOR = "nav a, footer a";
const DEFAULT_SIZE = 16;
const PILL_HEIGHT = 36;
const PILL_PADDING_X = 18;
const EASE = 0.18;
const DEFAULT_OPACITY = "1";
const FADE_OPACITY = "0.4";
const LABEL_TEXT = "Read case study";

export function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pillWidthRef = useRef<number | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const wrapper = wrapperRef.current;
    const glyph = glyphRef.current;
    const label = labelRef.current;
    if (!wrapper || !glyph || !label) return;

    document.documentElement.classList.add("custom-cursor-active");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as Element | null;
      const isCaseStudy = !!target?.closest(CASE_STUDY_TARGET_SELECTOR);
      const fading = !!target?.closest(FADE_TARGET_SELECTOR);
      wrapper.style.opacity = fading ? FADE_OPACITY : DEFAULT_OPACITY;

      if (isCaseStudy) {
        if (pillWidthRef.current === null) {
          pillWidthRef.current = label.scrollWidth + PILL_PADDING_X * 2;
        }
        glyph.style.width = `${pillWidthRef.current}px`;
        glyph.style.height = `${PILL_HEIGHT}px`;
        label.style.opacity = "1";
      } else {
        glyph.style.width = `${DEFAULT_SIZE}px`;
        glyph.style.height = `${DEFAULT_SIZE}px`;
        label.style.opacity = "0";
      }
    };

    const onPointerLeave = () => {
      wrapper.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-150 ease-out"
    >
      <div
        ref={glyphRef}
        className="flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-text-action-primary transition-[width,height] duration-300 ease-out"
        style={{ width: DEFAULT_SIZE, height: DEFAULT_SIZE }}
      >
        <span
          ref={labelRef}
          className="font-body text-label-md uppercase text-background-default opacity-0 transition-opacity duration-150 ease-out"
        >
          {LABEL_TEXT}
        </span>
      </div>
    </div>
  );
}
