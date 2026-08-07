// src/components/SoundSheet.tsx
//
// "What does a sequence sound like": pitch lattice, transport, scale and
// layer controls, terms-as-notes strip. Rendered as a sheet off Visualize so
// it shares that screen's Playback and Music providers untouched.

import React, { useSyncExternalStore } from "react";
import { Modal, View, Platform, Pressable, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, Polyline } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../theme";
import { spacing, radii, typography } from "../theme/tokens";
import { usePlayback, STEP_MS } from "../playback/PlaybackContext";
import { useMusic } from "../audio/MusicContext";
import { playNotes } from "../audio/engine";
import { termTapNote } from "../audio/mapTerm";
import { termMod } from "../sequences/normalize";
import { indexToNoteName } from "../audio/scales";
import { isPrimeTerm } from "../sequences/generators";
import {
  musicSettings,
  musicSettingsVersion,
  setMusicSettings,
  subscribeMusicSettings,
  type ScaleId,
} from "../audio/musicSettings";
import { MUSIC_ELEMENTS } from "../audio/elements";
import type { MusicElementId } from "../audio/types";
import PlainText from "./PlainText";
import { AppIcon, PillButton } from "./ui";

// Lattice geometry (SVG viewBox units; scales to the sheet width).
const LAT_W = 340;
const LAT_H = 140;
const LAT_X0 = 8;
const LAT_X1 = 332;
const LAT_TOP = 18;
const LAT_BOTTOM = 122;
const LATTICE_TERMS = 16;

const SCALE_SHORT: Record<ScaleId, string> = {
  pentatonic: "Pent",
  major: "Maj",
  minor: "Min",
  chromatic: "Chrom",
};

const LAYER_IDS: MusicElementId[] = ["melody", "bass", "pad", "rhythm"];

