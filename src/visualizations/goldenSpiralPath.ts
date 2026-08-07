// src/visualizations/goldenSpiralPath.ts
//
// Golden (Fibonacci) spiral approximated by quarter-circle arcs, for the
// pull-to-refresh indicator: an SVG path string plus per-quarter cumulative
// arc lengths so the reveal can step quarter-turn by quarter-turn.

const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

export interface GoldenSpiral {
  /** SVG path: M start + one 90° arc command per quarter turn. */
  d: string;
  /** cumulative stroke length after each quarter turn; index 0 = 0. */
  cumLengths: number[];
  totalLength: number;
  /** tight bounding box of the spiral, padded. */
  viewBox: string;
  quarters: number;
}

export function goldenSpiralPath(quarters = 8, unit = 2): GoldenSpiral {
  // Tangent-continuous construction: each arc's center sits behind the
  // current point along the current radius direction, so consecutive
  // quarter circles join smoothly (the classic squares construction).
  let theta = 0;
  let px = FIB[0] * unit;
  let py = 0;
  let minX = px;
  let maxX = px;
  let minY = py;
  let maxY = py;
  const parts = [`M ${px.toFixed(2)} ${py.toFixed(2)}`];
  const cumLengths = [0];
  let total = 0;

  for (let k = 0; k < quarters; k++) {
    const r = FIB[Math.min(k, FIB.length - 1)] * unit;
    const cx = px - r * Math.cos(theta);
    const cy = py - r * Math.sin(theta);
    const end = theta + Math.PI / 2;
    for (let a = theta; a <= end + 1e-9; a += Math.PI / 18) {
      const sx = cx + r * Math.cos(a);
      const sy = cy + r * Math.sin(a);
      minX = Math.min(minX, sx);
      maxX = Math.max(maxX, sx);
      minY = Math.min(minY, sy);
      maxY = Math.max(maxY, sy);
    }
    px = cx + r * Math.cos(end);
    py = cy + r * Math.sin(end);
    parts.push(
      `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${px.toFixed(2)} ${py.toFixed(2)}`
    );
    total += (Math.PI / 2) * r;
    cumLengths.push(total);
    theta = end;
  }

  const pad = 2;
  const viewBox = [
    (minX - pad).toFixed(2),
    (minY - pad).toFixed(2),
    (maxX - minX + pad * 2).toFixed(2),
    (maxY - minY + pad * 2).toFixed(2),
  ].join(" ");
  return { d: parts.join(" "), cumLengths, totalLength: total, viewBox, quarters };
}
