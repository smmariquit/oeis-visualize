// src/components/ExploreCard.tsx

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import type { OEISSequence } from "../sequences/types";
import { useThemeColors, hslToHex } from "../theme";
import { radii, spacing } from "../theme/tokens";
import ErrorBoundary from "./ErrorBoundary";
import SequenceName from "./SequenceName";
import VizPreview from "./VizPreview";
import { AnumBadge, BodyText, CardSurface, PressableCard, AppIcon } from "./ui";
import { DIFFICULTY, metadataFor } from "../sequences/metadata";
import TermsLine from "./TermsLine";

// Design handoff: cards lead with the motif at 210x96.
export const EXPLORE_CARD_W = 210;
const PREVIEW_H = 96;

function previewHue(anum: string): string {
  let n = 0;
  for (let i = 0; i < anum.length; i++) n += anum.charCodeAt(i);
  return hslToHex(n % 360, 55, 22);
}

interface Props {
  sequence: OEISSequence;
}

function ExploreCard({ sequence }: Props) {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const difficultyId = metadataFor(sequence.anum, sequence.name).difficulty;
  const difficulty = difficultyId ? DIFFICULTY[difficultyId] : null;

  return (
    <PressableCard
      onPress={() => router.push(`/visualize/${sequence.anum}`)}
      accessibilityLabel={`Visualize ${sequence.name}, ${sequence.anum}`}
      style={styles.outer}
      pressedScale={0.98}
    >
      <CardSurface variant="card" style={styles.card}>
        <View style={styles.previewWrap} importantForAccessibility="no-hide-descendants">
          {sequence.vizType || sequence.terms?.length ? (
            <ErrorBoundary fallbackText="Preview unavailable">
              <VizPreview
                sequence={sequence}
                width={EXPLORE_CARD_W}
                height={PREVIEW_H}
                preview
              />
            </ErrorBoundary>
          ) : (
            <View style={[styles.placeholder, { backgroundColor: previewHue(sequence.anum) }]}>
              <AppIcon name="analytics-outline" size={36} color={colors.textMuted} />
            </View>
          )}
        </View>
        <View style={styles.info}>
          <View style={styles.badgeRow}>
            <AnumBadge anum={sequence.anum} size="sm" />
            {difficulty ? (
              <View
                style={[styles.difficultyDot, { backgroundColor: difficulty.color }]}
                accessibilityLabel={`Difficulty: ${difficulty.label}`}
              />
            ) : null}
          </View>
          <SequenceName name={sequence.name} style={styles.name} numberOfLines={2} />
          {sequence.terms?.length ? (
            <BodyText variant="caption" style={styles.terms} numberOfLines={1}>
              <TermsLine terms={sequence.terms} max={10} />
            </BodyText>
          ) : null}
        </View>
      </CardSurface>
    </PressableCard>
  );
}

export default memo(ExploreCard);

const makeStyles = (colors: any) => StyleSheet.create({
  outer: {
    width: EXPLORE_CARD_W,
  },
  card: {
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  previewWrap: {
    height: PREVIEW_H,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  difficultyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  terms: {
    fontVariant: ["tabular-nums"],
    marginBottom: 0,
  },
});
