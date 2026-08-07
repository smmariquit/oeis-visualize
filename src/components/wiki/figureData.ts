// src/components/wiki/figureData.ts
//
// Pure data behind the Learn wiki figures. No React, no I/O — unit tested
// in tests/unit/wiki/figureData.test.ts.

/** Pisano period: how long Fibonacci mod m takes to repeat. m >= 2. */
export function pisanoPeriod(m: number): number {
  if (!Number.isInteger(m) || m < 2) return 1;
  let a = 0;
  let b = 1;
  // π(m) <= 6m for all m (equality at m = 2·5^k)
  for (let i = 1; i <= 6 * m + 1; i++) {
    [a, b] = [b, (a + b) % m];
    if (a === 0 && b === 1) return i;
  }
  return 0; // unreachable for valid m
}

/** First `count` Fibonacci residues mod m, starting 0, 1. */
export function fibResidues(m: number, count: number): number[] {
  const out: number[] = [];
  let a = 0;
  let b = 1;
  for (let i = 0; i < count; i++) {
    out.push(a);
    [a, b] = [b, (a + b) % m];
  }
  return out;
}

/** Successive ratios F(n+1)/F(n) starting from 1/1 — converge to phi. */
export function fibRatios(count: number): number[] {
  const out: number[] = [];
  let a = 1;
  let b = 1;
  for (let i = 0; i < count; i++) {
    out.push(b / a);
    [a, b] = [b, a + b];
  }
  return out;
}

export const COLLATZ_MAX_START = 1_000_000;

/**
 * Collatz orbit from `start` down to 1, inclusive.
 * Returns null outside 1..10^6. Cap 1200 values (max known below the
 * guard is 525, so the cap never truncates a valid orbit).
 */
export function collatzOrbit(start: number): number[] | null {
  if (!Number.isInteger(start) || start < 1 || start > COLLATZ_MAX_START) {
    return null;
  }
  const orbit = [start];
  let n = start;
  while (n !== 1 && orbit.length < 1200) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    orbit.push(n);
  }
  return orbit;
}

/** Conjugate (transpose) of a partition given as weakly decreasing parts. */
export function conjugatePartition(parts: number[]): number[] {
  const max = parts.length ? Math.max(...parts) : 0;
  return Array.from({ length: max }, (_, i) => parts.filter((p) => p > i).length);
}

/** All Dyck paths (balanced bracket strings) with n pairs; Catalan(n) many. */
export function dyckPaths(n: number): string[] {
  if (n <= 0) return [""];
  const out: string[] = [];
  const rec = (s: string, open: number, close: number) => {
    if (s.length === 2 * n) {
      out.push(s);
      return;
    }
    if (open < n) rec(s + "(", open + 1, close);
    if (close < open) rec(s + ")", open, close + 1);
  };
  rec("", 0, 0);
  return out;
}

/** Leading-digit frequencies (index 0 = digit 1 … index 8 = digit 9). */
export function leadingDigitFreqs(values: Array<number | bigint>): number[] {
  const counts = new Array(9).fill(0);
  let total = 0;
  for (const v of values) {
    const s = v.toString();
    const first = s[0] === "-" ? s[1] : s[0];
    const d = Number(first);
    if (d >= 1 && d <= 9) {
      counts[d - 1]++;
      total++;
    }
  }
  return counts.map((c) => (total ? c / total : 0));
}

/** Benford's law P(d) = log10(1 + 1/d) for d = 1..9. */
export const BENFORD_P = Array.from({ length: 9 }, (_, i) =>
  Math.log10(1 + 1 / (i + 1))
);

/** First `count` Fibonacci numbers as bigints (exact leading digits). */
export function fibBig(count: number): bigint[] {
  const out: bigint[] = [];
  let a = 0n;
  let b = 1n;
  for (let i = 0; i < count; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}

/** 2^1 .. 2^count as bigints. */
export function powersOf2(count: number): bigint[] {
  const out: bigint[] = [];
  let v = 1n;
  for (let i = 0; i < count; i++) {
    v *= 2n;
    out.push(v);
  }
  return out;
}

/** Deterministic PRNG (mulberry32) so the "random" dataset is stable. */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** `count` seeded uniform integers in 1..999999. */
export function seededUniform(count: number, seed = 42): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => 1 + Math.floor(rnd() * 999_999));
}
