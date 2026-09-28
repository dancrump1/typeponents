"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

export interface PixelSwipeTextProps {
  /** The text or React nodes to be revealed by the swipe animation */
  children?: React.ReactNode;
  /** Additional CSS class names for the container wrapper */
  className?: string;
  /** Additional CSS class names for the inner text element */
  textClassName?: string;
  /** The color of the primary leading wipe band. Accepts any valid CSS color string. */
  wipeColor?: string;
  /** The color of the secondary trailing wipe band that follows the lead band. */
  trailWipeColor?: string;
  /** Animation speed multiplier (lower = faster) */
  speed?: number;
  /** Whether the animation should only play once when scrolled into view */
  playOnce?: boolean;
  /** Callback fired when the wipe transition animation completes */
  onComplete?: () => void;
  /** Optional click handler for the component */
  onClick?: () => void;
}

export function PixelSwipeText({
  children = "Pixel Swipe Text Animation",
  className = "",
  textClassName = "",
  wipeColor = "#46c610ff",
  trailWipeColor = "#fb7185",
  speed = 0.7,
  playOnce = true,
  onComplete,
  onClick,
}: PixelSwipeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const isInView = useInView(containerRef, { once: playOnce, amount: 0.2 });

  const parsedSpeed =
    typeof speed === "number" ? speed : parseFloat(String(speed)) || 0.7;
  const activeWipeColor = wipeColor || "#f43f5e";

  // Trigger animation once when in view
  useEffect(() => {
    if (isInView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlayCount((prev) => prev + 1);
    }
  }, [isInView]);

  useEffect(() => {
    if (playCount === 0) return;

    let animFrameId: number;
    let stopped = false;

    const el = containerRef.current;
    const txt = textRef.current;
    const cv = canvasRef.current;
    if (!el || !txt || !cv) return;

    const r = el.getBoundingClientRect();
    const W = Math.max(1, Math.ceil(r.width));
    const H = Math.max(1, Math.ceil(r.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    cv.width = W * dpr;
    cv.height = H * dpr;

    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const actualTextColor =
      !trailWipeColor || trailWipeColor === "currentColor"
        ? getComputedStyle(txt).color || "#000000"
        : trailWipeColor;

    const CELL = 7;
    const BAND = 52;
    const FLICK = 0.34;
    const OVER = 0.8;
    const OFFSET = 150;
    const DCOVER = 760;
    const HOLD = 50;
    const DREVEAL = 760;

    const cubicBezier = (
      p1x: number,
      p1y: number,
      p2x: number,
      p2y: number,
    ) => {
      const cx = 3 * p1x;
      const bx = 3 * (p2x - p1x) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * p1y;
      const by = 3 * (p2y - p1y) - cy;
      const ay = 1 - cy - by;
      const fx = (t: number) => ((ax * t + bx) * t + cx) * t;
      const fy = (t: number) => ((ay * t + by) * t + cy) * t;
      const dfx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
      return (x: number) => {
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        let t = x;
        for (let i = 0; i < 8; i++) {
          const e = fx(t) - x;
          const d = dfx(t);
          if (Math.abs(e) < 1e-4 || Math.abs(d) < 1e-6) break;
          t -= e / d;
        }
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        return fy(t);
      };
    };

    const ease = cubicBezier(0.85, 0, 0.15, 1);

    const hash = (x: number, y: number, s: number) => {
      let h = (x * 374761393) ^ (y * 668265263) ^ (s * 2246822519);
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };

    const o = OFFSET * parsedSpeed;
    const dc = DCOVER * parsedSpeed;
    const h = HOLD * parsedSpeed;
    const dr = DREVEAL * parsedSpeed;
    const RS = o + dc + h;
    const RSg = RS + o;
    const END = RSg + dr;

    txt.style.visibility = "hidden";
    let shown = false;
    const t0 = performance.now();
    setIsPlaying(true);

    const seg = (t: number, a: number, b: number) => {
      if (t <= a) return 0;
      if (t >= b) return 1;
      return ease((t - a) / (b - a));
    };

    const edge = (edgeX: number, dir: number, seed: number) => {
      const g0 = Math.floor((edgeX - BAND) / CELL);
      const g1 = Math.ceil((edgeX + BAND) / CELL);
      for (let gx = g0; gx <= g1; gx++) {
        const cx = gx * CELL + CELL / 2;
        if (cx < 0 || cx > W) continue;
        const dist = dir * (cx - edgeX);
        for (let gy = 0; gy * CELL < H; gy++) {
          const p = (dist / BAND) * 0.5 + 0.5 + (Math.random() - 0.5) * FLICK;
          if (p > hash(gx, gy, seed)) {
            ctx.fillRect(gx * CELL, gy * CELL, CELL + OVER, CELL + OVER);
          }
        }
      }
    };

    const bar = (fr: number, color: string, seed: number) => {
      const L = fr * W;
      const R = L + W;
      ctx.fillStyle = color;
      const cl = Math.max(0, L + BAND);
      const cr = Math.min(W, R - BAND);
      if (cr > cl) ctx.fillRect(cl, 0, cr - cl, H);
      edge(L, 1, seed);
      edge(R, -1, seed);
    };

    const tick = (now: number) => {
      if (stopped) return;
      const t = now - t0;
      ctx.clearRect(0, 0, W, H);

      const gF = seg(t, 0, dc) - 1 + seg(t, RSg, RSg + dr);
      const tF = seg(t, o, o + dc) - 1 + seg(t, RS, RS + dr);

      if (!shown && t >= RS) {
        txt.style.visibility = "visible";
        shown = true;
      }

      bar(gF, activeWipeColor, 0);
      bar(tF, actualTextColor, 91);

      if (t < END + 80) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
        setIsPlaying(false);
        if (onComplete) onComplete();
      }
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(animFrameId);
      if (ctx) ctx.clearRect(0, 0, W, H);
      if (txt) txt.style.visibility = "visible";
    };
  }, [playCount, activeWipeColor, trailWipeColor, parsedSpeed, onComplete]);

  const triggerWipe = () => {
    setPlayCount((prev) => prev + 1);
    if (onClick) onClick();
  };

  return (
    <div
      ref={containerRef}
      onClick={triggerWipe}
      className={cn(
        "relative -mb-[0.14em] inline-block cursor-pointer overflow-hidden pb-[0.14em] select-none",
        className,
      )}
    >
      <span
        ref={textRef}
        className={cn("font-sans tracking-tight", textClassName)}
      >
        {children}
      </span>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export const PixelSwipeTextAnimation = PixelSwipeText;
export default PixelSwipeText;

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_here
 */
