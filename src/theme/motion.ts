// src/theme/motion.ts
//
// Whimsy redesign motion language. Chrome glides, numbers hop.
// Reduced motion: every bounce becomes a 150ms opacity fade; loaders show the
// final count; parade becomes a color change. Nothing is information-bearing
// through motion alone.

import { Easing } from "react-native-reanimated";

export const motion = {
  /** counters, digit changes */
  tick: { duration: 90, easing: Easing.linear },
  /** sheets, tab underline, theme crossfade; chrome never bounces */
  glide: { duration: 240, easing: Easing.bezier(0.22, 1, 0.36, 1) },
  /** numbers landing, tab dot, loader counts (withSpring overshoot ~= curve) */
  hop: { duration: 420, easing: Easing.bezier(0.34, 1.56, 0.64, 1) },
  /** wrong guess: droop, tilt, desaturate, recover; staggered per tile */
  sulk: {
    duration: 600,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
    droopPx: 5,
    rotateDeg: -2.5,
    desaturate: 0.35,
    staggerMs: 30,
  },
  /** win: hop wave in term order while pitches play */
  parade: { duration: 700, staggerMs: 60 },
  /** reduced-motion replacement for any bounce */
  reducedFade: { duration: 150, easing: Easing.linear },
} as const;