export default function SoundSheet({
  anum,
  name,
  terms,
  visible,
  onClose,
}: {
  anum: string;
  name: string;
  terms: string[];
  visible: boolean;
  onClose: () => void;
}) {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  useSyncExternalStore(subscribeMusicSettings, musicSettingsVersion, musicSettingsVersion);
  const scaleId = musicSettings().scaleId;

  const { playing, togglePlay, step } = usePlayback();
  const { enabled, toggleEnabled, elements, toggleElement } = useMusic();

  // dot color = octave band: a(n) mod 25 spans 5 bands of 5 degrees
  const candy = [
    colors.candySky,
    colors.candyLime,
    colors.candyRose,
    colors.candyPeach,
    colors.candyButter,
  ];

  const shown = terms.slice(0, LATTICE_TERMS);
  const pts = shown.map((t, i) => {
    const idx = termMod(t, 25);
    return {
      x: LAT_X0 + (i * (LAT_X1 - LAT_X0)) / Math.max(shown.length - 1, 1),
      y: LAT_BOTTOM - (idx / 24) * (LAT_BOTTOM - LAT_TOP),
      color: candy[Math.floor(idx / 5)],
      idx,
    };
  });

  // Playhead sweeps at the playback step rate; step k plays terms[k-1].
  const playIdx = step - 1;
  const playheadX = playIdx >= 0 && playIdx < pts.length ? pts[playIdx].x : null;

  const onPlayPress = () => {
    if (!enabled) toggleEnabled(); // arm sonification with playback
    togglePlay();
    if (Platform.OS !== "web") void Haptics.selectionAsync();
  };

  const tapTerm = (t: string) => {
    void playNotes([termTapNote(t)]);
    if (Platform.OS !== "web") void Haptics.selectionAsync();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close sound controls">
        <Pressable style={styles.sheet} onPress={() => {}} testID="sound-sheet">
          <View style={styles.header}>
            <View style={styles.headerText}>
              <PlainText style={styles.heading}>Sound</PlainText>
              <PlainText style={styles.subheading} numberOfLines={1}>
                {`${anum} · ${name}`}
              </PlainText>
            </View>
            <Pressable onPress={onClose} accessibilityLabel="Close sound controls" testID="sound-sheet-close">
              <AppIcon name="close" size={22} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.lattice}>
            <Svg viewBox={`0 0 ${LAT_W} ${LAT_H}`} width="100%" height={LAT_H}>
              {[LAT_TOP, 44, 70, 96, LAT_BOTTOM].map((y) => (
                <Line key={y} x1={LAT_X0} y1={y} x2={LAT_X1} y2={y} stroke={colors.borderSubtle} strokeWidth={1} />
              ))}
              {playheadX != null && playing ? (
                <Line
                  x1={playheadX}
                  y1={8}
                  x2={playheadX}
                  y2={LAT_H - 8}
                  stroke={colors.primaryBorder}
                  strokeWidth={1.5}
                  strokeDasharray="3 4"
                />
              ) : null}
              <Polyline
                points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke={colors.primary}
                strokeWidth={1.5}
                opacity={0.45}
              />
              {pts.map((p, i) => (
                <Circle key={i} cx={p.x} cy={p.y} r={i === playIdx ? 5.5 : 4} fill={p.color} />
              ))}
            </Svg>
            <View style={styles.latticeCaption}>
              <PlainText style={styles.latticeCaptionText}>low</PlainText>
              <PlainText style={styles.latticeCaptionText}>
                a(n) mod 25 picks the degree · color follows octave
              </PlainText>
              <PlainText style={styles.latticeCaptionText}>high</PlainText>
            </View>
          </View>

          <View style={styles.transportRow}>
            <PillButton
              variant="primary"
              icon={playing ? "pause" : "play"}
              iconPosition="only"
              onPress={onPlayPress}
              testID="sound-play"
              accessibilityLabel={playing ? "Pause" : "Play"}
            />
            <View style={styles.stepChip}>
              <Text style={styles.stepChipText}>{`${(STEP_MS / 1000).toFixed(2)}s / step`}</Text>
            </View>
            <View style={styles.scaleGroup}>
              {(Object.keys(SCALE_SHORT) as ScaleId[]).map((id) => {
                const selected = scaleId === id;
                return (
                  <Pressable
                    key={id}
                    onPress={() => setMusicSettings({ ...musicSettings(), scaleId: id })}
                    style={[styles.scaleBtn, selected && styles.scaleBtnActive]}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    testID={`sound-scale-${id}`}
                  >
                    <Text style={selected ? styles.scaleTextActive : styles.scaleText}>
                      {SCALE_SHORT[id]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.layerRow}>
            {MUSIC_ELEMENTS.filter((el) => LAYER_IDS.includes(el.id)).map((el) => {
              const active = elements.includes(el.id);
              return (
                <Pressable
                  key={el.id}
                  onPress={() => toggleElement(el.id)}
                  style={[styles.layerChip, active && styles.layerChipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  testID={`sound-layer-${el.id}`}
                >
                  <View
                    style={[
                      styles.layerDot,
                      { backgroundColor: active ? colors.primary : colors.border },
                    ]}
                  />
                  <Text style={active ? styles.layerTextActive : styles.layerText}>{el.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.termsCard}>
            <View style={styles.termsHeader}>
              <PlainText style={styles.termsTitle}>TERMS AS NOTES</PlainText>
              <PlainText style={styles.termsHint}>steep runs play denser</PlainText>
            </View>
            <View style={styles.termsWrap}>
              {shown.map((t, i) => {
                const prime = isPrimeTerm(t);
                return (
                  <Pressable
                    key={i}
                    onPress={() => tapTerm(t)}
                    style={({ pressed }) => [styles.termTile, pressed && styles.termTilePressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`a(${i}) is ${t}, note ${indexToNoteName(termMod(t, 25))}, plays its pitch`}
                  >
                    <Text style={prime ? [styles.termValue, styles.termValuePrime] : styles.termValue}>
                      {t}
                    </Text>
                    <Text style={styles.termNote}>{indexToNoteName(termMod(t, 25))}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.bgElevated,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  heading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  subheading: {
    color: colors.textMuted,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
  },
  lattice: {
    borderRadius: radii.xl,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xs,
  },
  latticeCaption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xs,
  },
  latticeCaptionText: {
    color: colors.textMuted,
    fontSize: 10.5,
  },
  transportRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  stepChip: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepChipText: {
    color: colors.textDim,
    fontVariant: ["tabular-nums"],
    ...typography.caption,
  },
  scaleGroup: {
    flexDirection: "row",
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  scaleBtn: {
    minHeight: 40,
    paddingHorizontal: 11,
    justifyContent: "center",
  },
  scaleBtnActive: {
    backgroundColor: colors.primaryDim,
  },
  scaleText: {
    color: colors.textDim,
    ...typography.labelSm,
  },
  scaleTextActive: {
    color: colors.primary,
    ...typography.labelSm,
    fontWeight: "700",
  },
  layerRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: spacing.sm,
  },
  layerChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  layerChipActive: {
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
  },
  layerDot: {
    width: 7,
    height: 7,
    borderRadius: radii.pill,
  },
  layerText: {
    color: colors.textDim,
    ...typography.labelSm,
  },
  layerTextActive: {
    color: colors.primary,
    ...typography.labelSm,
  },
  termsCard: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.bgCard,
    padding: spacing.md,
  },
  termsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  termsTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  termsHint: {
    color: colors.textMuted,
    fontSize: 11,
  },
  termsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: spacing.sm,
  },
  termTile: {
    minWidth: 40,
    paddingHorizontal: 6,
    paddingTop: 5,
    paddingBottom: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    alignItems: "center",
    gap: 1,
  },
  termTilePressed: {
    transform: [{ scale: 0.92 }],
  },
  termValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  termValuePrime: {
    color: colors.candySky,
    textShadowColor: colors.primeGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  termNote: {
    color: colors.primary,
    fontSize: 9.5,
    fontWeight: "600",
  },
});
