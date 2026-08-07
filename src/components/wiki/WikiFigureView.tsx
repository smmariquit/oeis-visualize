// src/components/wiki/WikiFigureView.tsx
//
// Inline graphic deep-dives for Learn articles. Dispatches on figure.kind;
// each figure is a small react-native-svg drawing (portable web + native),
// themed, full width, caption below in the wiki caption style. Nothing
// animates on its own: sound and motion only follow a tap.
//
// Figure catalog (exact param shapes; all params optional unless noted):
//   "pisano-strip"      { m?: number }                 2..30, default 5
//   "ratio-convergence" { count?: number }             4..24, default 12
//   "ulam-mini"         { highlightDiagonal?: boolean }
//   "collatz-orbit"     { start?: number }             1..1e6, default 27
//   "ferrers"           { parts?: number[] }           default [5, 3, 3, 1]
//   "benford-bars"      {}
//   "dyck-paths"        {}
//   "harmonic-ladder"   { partials?: number[] }        ints 1..32, default [1,2,3,4]
//   "residue-wheel"     { seq?: string; terms?: Array<number | string> }
//   "term-plot"         { terms: number[]; label?: string }   terms required

import React from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Circle, Line, Polyline, Rect, Text as SvgText } from "react-native-svg";
import { useReducedMotion } from "react-native-reanimated";
import { useThemeColors, type Colors } from "../../theme";
import { radii, spacing, typography } from "../../theme/tokens";
import type { WikiFigure } from "../../content/infoContent";
import { playNotes } from "../../audio/engine";
import { termTapNote } from "../../audio/mapTerm";
import { fibonacci, ulamSpiralCoords } from "../../sequences/generators";
import { getSequence } from "../../sequences/catalog";
import { normalize, termMod } from "../../sequences/normalize";
import BodyText from "../ui/BodyText";
import PillButton from "../ui/PillButton";
import {
  BENFORD_P,
  COLLATZ_MAX_START,
  collatzOrbit,
  conjugatePartition,
  dyckPaths,
  fibBig,
  fibRatios,
  fibResidues,
  leadingDigitFreqs,
  pisanoPeriod,
  powersOf2,
  seededUniform,
} from "./figureData";

/** Shared viewBox width; every figure scales to the article column. */
const W = 340;

type Params = Record<string, any>;
interface FigProps {
  p: Params;
  colors: Colors;
}

const PHI = (1 + Math.sqrt(5)) / 2;

function clampInt(v: unknown, lo: number, hi: number, def: number): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : def;
}

function candySet(c: Colors): string[] {
  return [c.candySky, c.candyLime, c.candyRose, c.candyPeach, c.candyButter];
}

