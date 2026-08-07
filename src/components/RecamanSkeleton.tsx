// src/components/RecamanSkeleton.tsx
//
// Whimsy item 11: the featured-card loading skeleton is the data — the
// Recamán walk as a faint arc path with a 30-unit dash shimmering along it
// on a 1.8s loop. Reduced motion: static path, no shimmer.

import React, { useEffect, useMemo } from "react";
import {
  Canvas,
  DashPathEffect,
  Path as SkiaPath,
  Skia,
} from "@shopify/react-native-skia";
import {
  Easing,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { recaman } from "../sequences/generators";
import { useThemeColors } from "../theme";
import { layoutRecaman } from "../visualizations/recamanLayout";
import { makeArcPath } from "../visualizations/RecamanArcs";

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

  const { path, length } = useMemo(() => {
    const seq = recaman(TERMS);
    const { x0, midY, scaleX } = layoutRecaman(seq, width, height, true);
    const path = Skia.Path.Make();
    let length = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      const left = Math.min(seq[i], seq[i + 1]);
      const right = Math.max(seq[i], seq[i + 1]);
      path.addPath(makeArcPath(left, right, scaleX, x0, midY, i % 2 === 0));
      // semicircle of radius (right-left)*scaleX/2
      length += (Math.PI * (right - left) * scaleX) / 2;
    }
    return { path, length };
  }, [width, height]);

  const phase = useSharedValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    phase.value = 0;
    phase.value = withRepeat(
      withTiming(-length, { duration: SHIMMER_MS, easing: Easing.linear }),
      -1
    );
  }, [reducedMotion, length, phase]);

  return (
    <Canvas style={{ width, height }} testID="recaman-skeleton">
      <SkiaPath
        path={path}
        style="stroke"
        strokeWidth={1.2}
        color={colors.border}
      />
      {!reducedMotion && (
        <SkiaPath
          path={path}
          style="stroke"
          strokeWidth={1.6}
          strokeCap="round"
          color={colors.textMuted}
        >
          <DashPathEffect
            intervals={[SHIMMER_DASH, Math.max(length - SHIMMER_DASH, SHIMMER_DASH)]}
            phase={phase}
          />
        </SkiaPath>
      )}
    </Canvas>
  );
}
