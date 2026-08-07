// app/compare/[ids].tsx
//
// N-sequence comparison behind three lens tabs (whimsy redesign, turn 3):
// Growth — shared symlog overlay (any count); Ratio — a(n)/b(n) with a
// dashed gold guide when the preset declares a limit; Phase — a(n) vs b(n).
// Duet playback pans A left / B right; equal terms on a step add a chime.
// URL shape: /compare/A000045-A000108 or /compare/A000045-A000032-A000129

import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as oeis from "../../src/oeis/db";
import type { OEISSequence } from "../../src/sequences/types";
import PairPlot from "../../src/visualizations/PairPlot";
import MultiSeriesPlot, { seriesColor } from "../../src/visualizations/MultiSeriesPlot";
import { useThemeColors } from "../../src/theme";
import { BackButton, CenteredState, AnumBadge, BodyText, PillButton } from "../../src/components/ui";
import { MAX_PAGE_WIDTH, PAGE_PADDING, safeAreaTop } from "../../src/theme/layout";
import { radii, spacing } from "../../src/theme/tokens";
import { playNotes } from "../../src/audio/engine";
import { termTapNote } from "../../src/audio/mapTerm";
import { midiToHz } from "../../src/audio/scales";
import type { NoteSpec } from "../../src/audio/types";
import { COMPARE_PRESETS } from "./index";

type Lens = "growth" | "ratio" | "phase";

const LENSES: { id: Lens; label: string }[] = [
  { id: "growth", label: "Growth" },
  { id: "ratio", label: "Ratio" },
  { id: "phase", label: "Phase" },
];

const STRIP_LEN = 10;
const DUET_STEP_MS = 340;

