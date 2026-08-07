// src/visualizations/UlamSpiral.tsx

import React, { useMemo } from "react";
import { Platform } from "react-native";
import {
  Circle,
  Group,
  matchFont,
} from "@shopify/react-native-skia";
import VizCanvas from "./VizCanvas";
import SkiaLabel from "./SkiaLabel";
import { ulamSpiralCoords } from "../sequences/generators";
import { hslToHex, useThemeColors } from "../theme";
import { useBuildAnimation, useItemFrac } from "../playback/useBuildAnimation";

const fontFamily = Platform.select({ ios: "Helvetica", default: "sans-serif" });
const headFont = matchFont({ fontFamily, fontSize: 13, fontWeight: "600" });

interface Props {
  width: number;
  height: number;
  count?: number;
  preview?: boolean;
}

export function UlamSpiralPreview({ width, height }: { width: number; height: number }) {
  const coords = useMemo(() => ulamSpiralCoords(180), []);
  const maxCoord = useMemo(() => {
    let m = 0;
    for (const c of coords) {
      m = Math.max(m, Math.abs(c.x), Math.abs(c.y));
    }
    return m;
  }, [coords]);

  const cx = width / 2;
  const cy = height / 2;
  const cellSize = Math.min(width, height) * 0.9 / (maxCoord * 2 + 1);

  return (
    <VizCanvas width={width} height={height}>
      {coords.map((c, i) => {
        const px = cx + c.x * cellSize;
        const py = cy + c.y * cellSize;
        if (!c.prime) {
          if (i % 3 !== 0) return null;
          return (
            <Circle
              key={i}
              cx={px}
              cy={py}
              r={cellSize * 0.15}
              color="rgba(90, 80, 140, 0.15)"
            />
          );
        }
        const dist = Math.sqrt(c.x * c.x + c.y * c.y);
        return (
          <Circle
            key={i}
            cx={px}
            cy={py}
            r={cellSize * 0.35}
            color={hslToHex((dist * 12) % 360, 100, 65)}
          />
        );
      })}
    </VizCanvas>
  );
}

export function UlamSpiralFull({ width, height, count = 2000 }: Omit<Props, "preview">) {
  const colors = useThemeColors();
  const { progressSV, step: visible } = useBuildAnimation(count, false);
  const fade = useItemFrac(progressSV, visible);
  const coords = useMemo(() => ulamSpiralCoords(count), [count]);

  const maxCoord = useMemo(() => {
    let m = 0;
    for (const c of coords) {
      m = Math.max(m, Math.abs(c.x), Math.abs(c.y));
    }
    return m;
  }, [coords]);

  const cx = width / 2;
  const cy = height / 2;
  const cellSize = Math.min(width, height) * 0.9 / (maxCoord * 2 + 1);

  // Counting head label ("n = 97, prime"), native twin of the web canvas one.
  const headI = Math.min(visible, coords.length - 1);
  const head = visible > 0 ? coords[headI] : null;
  const headPx = head ? cx + head.x * cellSize : 0;
  const headPy = head ? cy + head.y * cellSize : 0;

  return (
    <VizCanvas width={width} height={height}>
      {coords.slice(0, visible).map((c, i) => {
        if (!c.prime) return null;
        const px = cx + c.x * cellSize;
        const py = cy + c.y * cellSize;
        const dist = Math.sqrt(c.x * c.x + c.y * c.y);
        return (
          <Circle
            key={i}
            cx={px}
            cy={py}
            r={cellSize * 0.45}
            color={hslToHex((dist * 12) % 360, 100, 65)}
          />
        );
      })}
      {coords[visible]?.prime && (
        <Group opacity={fade}>
          <Circle
            cx={cx + coords[visible].x * cellSize}
            cy={cy + coords[visible].y * cellSize}
            r={cellSize * 0.45}
            color={hslToHex(
              (Math.sqrt(
                coords[visible].x * coords[visible].x +
                  coords[visible].y * coords[visible].y
              ) *
                12) %
                360,
              100,
              65
            )}
          />
        </Group>
      )}
      {head && (
        <SkiaLabel
          text={`n = ${headI + 1}${head.prime ? ", prime" : ""}`}
          x={headPx + 12 > width - 130 ? headPx - 12 - 110 : headPx + 12}
          y={headPy - 14}
          font={headFont}
          fg={colors.text}
          bg={colors.bg}
        />
      )}
    </VizCanvas>
  );
}

export default function UlamSpiral({ width, height, count, preview }: Props) {
  if (preview !== false) {
    return <UlamSpiralPreview width={width} height={height} />;
  }
  return <UlamSpiralFull width={width} height={height} count={count} />;
}