/** Responsive Svg: full width, height from the viewBox aspect. */
function FigSvg({ h, children }: { h: number; children: React.ReactNode }) {
  return (
    <View style={{ width: "100%", aspectRatio: W / h }}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${h}`}>
        {children}
      </Svg>
    </View>
  );
}

/**
 * Tap-started step sequencer: calls playAt(i) every `ms` until `count`.
 * `at` is -1 when idle. Stops on unmount; callers stop() when data changes.
 */
function useLoopPlayer(count: number, ms: number, playAt: (i: number) => void) {
  const [at, setAt] = React.useState(-1);
  const timer = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const stop = React.useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
    setAt(-1);
  }, []);
  React.useEffect(() => stop, [stop]);
  const toggle = () => {
    if (timer.current) {
      stop();
      return;
    }
    if (count <= 0) return;
    let i = 0;
    playAt(0);
    setAt(0);
    timer.current = setInterval(() => {
      i += 1;
      if (i >= count) {
        stop();
        return;
      }
      playAt(i);
      setAt(i);
    }, ms);
  };
  return { at, playing: at >= 0, toggle, stop };
}

// ---------------------------------------------------------------- figures

function PisanoStrip({ p, colors }: FigProps) {
  const m = clampInt(p.m, 2, 30, 5);
  const period = pisanoPeriod(m);
  const shownCount = Math.min(period + Math.min(period, 8), 40);
  const residues = React.useMemo(() => fibResidues(m, shownCount), [m, shownCount]);
  const candy = candySet(colors);

  const { at, playing, toggle } = useLoopPlayer(period, 190, (i) => {
    void playNotes([termTapNote(String(residues[i]))]);
  });

  const H = 160;
  const pad = 10;
  const cellW = (W - pad * 2) / shownCount;
  const bracketX1 = pad + period * cellW;

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel={
        playing
          ? "Stop playing the Fibonacci residue loop"
          : `Play the Fibonacci residues mod ${m} as notes`
      }
    >
      <FigSvg h={H}>
        <SvgText x={pad} y={20} fontSize={12} fill={colors.textDim}>
          {`Fibonacci mod ${m}`}
        </SvgText>
        <SvgText x={W - pad} y={20} fontSize={10} fill={colors.interactive} textAnchor="end">
          {playing ? "playing…" : "tap to hear the loop"}
        </SvgText>
        {residues.map((r, i) => (
          <Rect
            key={i}
            x={pad + i * cellW + 0.5}
            y={36}
            width={cellW - 1}
            height={56}
            rx={2}
            fill={candy[r % candy.length]}
            opacity={i < period ? 0.95 : 0.35}
            stroke={i === at ? colors.text : "none"}
            strokeWidth={i === at ? 1.5 : 0}
          />
        ))}
        {cellW >= 10
          ? residues.map((r, i) => (
              <SvgText
                key={`t${i}`}
                x={pad + (i + 0.5) * cellW}
                y={68}
                fontSize={Math.min(9, cellW * 0.62)}
                fontWeight="700"
                fill={colors.bg}
                textAnchor="middle"
              >
                {String(r)}
              </SvgText>
            ))
          : null}
        {/* period bracket under the first full cycle */}
        <Line x1={pad} y1={104} x2={bracketX1} y2={104} stroke={colors.textDim} strokeWidth={1.2} />
        <Line x1={pad} y1={104} x2={pad} y2={98} stroke={colors.textDim} strokeWidth={1.2} />
        <Line x1={bracketX1} y1={104} x2={bracketX1} y2={98} stroke={colors.textDim} strokeWidth={1.2} />
        <SvgText
          x={pad + (bracketX1 - pad) / 2}
          y={120}
          fontSize={10.5}
          fill={colors.textDim}
          textAnchor="middle"
        >
          {`period π(${m}) = ${period}`}
        </SvgText>
        <SvgText x={pad + (bracketX1 - pad) / 2} y={138} fontSize={11} fill={colors.textDim} textAnchor="middle">
          then the residues repeat forever
        </SvgText>
      </FigSvg>
    </Pressable>
  );
}

function RatioConvergence({ p, colors }: FigProps) {
  const count = clampInt(p.count, 4, 24, 12);
  const ratios = fibRatios(count);
  const H = 180;
  const left = 34;
  const right = W - 12;
  const top = 22;
  const bottom = 150;
  const lo = 0.95;
  const hi = 2.1;
  const y = (v: number) => bottom - ((v - lo) / (hi - lo)) * (bottom - top);
  const slot = (right - left) / count;
  const barW = slot * 0.58;

  return (
    <FigSvg h={H}>
      {[1, 2].map((v) => (
        <React.Fragment key={v}>
          <Line x1={left} y1={y(v)} x2={right} y2={y(v)} stroke={colors.borderSubtle} strokeWidth={1} />
          <SvgText x={left - 5} y={y(v) + 3} fontSize={11} fill={colors.textDim} textAnchor="end">
            {v.toFixed(1)}
          </SvgText>
        </React.Fragment>
      ))}
      {ratios.map((r, i) => (
        <Rect
          key={i}
          x={left + i * slot + (slot - barW) / 2}
          y={y(r)}
          width={barW}
          height={bottom - y(r)}
          rx={2}
          fill={colors.primary}
          opacity={0.85}
        />
      ))}
      <Line
        x1={left}
        y1={y(PHI)}
        x2={right}
        y2={y(PHI)}
        stroke={colors.gold}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <SvgText x={left - 5} y={y(PHI) + 3} fontSize={9.5} fontWeight="700" fill={colors.gold} textAnchor="end">
        φ
      </SvgText>
      <SvgText x={right} y={y(PHI) - 5} fontSize={9.5} fill={colors.gold} textAnchor="end">
        {`φ ≈ ${PHI.toFixed(4)}`}
      </SvgText>
      <SvgText x={left} y={H - 12} fontSize={11} fill={colors.textDim}>
        F(n+1) / F(n)
      </SvgText>
      <SvgText x={right} y={H - 12} fontSize={11} fill={colors.textDim} textAnchor="end">
        {`n = 1 … ${count}`}
      </SvgText>
    </FigSvg>
  );
}

function UlamMini({ p, colors }: FigProps) {
  const coords = React.useMemo(() => ulamSpiralCoords(400), []);
  const highlight = !!p.highlightDiagonal;
  const H = 220;

  const xs = coords.map((c) => c.x);
  const ys = coords.map((c) => c.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const side = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY) + 1;
  const cell = Math.min((W - 24) / side, (H - 24) / side);
  const x0 = (W - side * cell) / 2;
  const y0 = (H - side * cell) / 2;
  const px = (x: number) => x0 + (x - minX + 0.5) * cell;
  const py = (yy: number) => y0 + (yy - minY + 0.5) * cell;

  return (
    <FigSvg h={H}>
      {highlight ? (
        <>
          <Line
            x1={px(minX)}
            y1={py(minY)}
            x2={px(minX + side - 1)}
            y2={py(minY + side - 1)}
            stroke={colors.gold}
            strokeWidth={cell * 1.1}
            opacity={0.22}
          />
          <Line
            x1={px(minX)}
            y1={py(minY + side - 1)}
            x2={px(minX + side - 1)}
            y2={py(minY)}
            stroke={colors.gold}
            strokeWidth={cell * 1.1}
            opacity={0.22}
          />
        </>
      ) : null}
      {coords.map((c) =>
        c.prime ? (
          <Rect
            key={c.n}
            x={px(c.x) - cell * 0.36}
            y={py(c.y) - cell * 0.36}
            width={cell * 0.72}
            height={cell * 0.72}
            rx={1.5}
            fill={colors.candySky}
          />
        ) : (
          <Circle key={c.n} cx={px(c.x)} cy={py(c.y)} r={0.9} fill={colors.textMuted} opacity={0.35} />
        )
      )}
      <SvgText x={12} y={16} fontSize={12} fill={colors.textDim}>
        1 … 400, primes filled
      </SvgText>
    </FigSvg>
  );
}

function CollatzOrbitFig({ p, colors }: FigProps) {
  const def = clampInt(p.start, 1, COLLATZ_MAX_START, 27);
  const [text, setText] = React.useState(String(def));
  const [start, setStart] = React.useState(def);
  const orbit = React.useMemo(() => collatzOrbit(start) ?? [1], [start]);
  const invalid = collatzOrbit(Number(text)) === null;

  const { at, playing, toggle, stop } = useLoopPlayer(orbit.length, 85, (i) => {
    void playNotes([termTapNote(String(orbit[i]))]);
  });
  React.useEffect(() => stop, [orbit, stop]);

  const H = 150;
  const pad = 12;
  const top = 14;
  const bottom = H - 24;
  const logs = orbit.map((v) => Math.log10(v));
  const maxLog = Math.max(...logs, 0.31);
  const px = (i: number) => pad + (i * (W - pad * 2)) / Math.max(orbit.length - 1, 1);
  const py = (lg: number) => bottom - (lg / maxLog) * (bottom - top);
  const steps = orbit.length - 1;
  const max = Math.max(...orbit);

  return (
    <View style={{ gap: spacing.sm }}>
      <FigSvg h={H}>
        <Line x1={pad} y1={bottom} x2={W - pad} y2={bottom} stroke={colors.borderSubtle} strokeWidth={1} />
        <Polyline
          points={logs.map((lg, i) => `${px(i)},${py(lg)}`).join(" ")}
          fill="none"
          stroke={colors.primary}
          strokeWidth={1.6}
        />
        {at >= 0 ? (
          <>
            <Line x1={px(at)} y1={top} x2={px(at)} y2={bottom} stroke={colors.gold} strokeWidth={1} strokeDasharray="3 3" />
            <Circle cx={px(at)} cy={py(logs[at])} r={4} fill={colors.gold} />
          </>
        ) : null}
        <SvgText x={pad} y={H - 8} fontSize={11} fill={colors.textDim}>
          {`${steps} steps to reach 1`}
        </SvgText>
        <SvgText x={W - pad} y={H - 8} fontSize={11} fill={colors.textDim} textAnchor="end">
          {`peak ${max.toLocaleString()}`}
        </SvgText>
      </FigSvg>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <PillButton
          variant="primary"
          icon={playing ? "pause" : "play"}
          iconPosition="only"
          onPress={toggle}
          accessibilityLabel={playing ? "Stop the orbit sound" : "Play the orbit as notes"}
        />
        <TextInput
          value={text}
          onChangeText={(t) => {
            setText(t);
            const n = Number(t);
            if (Number.isInteger(n) && n >= 1 && n <= COLLATZ_MAX_START) setStart(n);
          }}
          keyboardType="number-pad"
          inputMode="numeric"
          accessibilityLabel="Starting number, 1 to 1000000"
          style={{
            minWidth: 96,
            minHeight: 44,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderRadius: radii.md,
            borderColor: invalid ? colors.candyRose : colors.border,
            color: colors.text,
            backgroundColor: colors.surface,
            fontVariant: ["tabular-nums"],
          }}
        />
        <Text style={{ flex: 1, color: invalid ? colors.candyRose : colors.textMuted, ...typography.caption }}>
          {invalid ? "enter 1 to 1 000 000" : "try 27, 97, 871…"}
        </Text>
      </View>
    </View>
  );
}

function sanitizeParts(raw: unknown): number[] {
  const parts = (Array.isArray(raw) ? raw : [5, 3, 3, 1])
    .map((v) => clampInt(v, 1, 12, 0))
    .filter((v) => v > 0)
    .sort((a, b) => b - a)
    .slice(0, 8);
  return parts.length ? parts : [5, 3, 3, 1];
}

function Ferrers({ p, colors }: FigProps) {
  const reduced = useReducedMotion();
  const parts = React.useMemo(() => sanitizeParts(p.parts), [p.parts]);
  const conj = React.useMemo(() => conjugatePartition(parts), [parts]);
  const [flipped, setFlipped] = React.useState(false);
  const prog = React.useRef(new Animated.Value(0)).current;

  const side = Math.max(parts[0], parts.length);
  const cs = Math.min(22, Math.floor(150 / side));
  const gap = 3;
  const span = side * (cs + gap) - gap;

  const toggle = () => {
    const to = flipped ? 0 : 1;
    setFlipped(!flipped);
    if (reduced) {
      prog.setValue(to);
    } else {
      Animated.timing(prog, {
        toValue: to,
        duration: 380,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  const cells: Array<{ r: number; c: number }> = [];
  parts.forEach((len, r) => {
    for (let c = 0; c < len; c++) cells.push({ r, c });
  });

  const label = (q: number[]) => q.join(" + ");

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel={`Ferrers diagram of ${label(parts)}, tap to toggle the conjugate ${label(conj)}`}
      style={{ alignItems: "center", gap: spacing.sm }}
    >
      <View style={{ width: span, height: span }}>
        {cells.map(({ r, c }) => (
          <Animated.View
            key={`${r}-${c}`}
            style={{
              position: "absolute",
              width: cs,
              height: cs,
              borderRadius: 3,
              backgroundColor: r === c ? colors.gold : colors.candySky,
              transform: [
                {
                  translateX: prog.interpolate({
                    inputRange: [0, 1],
                    outputRange: [c * (cs + gap), r * (cs + gap)],
                  }),
                },
                {
                  translateY: prog.interpolate({
                    inputRange: [0, 1],
                    outputRange: [r * (cs + gap), c * (cs + gap)],
                  }),
                },
              ],
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Text
          style={{
            ...typography.caption,
            color: flipped ? colors.textMuted : colors.primary,
            fontWeight: flipped ? "500" : "700",
            fontVariant: ["tabular-nums"],
          }}
        >
          {label(parts)}
        </Text>
        <Text style={{ ...typography.caption, color: colors.textMuted }}>⇄</Text>
        <Text
          style={{
            ...typography.caption,
            color: flipped ? colors.primary : colors.textMuted,
            fontWeight: flipped ? "700" : "500",
            fontVariant: ["tabular-nums"],
          }}
        >
          {label(conj)}
        </Text>
      </View>
      <Text style={{ fontSize: 11, color: colors.textMuted }}>tap to conjugate (rows become columns)</Text>
    </Pressable>
  );
}

type BenfordSetId = "fib" | "pow2" | "random";

const BENFORD_SETS: Record<BenfordSetId, { label: string; freqs: number[] }> = {
  fib: { label: "Fibonacci", freqs: leadingDigitFreqs(fibBig(81).slice(1)) },
  pow2: { label: "Powers of 2", freqs: leadingDigitFreqs(powersOf2(80)) },
  random: { label: "Uniform", freqs: leadingDigitFreqs(seededUniform(300)) },
};

function BenfordBars({ colors }: FigProps) {
  const [set, setSet] = React.useState<BenfordSetId>("fib");
  const freqs = BENFORD_SETS[set].freqs;

  const H = 190;
  const left = 16;
  const right = W - 16;
  const top = 18;
  const bottom = H - 26;
  const peak = Math.max(...freqs, BENFORD_P[0]) * 1.15;
  const slot = (right - left) / 9;
  const barW = slot * 0.56;
  const y = (f: number) => bottom - (f / peak) * (bottom - top);

  return (
    <View style={{ gap: spacing.sm }}>
      <FigSvg h={H}>
        {freqs.map((f, i) => (
          <React.Fragment key={i}>
            <Rect
              x={left + i * slot + (slot - barW) / 2}
              y={y(f)}
              width={barW}
              height={bottom - y(f)}
              rx={2}
              fill={colors.primary}
              opacity={0.85}
            />
            <SvgText
              x={left + (i + 0.5) * slot}
              y={y(f) - 4}
              fontSize={8}
              fill={colors.textDim}
              textAnchor="middle"
            >
              {`${Math.round(f * 100)}%`}
            </SvgText>
            <SvgText
              x={left + (i + 0.5) * slot}
              y={H - 10}
              fontSize={9.5}
              fill={colors.textMuted}
              textAnchor="middle"
            >
              {String(i + 1)}
            </SvgText>
          </React.Fragment>
        ))}
        <Polyline
          points={BENFORD_P.map((f, i) => `${left + (i + 0.5) * slot},${y(f)}`).join(" ")}
          fill="none"
          stroke={colors.gold}
          strokeWidth={1.6}
          strokeDasharray="4 3"
        />
        {BENFORD_P.map((f, i) => (
          <Circle key={i} cx={left + (i + 0.5) * slot} cy={y(f)} r={2.5} fill={colors.gold} />
        ))}
        <SvgText x={right} y={16} fontSize={9.5} fill={colors.gold} textAnchor="end">
          Benford: log₁₀(1 + 1/d)
        </SvgText>
      </FigSvg>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {(Object.keys(BENFORD_SETS) as BenfordSetId[]).map((id) => {
          const selected = set === id;
          return (
            <Pressable
              key={id}
              onPress={() => setSet(id)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={{
                flex: 1,
                minHeight: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: selected ? colors.primaryBorder : colors.border,
                backgroundColor: selected ? colors.primaryDim : colors.surface,
              }}
            >
              <Text
                style={{
                  ...typography.labelSm,
                  color: selected ? colors.primary : colors.textDim,
                }}
              >
                {BENFORD_SETS[id].label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function DyckPathsFig({ colors }: FigProps) {
  const paths = React.useMemo(() => dyckPaths(3), []);
  const [sel, setSel] = React.useState(0);

  const PW = 58;
  const PH = 64;
  const step = 8;
  const rise = 14;

  const pathPoints = (s: string) => {
    let x = 5;
    let y = PH - 12;
    const pts = [`${x},${y}`];
    for (const ch of s) {
      x += step;
      y += ch === "(" ? -rise : rise;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 4 }}>
        {paths.map((s, i) => {
          const selected = i === sel;
          return (
            <Pressable
              key={s}
              onPress={() => setSel(i)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`Dyck path ${i + 1} of ${paths.length}: ${s}`}
              style={{
                flex: 1,
                borderRadius: radii.sm,
                borderWidth: 1,
                borderColor: selected ? colors.primaryBorder : colors.borderSubtle,
                backgroundColor: selected ? colors.primaryDim : "transparent",
              }}
            >
              <View style={{ width: "100%", aspectRatio: PW / PH }}>
                <Svg width="100%" height="100%" viewBox={`0 0 ${PW} ${PH}`}>
                  <Line x1={3} y1={PH - 12} x2={PW - 3} y2={PH - 12} stroke={colors.borderSubtle} strokeWidth={1} />
                  <Polyline
                    points={pathPoints(s)}
                    fill="none"
                    stroke={selected ? colors.primary : colors.textMuted}
                    strokeWidth={selected ? 2.4 : 1.5}
                  />
                </Svg>
              </View>
            </Pressable>
          );
        })}
      </View>
      <Text
        style={{
          alignSelf: "center",
          color: colors.text,
          fontSize: 16,
          fontVariant: ["tabular-nums"],
          letterSpacing: 2,
        }}
      >
        {paths[sel]}
        <Text style={{ color: colors.textMuted, fontSize: 12, letterSpacing: 0 }}>
          {`   path ${sel + 1} of ${paths.length} · C(3) = 5`}
        </Text>
      </Text>
    </View>
  );
}

function sanitizePartials(raw: unknown): number[] {
  const list = (Array.isArray(raw) ? raw : [1, 2, 3, 4])
    .map((v) => clampInt(v, 1, 32, 0))
    .filter((v) => v > 0);
  const unique = [...new Set(list)].sort((a, b) => a - b).slice(0, 8);
  return unique.length ? unique : [1, 2, 3, 4];
}

function HarmonicLadder({ p, colors }: FigProps) {
  const partials = React.useMemo(() => sanitizePartials(p.partials), [p.partials]);
  const lit = new Set(partials);
  const H = 240;
  const top = 16;
  const bottom = H - 30;
  const railL = 128;
  const railR = 212;
  const yAt = (k: number) => bottom - ((k - 1) * (bottom - top)) / 31;
  const F0 = 110;

  const play = () => {
    void playNotes(
      partials.map((k, i) => ({
        frequency: F0 * k,
        duration: 1.5,
        gain: Math.max(0.04, 0.28 / (i + 1)),
        wave: "sine" as const,
      }))
    );
  };

  return (
    <Pressable
      onPress={play}
      accessibilityRole="button"
      accessibilityLabel={`Harmonic ladder with partials ${partials.join(", ")} lit, tap to hear the tone`}
    >
      <FigSvg h={H}>
        <Line x1={railL} y1={top - 4} x2={railL} y2={bottom + 4} stroke={colors.border} strokeWidth={2} />
        <Line x1={railR} y1={top - 4} x2={railR} y2={bottom + 4} stroke={colors.border} strokeWidth={2} />
        {Array.from({ length: 32 }, (_, i) => i + 1).map((k) => (
          <React.Fragment key={k}>
            <Line
              x1={railL}
              y1={yAt(k)}
              x2={railR}
              y2={yAt(k)}
              stroke={lit.has(k) ? colors.gold : colors.borderSubtle}
              strokeWidth={lit.has(k) ? 3 : 1}
            />
            {lit.has(k) ? (
              <SvgText x={railR + 8} y={yAt(k) + 3} fontSize={8.5} fill={colors.gold}>
                {`${k}× · ${Math.round(F0 * k)} Hz`}
              </SvgText>
            ) : null}
            {k === 1 || k % 8 === 0 ? (
              <SvgText x={railL - 8} y={yAt(k) + 3} fontSize={8.5} fill={colors.textMuted} textAnchor="end">
                {String(k)}
              </SvgText>
            ) : null}
          </React.Fragment>
        ))}
        <SvgText x={W / 2} y={H - 8} fontSize={10} fill={colors.interactive} textAnchor="middle">
          tap to hear the lit partials together
        </SvgText>
      </FigSvg>
    </Pressable>
  );
}

function ResidueWheel({ p, colors }: FigProps) {
  const terms = React.useMemo<string[]>(() => {
    if (Array.isArray(p.terms) && p.terms.length) return p.terms.map(String);
    const gen = typeof p.seq === "string" ? getSequence(p.seq)?.generate : undefined;
    return (gen?.(24) ?? fibonacci(24)).map(String);
  }, [p.terms, p.seq]);
  const count = Math.min(terms.length, 24);
  const [idx, setIdx] = React.useState(-1);
  const candy = candySet(colors);

  const H = 236;
  const cx = W / 2;
  const cy = 108;
  const R = 86;
  const cellPos = (cell: number) => {
    const a = (-90 + cell * (360 / 25)) * (Math.PI / 180);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  };

  const landings = terms.slice(0, Math.max(idx + 1, 0)).map((t) => termMod(t, 25));
  const visited = new Set(landings);
  const current = idx >= 0 ? landings[idx] : -1;
  const prev = idx >= 1 ? landings[idx - 1] : -1;

  const advance = () => {
    const next = (idx + 1) % count;
    setIdx(next);
    void playNotes([termTapNote(terms[next])]);
  };

  return (
    <Pressable
      onPress={advance}
      accessibilityRole="button"
      accessibilityLabel={
        idx >= 0
          ? `Term ${idx} is ${terms[idx]}, landed on cell ${current}. Tap for the next term.`
          : "Tap to step through the sequence around the 25-cell wheel"
      }
    >
      <FigSvg h={H}>
        {prev >= 0 && current >= 0 && prev !== current ? (
          <Line
            x1={cellPos(prev).x}
            y1={cellPos(prev).y}
            x2={cellPos(current).x}
            y2={cellPos(current).y}
            stroke={colors.primary}
            strokeWidth={1.5}
            opacity={0.6}
          />
        ) : null}
        {Array.from({ length: 25 }, (_, cell) => {
          const pos = cellPos(cell);
          const isCurrent = cell === current;
          return (
            <React.Fragment key={cell}>
              <Circle
                cx={pos.x}
                cy={pos.y}
                r={isCurrent ? 12 : 10}
                fill={
                  isCurrent
                    ? candy[Math.floor(cell / 5)]
                    : visited.has(cell)
                      ? colors.primaryDim
                      : colors.surface
                }
                stroke={isCurrent ? colors.text : colors.border}
                strokeWidth={isCurrent ? 1.5 : 1}
              />
              <SvgText
                x={pos.x}
                y={pos.y + 3}
                fontSize={8.5}
                fill={isCurrent ? colors.bg : colors.textDim}
                fontWeight={isCurrent ? "700" : "400"}
                textAnchor="middle"
              >
                {String(cell)}
              </SvgText>
            </React.Fragment>
          );
        })}
        <SvgText x={cx} y={cy + 4} fontSize={12} fill={colors.textDim} textAnchor="middle">
          mod 25
        </SvgText>
        <SvgText x={cx} y={H - 10} fontSize={10.5} fill={idx >= 0 ? colors.textDim : colors.interactive} textAnchor="middle">
          {idx >= 0 ? `a(${idx}) = ${terms[idx]}  →  cell ${current}` : "tap to step through the terms"}
        </SvgText>
      </FigSvg>
    </Pressable>
  );
}

function TermPlot({ p, colors }: FigProps) {
  const label = typeof p.label === "string" ? p.label : "";
  const stats = React.useMemo(
    () =>
      normalize(
        (Array.isArray(p.terms) ? p.terms : []).map((t: number) => String(Math.trunc(t)))
      ),
    [p.terms]
  );
  if (!stats.terms.length) return null;

  const H = 180;
  const pad = 14;
  const top = 24;
  const bottom = H - 20;
  const span = stats.maxLog - stats.minLog || 1;
  const px = (i: number) => pad + (i * (W - pad * 2)) / Math.max(stats.logs.length - 1, 1);
  const py = (lg: number) => bottom - ((lg - stats.minLog) / span) * (bottom - top);

  return (
    <FigSvg h={H}>
      {stats.hasNegative ? (
        <Line x1={pad} y1={py(0)} x2={W - pad} y2={py(0)} stroke={colors.borderSubtle} strokeWidth={1} />
      ) : (
        <Line x1={pad} y1={bottom} x2={W - pad} y2={bottom} stroke={colors.borderSubtle} strokeWidth={1} />
      )}
      <Polyline
        points={stats.logs.map((lg, i) => `${px(i)},${py(lg)}`).join(" ")}
        fill="none"
        stroke={colors.primary}
        strokeWidth={1.6}
      />
      {stats.logs.length <= 48
        ? stats.logs.map((lg, i) => (
            <Circle key={i} cx={px(i)} cy={py(lg)} r={2.6} fill={colors.candySky} />
          ))
        : null}
      {label ? (
        <SvgText x={pad} y={15} fontSize={12} fill={colors.textDim}>
          {label}
        </SvgText>
      ) : null}
      <SvgText x={W - pad} y={15} fontSize={11} fill={colors.textDim} textAnchor="end">
        symlog scale
      </SvgText>
    </FigSvg>
  );
}

// ------------------------------------------------------------- dispatcher

const FIGURES: Record<string, React.ComponentType<FigProps>> = {
  "pisano-strip": PisanoStrip,
  "ratio-convergence": RatioConvergence,
  "ulam-mini": UlamMini,
  "collatz-orbit": CollatzOrbitFig,
  ferrers: Ferrers,
  "benford-bars": BenfordBars,
  "dyck-paths": DyckPathsFig,
  "harmonic-ladder": HarmonicLadder,
  "residue-wheel": ResidueWheel,
  "term-plot": TermPlot,
};

export default function WikiFigureView({ figure }: { figure: WikiFigure }) {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const Fig = FIGURES[figure.kind];
  if (!Fig) return null; // unknown kinds render nothing rather than crash old clients

  return (
    <View style={styles.wrap} testID={`wiki-figure-${figure.kind}`}>
      <View style={styles.frame} accessibilityLabel={figure.caption}>
        <Fig p={figure.params ?? {}} colors={colors} />
      </View>
      <BodyText variant="caption">{figure.caption}</BodyText>
    </View>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    wrap: {
      gap: 6,
      marginTop: 4,
      marginBottom: 8,
    },
    frame: {
      width: "100%",
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.bgCard,
      padding: spacing.sm,
      overflow: "hidden",
    },
  });
