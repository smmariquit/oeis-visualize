import { captionForSequence, goldenRatioSuffix } from "../../../src/components/vizCaptionText";
import type { OEISSequence } from "../../../src/sequences/types";

const FIB = ["0", "1", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89"];

describe("goldenRatioSuffix", () => {
  it("is empty before two terms are revealed or when dividing by zero", () => {
    expect(goldenRatioSuffix(FIB, 0)).toBe("");
    expect(goldenRatioSuffix(FIB, 1)).toBe("");
    expect(goldenRatioSuffix(["5", "8"], 1)).toBe("");
    // a(1)/a(0) would divide by zero
    expect(goldenRatioSuffix(FIB, 2)).toBe("");
  });

  it("shows the ratio converging on phi", () => {
    const s = goldenRatioSuffix(FIB, FIB.length);
    expect(s).toContain("1.6182"); // 89/55
    expect(s).toContain("φ");
  });

  it("only decorates A000045", () => {
    const fib = {
      anum: "A000045",
      name: "Fibonacci",
      description: "",
      vizType: "fibonacci-spiral",
      terms: FIB,
    } as unknown as OEISSequence;
    expect(captionForSequence(fib, 12).live).toContain("φ");

    const ulam = { ...fib, anum: "A000040", vizType: "ulam-spiral" } as OEISSequence;
    expect(captionForSequence(ulam, 12).live).not.toContain("φ");
  });
});
