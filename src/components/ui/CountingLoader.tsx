// src/components/ui/CountingLoader.tsx
//
// Whimsy loader: counts primes instead of spinning. Reduced motion shows the
// static label only.

import React from "react";
import { StyleSheet, View } from "react-native";
import { useReducedMotion } from "react-native-reanimated";
import { useThemeColors } from "../../theme";
import { motion } from "../../theme/motion";
import { spacing } from "../../theme/tokens";
import PlainText from "../PlainText";

const PRIMES = [2, 3, 5, 7, 11, 13];

export default function CountingLoader({ label = "counting primes" }: { label?: string }) {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const reducedMotion = useReducedMotion();
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(
      () => setCount((c) => (c >= PRIMES.length ? 1 : c + 1)),
      motion.tick.duration
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  return (
    <View
      style={styles.wrap}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      testID="counting-loader"
    >
      {!reducedMotion ? (
        <PlainText style={styles.digits}>{PRIMES.slice(0, count).join(", ")}</PlainText>
      ) : null}
      <PlainText style={styles.label}>{label}</PlainText>
    </View>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginVertical: spacing.lg,
    gap: 4,
    // widest tick ("2, 3, 5, 7, 11, 13") sets the height; no reflow while counting
    minHeight: 40,
  },
  digits: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
});
