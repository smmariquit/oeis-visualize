// src/audio/types.ts

export type MusicElementId = "melody" | "bass" | "harmony" | "rhythm" | "digits" | "pad";

export type WaveType = "sine" | "triangle" | "square" | "sawtooth";

export type DrumKind = "kick" | "snare" | "hat";

export interface NoteSpec {
  frequency: number;
  duration: number;
  gain: number;
  wave: WaveType;
  /** Percussion hits ignore frequency/wave. */
  drum?: DrumKind;
  /** Stereo position, -1 (left) to 1 (right). Default center. */
  pan?: number;
}

export interface MusicElementDef {
  id: MusicElementId;
  label: string;
  icon: "musical-notes" | "radio" | "layers-outline" | "pulse" | "keypad-outline" | "cloudy-outline";
  description: string;
}

export interface SonifyContext {
  step: number;
  term: string;
  prevTerm?: string;
  speed: number;
}
