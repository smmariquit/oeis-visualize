import { goldenSpiralPath } from "../../../src/visualizations/goldenSpiralPath";

describe("goldenSpiralPath", () => {
  const s = goldenSpiralPath(8, 2);

  it("emits one 90° arc command per quarter turn", () => {
    expect((s.d.match(/A /g) ?? []).length).toBe(8);
    expect(s.d.startsWith("M ")).toBe(true);
  });

  it("accumulates quarter-circle lengths of fibonacci radii", () => {
    const fib = [1, 1, 2, 3, 5, 8, 13, 21];
    expect(s.cumLengths[0]).toBe(0);
    for (let k = 0; k < 8; k++) {
      expect(s.cumLengths[k + 1] - s.cumLengths[k]).toBeCloseTo(
        (Math.PI / 2) * fib[k] * 2,
        6
      );
    }
    expect(s.totalLength).toBeCloseTo(s.cumLengths[8], 6);
  });

  it("produces a positive viewBox that contains the largest radius", () => {
    const [, , w, h] = s.viewBox.split(" ").map(Number);
    expect(w).toBeGreaterThanOrEqual(21 * 2); // widest arc's radius fits
    expect(h).toBeGreaterThan(0);
  });
});
