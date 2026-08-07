// src/components/RecamanSkeleton.web.tsx
//
// Web twin of the Recamán skeleton: same faint arc path, 30-unit dash
// shimmering on a 1.8s loop via canvas line dashes. Reduced motion draws the
// static path once. Self-contained rAF (not useWebCanvas) so a skeleton never
// registers itself as the image-export canvas or blocks touch scrolling.

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "react-native-reanimated";
import { recaman } from "../sequences/generators";
import { useThemeColors } from "../theme";
import { layoutRecaman } from "../visualizations/recamanLayout";

const SHIMMER_DASH = 30;
const SHIMMER_MS = 1800;
const TERMS = 20;

export default function RecamanSkeleton({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const seq = recaman(TERMS);
    const { x0, midY, scaleX } = layoutRecaman(seq, width, height, true);
    let length = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      length += (Math.PI * Math.abs(seq[i + 1] - seq[i]) * scaleX) / 2;
    }

    const tracePath = () => {
      ctx.beginPath();
      for (let i = 0; i < seq.length - 1; i++) {
        const left = Math.min(seq[i], seq[i + 1]);
        const right = Math.max(seq[i], seq[i + 1]);
        const r = ((right - left) * scaleX) / 2;
        const cx = left * scaleX + x0 + r;
        // even arcs above the walk line (same as makeArcPath), odd below
        const above = i % 2 === 0;
        ctx.moveTo(cx + (above ? -r : r), midY);
        ctx.arc(cx, midY, r, above ? Math.PI : 0, above ? 2 * Math.PI : Math.PI);
      }
    };

    const drawFrame = (phase: number | null) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.setLineDash([]);
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1.2;
      tracePath();
      ctx.stroke();
      if (phase != null) {
        ctx.setLineDash([
          SHIMMER_DASH,
          Math.max(length - SHIMMER_DASH, SHIMMER_DASH),
        ]);
        ctx.lineDashOffset = -phase;
        ctx.strokeStyle = colors.textMuted;
        ctx.lineWidth = 1.6;
        tracePath();
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    if (reducedMotion) {
      drawFrame(null);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      drawFrame((((now - start) % SHIMMER_MS) / SHIMMER_MS) * length);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [width, height, reducedMotion, colors.border, colors.textMuted]);

  return (
    <canvas
      ref={ref}
      data-testid="recaman-skeleton"
      style={{ width, height, display: "block" }}
    />
  );
}
