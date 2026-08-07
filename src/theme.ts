// src/theme.ts
//
// Brand palette + viz generators. UI chrome uses semantic aliases below.

import { useColorScheme } from "react-native";
import { resolveVizColor } from "./visualizations/vizColorStore";

export const darkColors = {
  // Surfaces (whimsy redesign: warm plum ground)
  bg: "#140E19",
  bgElevated: "#1B1424",
  bgCard: "#221933",
  bgCardHover: "#2A203E",
  surface: "#2A203E",
  surfacePressed: "#34294C",
  surfaceLight: "#3B2E54",

  // Text (contrast lifted well past AA)
  text: "#F6F1FB",
  textDim: "#C3B8DC",
  textMuted: "#A79BC4",

  // Brand & interaction (teal chrome; neon purple stays viz-only in palettes)
  primary: "#2EC4B6",
  primaryDim: "rgba(46, 196, 182, 0.14)",
  primaryBorder: "rgba(46, 196, 182, 0.42)",
  accent: "#2EC4B6",
  accentAlt: "#FF6FA5",
  interactive: "#5EEAD4",

  // Structure
  border: "#3B2E54",
  borderSubtle: "rgba(255, 255, 255, 0.07)",
  focusRing: "rgba(46, 196, 182, 0.45)",

  // Whimsy accents
  gold: "#F2C766",
  primeGlow: "rgba(116, 228, 242, 0.55)",
  candySky: "#74E4F2",
  candyLime: "#A8EE9B",
  candyRose: "#FF9DC7",
  candyPeach: "#FFB187",
  candyButter: "#FFE18A",

  // Legacy aliases (viz + gradual migration)
  neonCyan: "#56E8FF",
  neonGreen: "#39FF14",
  neonPink: "#FF10F0",
  neonOrange: "#FF6B2B",
  neonYellow: "#FFE62B",
};

export const lightColors = {
  // Whimsy redesign: warm paper
  bg: "#FBF8F4",
  bgElevated: "#F4EFE9",
  bgCard: "#FFFFFF",
  bgCardHover: "#F7F2EC",
  surface: "#F1EBE4",
  surfacePressed: "#E7DFD6",
  surfaceLight: "#E0D7CC",

  text: "#231B2E",
  textDim: "#463B58",
  // ≥4.5:1 (WCAG AA) on paper and cards
  textMuted: "#5D5175",

  primary: "#0E9488",
  primaryDim: "rgba(14, 148, 136, 0.11)",
  primaryBorder: "rgba(14, 148, 136, 0.35)",
  accent: "#0E9488",
  accentAlt: "#D6336C",
  interactive: "#0F766E",

  border: "#E2DAD0",
  borderSubtle: "rgba(30, 20, 40, 0.08)",
  focusRing: "rgba(14, 148, 136, 0.45)",

  // Whimsy accents (AA-tuned twins of the dark candy set)
  gold: "#A8741A",
  primeGlow: "rgba(14, 135, 160, 0.35)",
  candySky: "#0E87A0",
  candyLime: "#4E9A2B",
  candyRose: "#D6336C",
  candyPeach: "#D9631E",
  candyButter: "#B08312",
  
  neonCyan: "#0891B2",
  neonGreen: "#16A34A",
  neonPink: "#DB2777",
  neonOrange: "#EA580C",
  neonYellow: "#CA8A04",
};

export type Colors = typeof darkColors;

export const colors = darkColors; // Fallback for outside React

export function useThemeColors(): Colors {
  const scheme = useColorScheme();
  return scheme === 'light' ? lightColors : darkColors;
}

export { palettes } from "./theme/palettes";

export function hslToHex(h: number, s: number, l: number): string {
  "worklet";
  // route through viz color settings; worklet copies refresh on remount
  // (VizPreview keys every viz by the color-settings version)
  const resolved = resolveVizColor(h);
  if (resolved.kind === "hex") return resolved.hex;
  h = resolved.hue;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  const c = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (v: number) =>
    Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function indexToRainbow(i: number, offset = 0, saturation = 85, lightness = 60): string {
  return hslToHex((i * 37 + offset) % 360, saturation, lightness);
}
