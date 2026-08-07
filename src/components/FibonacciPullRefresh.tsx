// src/components/FibonacciPullRefresh.tsx
//
// Whimsy item 12: pull-to-refresh that draws the golden spiral quarter-turn
// by quarter-turn as you pull; releasing past the threshold spins it 360° and
// fires the refresh. Rendered on native only when motion is allowed — Home
// keeps the stock RefreshControl under reduced motion and no refresh UI on web.

import React, { useEffect } from "react";
import { StyleSheet, View, type ScrollViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useThemeColors } from "../theme";
import { motion } from "../theme/motion";
import { goldenSpiralPath } from "../visualizations/goldenSpiralPath";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SPIRAL = goldenSpiralPath();
/** pull distance (after damping) that arms the refresh = full spiral. */
const THRESHOLD = 84;
const QUARTER_PULL = THRESHOLD / SPIRAL.quarters;
/** finger travel is damped so the spiral grows deliberately */
const DAMPING = 0.6;
const INDICATOR = 48;
const SPIN_MS = 600;

interface Props extends ScrollViewProps {
  refreshing: boolean;
  onRefresh: () => void;
  /** y of the indicator inside the revealed gap (clears the status bar). */
  topOffset: number;
  children: React.ReactNode;
}

export default function FibonacciPullRefresh({
  refreshing,
  onRefresh,
  topOffset,
  children,
  ...scrollProps
}: Props) {
  const colors = useThemeColors();
  const scrollY = useSharedValue(0);
  const base = useSharedValue(0);
  const pull = useSharedValue(0);
  const spin = useSharedValue(0);

  // gap held open while refreshing: indicator + breathing room
  const holdY = topOffset + INDICATOR + 12;

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  useEffect(() => {
    if (refreshing) return;
    // let the 360° spin finish before folding the gap away
    pull.value = withDelay(SPIN_MS, withTiming(0, motion.glide));
    spin.value = withDelay(
      SPIN_MS + motion.glide.duration,
      withTiming(0, { duration: 1 })
    );
  }, [refreshing, pull, spin]);

  const pan = Gesture.Pan()
    .enabled(!refreshing)
    .onBegin(() => {
      base.value = 0;
    })
    .onUpdate((e) => {
      if (scrollY.value > 0.5) {
        // not at the top yet: keep re-arming so the pull starts from here
        base.value = e.translationY;
        pull.value = 0;
      } else {
        pull.value = Math.max(0, (e.translationY - base.value) * DAMPING);
      }
    })
    .onEnd(() => {
      if (pull.value >= THRESHOLD) {
        spin.value = withTiming(360, {
          duration: SPIN_MS,
          easing: motion.glide.easing,
        });
        pull.value = withTiming(holdY, motion.glide);
        runOnJS(onRefresh)();
      } else {
        pull.value = withTiming(0, motion.glide);
      }
    });
  // ponytail: Simultaneous(pan, Native) is the stock RNGH custom-pull recipe;
  // bounces/overscroll are disabled below so translationY owns the gap
  const composed = Gesture.Simultaneous(pan, Gesture.Native());

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pull.value }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, pull.value / (QUARTER_PULL * 3)),
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  // quarter-turn by quarter-turn: only whole quarters of arc length reveal
  const dashProps = useAnimatedProps(() => {
    const q = Math.min(SPIRAL.quarters, Math.floor(pull.value / QUARTER_PULL));
    return { strokeDashoffset: SPIRAL.totalLength - SPIRAL.cumLengths[q] };
  });

  return (
    <View style={styles.fill}>
      <Animated.View
        pointerEvents="none"
        style={[styles.indicator, { top: topOffset }, indicatorStyle]}
      >
        <Svg width={INDICATOR} height={INDICATOR} viewBox={SPIRAL.viewBox}>
          <AnimatedPath
            d={SPIRAL.d}
            stroke={colors.primary}
            strokeWidth={3.5}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${SPIRAL.totalLength} ${SPIRAL.totalLength}`}
            animatedProps={dashProps}
          />
        </Svg>
      </Animated.View>
      <GestureDetector gesture={composed}>
        <Animated.ScrollView
          {...scrollProps}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          style={[styles.fill, { backgroundColor: colors.bg }, contentStyle]}
        >
          {children}
        </Animated.ScrollView>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});