export default function CompareScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { ids } = useLocalSearchParams<{ ids: string }>();
  const { width: screenW } = useWindowDimensions();
  const plotW = Math.min(screenW, MAX_PAGE_WIDTH) - PAGE_PADDING * 2;

  const anums = useMemo(() => {
    const raw = (ids ?? "").toUpperCase();
    if (!/^A\d{6}(-A\d{6})+$/.test(raw)) return [];
    return [...new Set(raw.split("-"))];
  }, [ids]);

  const [seqs, setSeqs] = useState<OEISSequence[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lens, setLens] = useState<Lens>("growth");
  const [duetStep, setDuetStep] = useState(-1);
  const duetTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (anums.length < 2) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    Promise.all(anums.map((a) => oeis.getById(a)))
      .then((hits) => {
        const found = hits.filter((h): h is OEISSequence => h !== null);
        if (!cancelled && found.length === anums.length) setSeqs(found);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [anums]);

  // stop duet on unmount
  useEffect(
    () => () => {
      if (duetTimer.current) clearInterval(duetTimer.current);
    },
    []
  );

  if (loading) return <CenteredState loading />;
  if (!seqs) return <CenteredState message="Sequences not found" />;

  const [a, b] = seqs;
  const isPair = seqs.length === 2;

  const preset = COMPARE_PRESETS.find((p) => p.anums.join("-") === anums.join("-"));

  const stripA = (a.terms ?? []).slice(0, STRIP_LEN);
  const stripB = (b.terms ?? []).slice(0, STRIP_LEN);
  const sharedValues = new Set(stripA.filter((t) => stripB.includes(t)));

  const stopDuet = () => {
    if (duetTimer.current) clearInterval(duetTimer.current);
    duetTimer.current = null;
    setDuetStep(-1);
  };

  const playDuetStep = (i: number) => {
    const ta = a.terms?.[i];
    const tb = b.terms?.[i];
    const notes: NoteSpec[] = [];
    if (ta !== undefined) notes.push({ ...termTapNote(ta), wave: "sine", pan: -0.65, gain: 0.22, duration: 0.24 });
    if (tb !== undefined) notes.push({ ...termTapNote(tb), wave: "triangle", pan: 0.65, gain: 0.22, duration: 0.24 });
    // both sequences on the same value this step: middle chime at C6
    if (ta !== undefined && ta === tb) {
      notes.push({ frequency: midiToHz(84), duration: 0.12, gain: 0.2, wave: "triangle" });
    }
    void playNotes(notes);
  };

  const toggleDuet = () => {
    if (duetTimer.current) {
      stopDuet();
      return;
    }
    const steps = Math.min(STRIP_LEN, stripA.length, stripB.length);
    if (steps === 0) return;
    let i = 0;
    setDuetStep(0);
    playDuetStep(0);
    duetTimer.current = setInterval(() => {
      i += 1;
      if (i >= steps) {
        stopDuet();
        return;
      }
      setDuetStep(i);
      playDuetStep(i);
    }, DUET_STEP_MS);
  };

  const extras = seqs.slice(2).map((s) => s.anum).join(" and ");
  const lensCaption = !isPair
    ? `Phase and ratio need exactly two sequences. Remove ${extras} to use them.`
    : {
        growth: "On log axes the slope is the growth rate.",
        ratio: `${a.anum}(n) divided by ${b.anum}(n), term by term.`,
        phase: `Each dot pairs ${a.anum}(n) with ${b.anum}(n). Dots along a straight line mean one sequence is a scaled copy of the other.`,
      }[lens];

  const renderStrip = (terms: string[], seriesIdx: number) => (
    <View style={styles.strip}>
      <View style={[styles.seriesDot, { backgroundColor: seriesColor(seriesIdx) }]} />
      {terms.map((t, i) => (
        <View
          key={i}
          style={[styles.termTile, duetStep === i && styles.termTileActive]}
        >
          <Text style={[styles.termText, sharedValues.has(t) && styles.termTextShared]}>{t}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container} nativeID="main" testID="compare-screen">
      <View style={styles.header}>
        <BackButton />
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {seqs.map((s) => s.anum).join(" vs ")}
          </Text>
        </View>
        <PillButton
          variant="primary"
          onPress={toggleDuet}
          testID="compare-duet"
          accessibilityLabel={duetStep >= 0 ? "Stop duet" : "Play duet"}
        >
          {duetStep >= 0 ? "Stop duet" : "Play duet"}
        </PillButton>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.names}>
          {seqs.map((s, i) => (
            <View key={s.anum} style={styles.nameRow}>
              <View style={[styles.seriesDot, { backgroundColor: seriesColor(i) }]} />
              <AnumBadge anum={s.anum} size="sm" />
              <BodyText variant="caption" style={styles.name}>{s.name}</BodyText>
            </View>
          ))}
        </View>

        <View style={[styles.lensRow, { width: plotW }]}>
          {LENSES.map(({ id, label }) => {
            const disabled = id !== "growth" && !isPair;
            const active = lens === id;
            return (
              <Pressable
                key={id}
                onPress={() => setLens(id)}
                disabled={disabled}
                accessibilityRole="tab"
                accessibilityState={{ selected: active, disabled }}
                testID={`compare-lens-${id}`}
                style={[styles.lensBtn, active && styles.lensBtnActive]}
              >
                <Text
                  style={[
                    styles.lensLabel,
                    active && styles.lensLabelActive,
                    disabled && styles.lensLabelDisabled,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[styles.caption, { width: plotW }, !isPair && styles.captionLocked]}>
          {lensCaption}
        </Text>

        {lens === "growth" ? (
          <View
            style={[styles.plotBox, { width: plotW, height: plotW * 0.6 }]}
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Growth of ${seqs.map((s) => s.anum).join(", ")} on a shared log scale`}
          >
            <MultiSeriesPlot
              series={seqs.map((s) => s.terms ?? [])}
              width={plotW}
              height={plotW * 0.6}
            />
          </View>
        ) : lens === "ratio" ? (
          <View
            style={[styles.plotBox, { width: plotW, height: plotW * 0.6 }]}
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Log ratio of ${a.anum} to ${b.anum} over n`}
          >
            <PairPlot
              termsA={a.terms ?? []}
              termsB={b.terms ?? []}
              mode="ratio"
              width={plotW}
              height={plotW * 0.6}
              guideValue={preset?.ratioLimit}
            />
          </View>
        ) : (
          <View
            style={[styles.plotBox, { width: plotW, height: plotW * 0.8 }]}
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Phase plane of ${b.anum} against ${a.anum}`}
          >
            <PairPlot
              termsA={a.terms ?? []}
              termsB={b.terms ?? []}
              mode="phase"
              width={plotW}
              height={plotW * 0.8}
            />
          </View>
        )}

        <View style={[styles.duetCard, { width: plotW }]}>
          <Text style={styles.duetHeading}>Shared terms</Text>
          {renderStrip(stripA, 0)}
          {renderStrip(stripB, 1)}
          <Text style={styles.duetNote}>
            Duet plays A on the left channel and B on the right. A shared value adds a middle chime.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: safeAreaTop("info"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.md,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  scroll: {
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
    alignItems: "flex-start",
  },
  names: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  seriesDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    marginBottom: 0,
  },
  lensRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  lensBtn: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  lensBtnActive: {
    backgroundColor: colors.primaryDim,
  },
  lensLabel: {
    color: colors.textDim,
    fontSize: 13,
    fontWeight: "700",
  },
  lensLabelActive: {
    color: colors.primary,
  },
  lensLabelDisabled: {
    color: colors.textMuted,
    opacity: 0.5,
  },
  caption: {
    color: colors.textDim,
    fontSize: 12,
    lineHeight: 18,
  },
  captionLocked: {
    color: colors.accentAlt,
  },
  plotBox: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: "hidden",
  },
  duetCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.bgCard,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  duetHeading: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  strip: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  termTile: {
    minWidth: 30,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  termTileActive: {
    borderColor: colors.primaryBorder,
  },
  termText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  termTextShared: {
    color: colors.gold,
    textShadowColor: colors.gold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  duetNote: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
});
