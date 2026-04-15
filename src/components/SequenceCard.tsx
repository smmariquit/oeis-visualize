import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import type { OEISSequence } from "../sequences/types";
import { colors } from "../theme";
import {
  RecamanArcs,
  FibonacciSpiral,
  UlamSpiral,
  CollatzTree,
  PascalFractal,
  DigitFlow,
} from "../visualizations";

const SCREEN_W = Dimensions.get("window").width;
const CARD_W = SCREEN_W - 32;
const PREVIEW_H = 180;

function VizPreview({ vizType, width, height }: { vizType: string; width: number; height: number }) {
  switch (vizType) {
    case "recaman-arcs":
      return <RecamanArcs width={width} height={height} preview />;
    case "fibonacci-spiral":
      return <FibonacciSpiral width={width} height={height} preview />;
    case "ulam-spiral":
      return <UlamSpiral width={width} height={height} preview />;
    case "collatz-tree":
      return <CollatzTree width={width} height={height} preview />;
    case "pascal-fractal":
      return <PascalFractal width={width} height={height} preview />;
    case "digit-flow":
      return <DigitFlow width={width} height={height} preview />;
    default:
      return null;
  }
}

interface Props {
  sequence: OEISSequence;
  index: number;
}

export default function SequenceCard({ sequence, index }: Props) {
  const handlePress = useCallback(() => {
    router.push(`/visualize/${sequence.id}`);
  }, [sequence.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.previewContainer}>
        <VizPreview vizType={sequence.vizType} width={CARD_W} height={PREVIEW_H} />
        <View style={styles.previewOverlay} />
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{sequence.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{sequence.oeis}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {sequence.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  previewContainer: {
    width: CARD_W,
    height: PREVIEW_H,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  info: {
    padding: 16,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  badge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  description: {
    color: colors.textDim,
    fontSize: 13,
    lineHeight: 19,
  },
});
