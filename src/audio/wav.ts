// src/audio/wav.ts
//
// Generate short tone WAV data URIs for native playback.

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

export function toneToWavBytes(
  frequency: number,
  durationSec: number,
  sampleRate = 22050,
  pan = 0
): Uint8Array {
  // pan !== 0 renders a stereo file with constant-power channel gains;
  // pan 0 keeps the original mono layout (all existing callers).
  const channels = pan ? 2 : 1;
  const frameBytes = channels * 2;
  const samples = Math.max(1, Math.floor(durationSec * sampleRate));
  const buffer = new ArrayBuffer(44 + samples * frameBytes);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples * frameBytes, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * frameBytes, true);
  view.setUint16(32, frameBytes, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples * frameBytes, true);

  const theta = ((Math.max(-1, Math.min(1, pan)) + 1) * Math.PI) / 4;
  const gainL = Math.cos(theta);
  const gainR = Math.sin(theta);

  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const env = Math.min(1, i / (sampleRate * 0.01)) * Math.max(0, 1 - t / durationSec);
    const sample = Math.sin(2 * Math.PI * frequency * t) * env * 0.8;
    if (channels === 1) {
      view.setInt16(44 + i * 2, sample * 0x7fff, true);
    } else {
      view.setInt16(44 + i * 4, sample * gainL * 0x7fff, true);
      view.setInt16(44 + i * 4 + 2, sample * gainR * 0x7fff, true);
    }
  }

  return new Uint8Array(buffer);
}

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof btoa !== "undefined") {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += B64[b0 >> 2];
    out += B64[((b0 & 3) << 4) | (b1 >> 4)];
    out += i + 1 < bytes.length ? B64[((b1 & 15) << 2) | (b2 >> 6)] : "=";
    out += i + 2 < bytes.length ? B64[b2 & 63] : "=";
  }
  return out;
}

export function toneToWavUri(frequency: number, durationSec: number, pan = 0): string {
  const bytes = toneToWavBytes(frequency, durationSec, 22050, pan);
  return `data:audio/wav;base64,${bytesToBase64(bytes)}`;
}
