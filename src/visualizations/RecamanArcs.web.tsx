// src/visualizations/RecamanArcs.web.tsx

import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "react-native-reanimated";
import { useWebCanvas, hslString } from "./useWebCanvas";
import { useThemeColors } from "../theme";
import { useBuildAnimation } from "../playback/useBuildAnimation";
import { splitProgress, strokeRecamanArc } from "../playback/drawProgress";
import { drawNumberLine } from "./canvasAxes";
import { recaman } from "../sequences/generators";
import { layoutRecaman, type RecamanLayout } from "./recamanLayout";

interface Props {
  width: number;
  height: number;
  count?: number;
  preview?: boolean;
}

function drawRecaman(
  ctx: CanvasRenderingContext2D,
  seq: number[],
  layout: RecamanLayout,
  progress: number,
  time: number,
  preview: boolean,
  mutedInk: string
) {
  const { x0: pad, axisY, midY, scaleX, span, maxVal } = layout;
  const { complete, frac } = splitProgress(progress);
  const hueOffset = (time * 45) % 360;
  const breathe = Math.sin(time * 2.1) * 0.5 + 0.5;

  if (!preview) {
    drawNumberLine(ctx, { x0: pad, y: axisY, span, maxVal, ink: mutedInk });
    ctx.fillStyle = mutedInk;
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText("value on number line (low to high)", pad, axisY - 6);
  }

  ctx.lineCap = "round";

  for (let i = 0; i < complete; i++) {
    const val = seq[i];
    const next = seq[i + 1];
    const left = Math.min(val, next);
    const right = Math.max(val, next);
    const radius = ((right - left) * scaleX) / 2;
    const cx = left * scaleX + pad + radius;
    const above = i % 2 === 0;
    const hue = ((i * 360) / seq.length + hueOffset) % 360;
    const lw = (preview ? 1.2 : 2.5) + breathe * (preview ? 0.3 : 0.8);

    ctx.strokeStyle = hslString(hue, 90, 55);
    ctx.lineWidth = lw;
    if (!preview) {
      ctx.shadowColor = hslString(hue, 100, 60);
      ctx.shadowBlur = 6;
    }
    strokeRecamanArc(ctx, cx, midY, radius, above, val < next, 1);
    ctx.shadowBlur = 0;
  }

  if (frac > 0 && complete < seq.length - 1) {
    const i = complete;
    const val = seq[i];
    const next = seq[i + 1];
    const left = Math.min(val, next);
    const right = Math.max(val, next);
    const radius = ((right - left) * scaleX) / 2;
    const cx = left * scaleX + pad + radius;
    const above = i % 2 === 0;
    const hue = ((i * 360) / seq.length + hueOffset) % 360;
    const lw = (preview ? 1.2 : 2.5) + breathe * (preview ? 0.3 : 0.8);

    ctx.strokeStyle = hslString(hue, 90, 55);
    ctx.lineWidth = lw;
    if (!preview) {
      ctx.shadowColor = hslString(hue, 100, 60);
      ctx.shadowBlur = 6;
    }
    strokeRecamanArc(ctx, cx, midY, radius, above, val < next, frac);
    ctx.shadowBlur = 0;
  }

  if (progress > 0) {
    const headIdx = Math.min(Math.ceil(progress), seq.length - 1);
    const term = seq[headIdx];
    const hx = term * scaleX + pad;
    ctx.beginPath();
    ctx.arc(hx, midY, preview ? 3 : 6, 0, Math.PI * 2);
    ctx.fillStyle = hslString(hueOffset, 100, 70);
    if (!preview) {
      ctx.shadowColor = hslString(hueOffset, 100, 70);
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    if (!preview) {
      ctx.strokeStyle = "rgba(255, 120, 120, 0.6)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(hx, midY);
      ctx.lineTo(hx, axisY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
}

// Whimsy item 11: the preview draws its arcs in over 1.4s on mount (glide
// feel), then stops animating. Self-contained rAF instead of useWebCanvas so
// the thumbnail never registers as the export canvas or eats touch scrolling.
function RecamanArcsPreviewWeb({ width, height }: { width: number; height: number }) {
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLCanvasElement | null>(null);

  const seq = useMemo(() => recaman(28), []);
  const layout = useMemo(
    () => layoutRecaman(seq, width, height, true),
    [seq, width, height]
  );

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const total = seq.length - 1;
    const render = (p: number) => {
      ctx.clearRect(0, 0, width, height);
      drawRecaman(ctx, seq, layout, p, 0, true, colors.textMuted);
    };

    if (reducedMotion) {
      render(total);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      // ponytail: easeOutCubic ≈ motion.glide's bezier; close enough for a thumbnail
      render((1 - Math.pow(1 - t, 3)) * total);
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [seq, layout, width, height, reducedMotion, colors.textMuted]);

  return <canvas ref={ref} style={{ width, height, display: "block" }} />;
}

function RecamanArcsFullWeb({ width, height, count = 64 }: Omit<Props, "preview">) {
  const colors = useThemeColors();
  const seq = useMemo(() => recaman(count), [count]);

  // layout is constant per sequence/canvas — keep it out of the rAF loop
  const layout = useMemo(
    () => layoutRecaman(seq, width, height, false),
    [seq, width, height]
  );

  const { progressRef } = useBuildAnimation(Math.max(seq.length - 1, 0), false);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      drawRecaman(ctx, seq, layout, progressRef.current, time, false, colors.textMuted);
    },
    [seq, layout, progressRef, colors.textMuted]
  );

  const ref = useWebCanvas(width, height, draw, true);
  return <canvas ref={ref} style={{ width, height, display: "block" }} />;
}

export default function RecamanArcs({ width, height, count, preview }: Props) {
  if (preview) {
    return <RecamanArcsPreviewWeb width={width} height={height} />;
  }
  return <RecamanArcsFullWeb width={width} height={height} count={count} />;
}
