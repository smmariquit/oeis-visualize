import {
  BENFORD_P,
  collatzOrbit,
  conjugatePartition,
  dyckPaths,
  fibBig,
  fibRatios,
  fibResidues,
  leadingDigitFreqs,
  mulberry32,
  pisanoPeriod,
  powersOf2,
  seededUniform,
} from "../../../src/components/wiki/figureData";

describe("pisanoPeriod", () => {
  it("matches known Pisano periods", () => {
    expect(pisanoPeriod(2)).toBe(3);
    expect(pisanoPeriod(3)).toBe(8);
    expect(pisanoPeriod(5)).toBe(20);
    expect(pisanoPeriod(10)).toBe(60);
  });

  it("returns 1 for degenerate moduli", () => {
    expect(pisanoPeriod(1)).toBe(1);
    expect(pisanoPeriod(0)).toBe(1);
  });
});

describe("fibResidues", () => {
  it("gives Fibonacci mod m from 0, 1", () => {
    expect(fibResidues(5, 10)).toEqual([0, 1, 1, 2, 3, 0, 3, 3, 1, 4]);
  });

  it("repeats after the Pisano period", () => {
    const period = pisanoPeriod(7);
    const r = fibResidues(7, period * 2);
    expect(r.slice(period)).toEqual(r.slice(0, period));
  });
});

describe("fibRatios", () => {
  it("starts 1, 2, 1.5 and converges toward phi", () => {
    const r = fibRatios(20);
    expect(r.slice(0, 3)).toEqual([1, 2, 1.5]);
    expect(r[19]).toBeCloseTo((1 + Math.sqrt(5)) / 2, 6);
  });
});

describe("collatzOrbit", () => {
  it("computes the famous 27 orbit", () => {
    const orbit = collatzOrbit(27)!;
    expect(orbit[0]).toBe(27);
    expect(orbit[orbit.length - 1]).toBe(1);
    expect(orbit.length - 1).toBe(111); // steps
    expect(Math.max(...orbit)).toBe(9232);
  });

  it("handles the trivial start", () => {
    expect(collatzOrbit(1)).toEqual([1]);
  });

  it("rejects input outside 1..10^6", () => {
    expect(collatzOrbit(0)).toBeNull();
    expect(collatzOrbit(-5)).toBeNull();
    expect(collatzOrbit(1_000_001)).toBeNull();
    expect(collatzOrbit(2.5)).toBeNull();
    expect(collatzOrbit(NaN)).toBeNull();
  });

  it("finishes without truncation at the worst case under the cap", () => {
    const orbit = collatzOrbit(837_799)!; // longest orbit below 10^6
    expect(orbit[orbit.length - 1]).toBe(1);
    expect(orbit.length - 1).toBe(524);
  });
});

describe("conjugatePartition", () => {
  it("transposes the diagram", () => {
    expect(conjugatePartition([5, 3, 3, 1])).toEqual([4, 3, 3, 1, 1]);
    expect(conjugatePartition([4])).toEqual([1, 1, 1, 1]);
    expect(conjugatePartition([])).toEqual([]);
  });

  it("is an involution", () => {
    const p = [6, 4, 4, 2, 1];
    expect(conjugatePartition(conjugatePartition(p))).toEqual(p);
  });
});

describe("dyckPaths", () => {
  it("counts Catalan numbers", () => {
    expect(dyckPaths(0)).toEqual([""]);
    expect(dyckPaths(1)).toEqual(["()"]);
    expect(dyckPaths(3)).toHaveLength(5);
    expect(dyckPaths(4)).toHaveLength(14);
  });

  it("only produces balanced strings", () => {
    for (const s of dyckPaths(3)) {
      let depth = 0;
      for (const ch of s) {
        depth += ch === "(" ? 1 : -1;
        expect(depth).toBeGreaterThanOrEqual(0);
      }
      expect(depth).toBe(0);
    }
  });
});

describe("leadingDigitFreqs", () => {
  it("counts leading digits, ignoring signs and zero", () => {
    expect(leadingDigitFreqs([1, 19, 2, -35, 0])).toEqual([
      0.5, 0.25, 0.25, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it("sums to 1 for nonempty data", () => {
    const sum = leadingDigitFreqs(powersOf2(80)).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("shows Benford behavior for Fibonacci and powers of 2", () => {
    for (const values of [fibBig(81).slice(1), powersOf2(80)]) {
      const f = leadingDigitFreqs(values);
      expect(f[0]).toBeGreaterThan(0.25); // digit 1 near 30.1%
      expect(f[0]).toBeLessThan(0.36);
      expect(f[8]).toBeLessThan(0.09); // digit 9 near 4.6%
    }
  });

  it("BENFORD_P is the log curve", () => {
    expect(BENFORD_P[0]).toBeCloseTo(Math.log10(2), 12);
    expect(BENFORD_P.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
  });
});

describe("seeded random dataset", () => {
  it("is deterministic and in range", () => {
    expect(seededUniform(50, 42)).toEqual(seededUniform(50, 42));
    for (const v of seededUniform(200)) {
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(999_999);
    }
  });

  it("mulberry32 yields floats in [0, 1)", () => {
    const rnd = mulberry32(7);
    for (let i = 0; i < 100; i++) {
      const v = rnd();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
