// src/components/SquareConfetti.tsx
//
// Square-streak celebration: 26 small squares labeled with perfect squares
// rain down in candy colors, rotating slightly, then the parent unmounts the
// overlay. Reduced motion never mounts this; the streak note carries the news.

import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import PlainText from "./PlainText";
import { useThemeColors } from "../theme";

const LABELS = ["1", "4", "9", "16", "25", "36", "49"];
const COUNT = 26;

interface Piece {
  left: number; // percent across the screen
  size: number;
  label: string;
  color: string;
  delay: number;
  duration: number; // 2.0s to 3.5s falls
  spin: number; // total degrees over the fall
}

function FallingSquare({
  piece,
  fallHeight,
  labelColor,
}: {
  piece: Piece;
  fallHeight: number;
  labelColor: string;
}) {
  const t = useSharedValue(0);
  React.useEffect(() => {
    t.value = withDelay(
      piece.delay,
      withTiming(1, { duration: piece.duration, easing: Easing.in(Easing.quad) })
    );
  }, [piece.delay, piece.duration, t]);
  const fall = useAnimatedStyle(() => ({
    transform: [
      { translateY: -48 + t.value * (fallHeight + 96) },
      { rotate: `${t.value * piece.spin}deg` },
    ],
  }));
  return (
    <Animated.View
      style={[
        styles.piece,
        {
          left: `${piece.left}%`,
          width: piece.size,
          height: piece.size,
          backgroundColor: piece.color,
        },
        fall,
      ]}
    >
      <PlainText
        style={{ fontSize: Math.round(piece.size * 0.45), fontWeight: "700", color: labelColor }}
      >
        {piece.label}
      </PlainText>
    </Animated.View>
  );
}

export default function SquareConfetti() {
  const { height } = useWindowDimensions();
  const colors = useThemeColors();
  const pieces = React.useMemo<Piece[]>(() => {
    const candy = [
      colors.candySky,
      colors.candyLime,
      colors.candyRose,
      colors.candyPeach,
      colors.candyButter,
    ];
    return Array.from({ length: COUNT }, (_, i) => ({
      left: 2 + Math.random() * 92,
      size: 16 + Math.random() * 10,
      label: LABELS[i % LABELS.length],
      color: candy[i % candy.length],
      delay: Math.random() * 500,
      duration: 2000 + Math.random() * 1500,
      spin: (Math.random() - 0.5) * 160,
    }));
    // ponytail: pieces are randomized once on mount by design; theme mid-fall keeps old colors
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View pointerEvents="none" style={styles.overlay} testID="square-confetti">
      {pieces.map((piece, i) => (
        <FallingSquare key={i} piece={piece} fallHeight={height} labelColor={colors.bg} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    zIndex: 10,
  },
  piece: {
    position: "absolute",
    top: 0,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
