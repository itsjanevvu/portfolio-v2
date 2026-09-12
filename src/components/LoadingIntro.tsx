"use client";

import { useEffect, useRef, useState } from "react";

// A one-time full-screen intro animation that plays on first page load:
// a grid of dots wipes in left-to-right, then two circular ripple waves
// travel out from the center brightening dots they pass through, before
// the overlay fades out to reveal the page underneath.
//
// Ported from the dot-grid loading animation on queenie.works, re-themed
// to this project's brand purple instead of the original's blue.

const CELL_SIZE = 20;
const BASE_COLOR: [number, number, number] = [26, 44, 68]; // --color-text-default
const HIGHLIGHT_COLOR: [number, number, number] = [67, 70, 155]; // --color-text-brand

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Deterministic 2D hash -> pseudo-random float in [0, 1).
function hash(x: number, y: number) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

export function LoadingIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(width / CELL_SIZE) + 1;
    const rows = Math.ceil(height / CELL_SIZE) + 1;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.hypot(centerX, centerY);
    const count = cols * rows;

    const dotType = new Uint8Array(count); // 0 normal, 1 or 2 highlight variants
    const revealAt = new Float32Array(count); // reveal threshold, 0..1 left-to-right
    const sizeJitter = new Float32Array(count);
    const posJitter = new Float32Array(count);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const i = x * rows + y;
        const r = hash(x, y);
        if (r < 0.16) dotType[i] = 1;
        else if (r < 0.34) dotType[i] = 2;

        const xFrac = x / (cols - 1);
        const noiseA = (hash(x + 97, y + 31) - 0.5) * 0.28;
        const noiseB = (hash(x * 7 + 3, y * 13 + 7) - 0.5) * 0.18;
        revealAt[i] = Math.max(
          0,
          Math.min(1, xFrac * 0.7 + Math.abs(y / rows - 0.5) * 0.15 + noiseA + noiseB),
        );
        sizeJitter[i] = 0.4 + hash(x + 11, y + 53) * 1.8;
        posJitter[i] = (hash(x + 41, y + 67) - 0.5) * 3;
      }
    }

    const isMobile = width < 768;
    const revealDuration = isMobile ? 1500 : 1800;
    const highlightStart = isMobile ? 2100 : 2700;
    const highlightPeak = isMobile ? 2700 : 3400;
    const fadeStart = isMobile ? 3100 : 3800;
    const totalDuration = isMobile ? 3400 : 4150;
    const rippleStagger = isMobile ? 500 : 1100;
    const rippleSpeed = isMobile ? 200 : 400;
    const rippleLeadWidth = isMobile ? 80 : 120;
    const rippleTailWidth = isMobile ? 120 : 200;

    const startTime = performance.now();
    let frameId: number;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed >= totalDuration && !finished) {
        finished = true;
        cancelAnimationFrame(frameId);
        setDone(true);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const revealProgressRaw = Math.min(elapsed / revealDuration, 1);
      const revealProgress = easeInOutQuad(revealProgressRaw);
      const highlightRamp =
        elapsed < highlightStart
          ? 0
          : elapsed < highlightPeak
            ? (elapsed - highlightStart) / (highlightPeak - highlightStart)
            : 1;
      const postHighlightFade =
        elapsed < highlightPeak ? 0 : Math.min((elapsed - highlightPeak) / (fadeStart - highlightPeak), 1);
      const finalFade =
        elapsed < fadeStart ? 0 : Math.min((elapsed - fadeStart) / (totalDuration - fadeStart), 1);

      for (let x = 0; x < cols; x++) {
        const px = x * CELL_SIZE;
        for (let y = 0; y < rows; y++) {
          const py = y * CELL_SIZE;
          const i = x * rows + y;

          const localReveal = Math.max(0, Math.min(1, (revealProgress - revealAt[i]) / 0.12));
          if (localReveal <= 0) continue;

          const eased = easeInOutQuad(localReveal);
          const opacityMul = revealProgressRaw < 1 ? eased : 1;
          const scale = sizeJitter[i];

          const drawX = revealProgressRaw < 1 ? px - (1 - eased) * CELL_SIZE * 5 * scale : px;
          const drawY = revealProgressRaw < 1 ? py + (1 - eased) * posJitter[i] * 2 : py;

          const fadeFactor = Math.max(postHighlightFade, finalFade);
          let highlight = 0;
          if (fadeFactor < 1) {
            if (dotType[i] === 1) highlight = 1 - fadeFactor;
            else if (dotType[i] === 2) highlight = Math.min(highlightRamp * 2.5, 1) * (1 - fadeFactor);
          }

          const distFromCenter = Math.hypot(px - centerX, py - centerY);
          const revealedAmount = 1 - fadeFactor;

          let ripple = 0;
          for (let w = 0; w < 2; w++) {
            const waveTime = elapsed - w * rippleStagger;
            if (waveTime < 0) continue;
            const edge = distFromCenter - (rippleSpeed / 1000) * waveTime;
            if (edge > rippleLeadWidth || edge < -rippleTailWidth) continue;
            let intensity;
            if (edge >= 0) {
              const t = 1 - edge / rippleLeadWidth;
              intensity = t * t;
            } else {
              const t = 1 + edge / rippleTailWidth;
              intensity = t * t * t * 0.6;
            }
            const decay = Math.max(0, 1 - waveTime / (maxDist / (rippleSpeed / 1000) + rippleTailWidth));
            ripple = Math.max(ripple, intensity * decay);
          }
          ripple *= opacityMul * revealedAmount;

          let radius = 0.9 + ripple * 1.2;
          if (postHighlightFade > 0) radius += (0.9 - radius) * postHighlightFade;
          const alphaScale = 1 + ripple * 1.5 * revealedAmount;

          const floorAlpha = 0.07;
          let alpha: number;
          let color = BASE_COLOR;
          if (highlight > 0) {
            color = [
              BASE_COLOR[0] + (HIGHLIGHT_COLOR[0] - BASE_COLOR[0]) * highlight,
              BASE_COLOR[1] + (HIGHLIGHT_COLOR[1] - BASE_COLOR[1]) * highlight,
              BASE_COLOR[2] + (HIGHLIGHT_COLOR[2] - BASE_COLOR[2]) * highlight,
            ];
            alpha = opacityMul * (0.88 * highlight + floorAlpha * fadeFactor) * alphaScale;
          } else {
            alpha = opacityMul * (0.38 + (floorAlpha - 0.38) * fadeFactor) * alphaScale;
          }

          if (alpha < 0.004) continue;

          ctx.fillStyle = `rgba(${color[0].toFixed(0)}, ${color[1].toFixed(0)}, ${color[2].toFixed(0)}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background-home">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
