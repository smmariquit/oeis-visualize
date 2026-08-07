// src/visualizations/PairPlot.tsx
//
// Static two-sequence comparison plot (phase plane or ratio). No build-up
// animation: construction order carries no information here (Tversky 2002).

import React, { useMemo } from "react";
import { Path as SkiaPath, Circle, Line, DashPathEffect, vec } from "@shopify/react-native-skia";
import VizCanvas from "./VizCanvas";
import { hslToHex, useThemeColors } from "../theme";
import { makePolylinePath } from "../playback/smoothPath";
import { pairPoints, ratioGuideY, type PairMode } from "./pairPoints";

interface Props {
  termsA: string[];
  termsB: string[];
  mode: PairMode;
  width: number;
  height: number;
  /** Ratio mode only: draw a dashed gold guide at this a(n)/b(n) limit. */
  guideValue?: number;
}

export default function PairPlot({ termsA, termsB, mode, width, height, guideValue }: Props) {
  const colors = useThemeColors();
  const points = useMemo(
    () => pairPoints(termsA, termsB, mode, width, height, 24),
    [termsA, termsB, mode, width, height]
  );

  const guideY = useMemo(
    () =>
      mode === "ratio" && guideValue !== undefined
        ? ratioGuideY(termsA, termsB, guideValue, height, 24)
        : null,
    [termsA, termsB, mode, guideValue, height]
  );

  const path = useMemo(
    () => makePolylinePath(points, Math.max(points.length - 1, 0)),
    [points]
  );

  const dots = useMemo(() => {
    const every = Math.max(1, Math.floor(points.length / 40));
    return points.filter((_, i) => i % every === 0);
  }, [points]);

  return (
    <VizCanvas width={width} height={height}>
      {guideY !== null ? (
        <Line p1={vec(24, guideY)} p2={vec(width - 24, guideY)} color={colors.gold} strokeWidth={1.2}>
          <DashPathEffect intervals={[4, 5]} />
        </Line>
      ) : null}
      <SkiaPath
        path={path}
        style="stroke"
        strokeWidth={1.6}
        color={hslToHex(mode === "phase" ? 265 : 180, 80, 62)}
        strokeJoin="round"
        strokeCap="round"
      />
      {dots.map((pt, i) => (
        <Circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={2.5}
          color={hslToHex((i * 360) / Math.max(dots.length, 1), 90, 62)}
        />
      ))}
    </VizCanvas>
  );
}
