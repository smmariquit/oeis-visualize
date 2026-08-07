import { localAt } from "../../../src/notifications/scheduler";

describe("localAt", () => {
  it("pads single-digit hours", () => {
    const d = localAt("2026-08-07", 9);
    expect(d.getHours()).toBe(9);
    expect(d.getDate()).toBe(7);
  });

  it("handles two-digit hours", () => {
    const d = localAt("2026-08-07", 12);
    expect(d.getHours()).toBe(12);
    expect(Number.isNaN(d.getTime())).toBe(false);
  });
});
