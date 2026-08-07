import { toneToWavBytes } from "../../../src/audio/wav";

function channelPeaks(bytes: Uint8Array): { left: number; right: number } {
  const view = new DataView(bytes.buffer);
  let left = 0;
  let right = 0;
  for (let off = 44; off + 3 < bytes.length; off += 4) {
    left = Math.max(left, Math.abs(view.getInt16(off, true)));
    right = Math.max(right, Math.abs(view.getInt16(off + 2, true)));
  }
  return { left, right };
}

describe("toneToWavBytes pan", () => {
  it("stays mono at center pan (existing callers unchanged)", () => {
    const bytes = toneToWavBytes(440, 0.01);
    const view = new DataView(bytes.buffer);
    expect(view.getUint16(22, true)).toBe(1);
    expect(bytes.length).toBe(44 + Math.floor(0.01 * 22050) * 2);
  });

  it("renders stereo with the louder channel on the pan side", () => {
    const bytes = toneToWavBytes(440, 0.01, 22050, 0.65);
    const view = new DataView(bytes.buffer);
    expect(view.getUint16(22, true)).toBe(2);
    const { left, right } = channelPeaks(bytes);
    expect(right).toBeGreaterThan(left);

    const mirrored = channelPeaks(toneToWavBytes(440, 0.01, 22050, -0.65));
    expect(mirrored.left).toBeGreaterThan(mirrored.right);
  });
});
