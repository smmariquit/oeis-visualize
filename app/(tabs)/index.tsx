// app/(tabs)/index.tsx

import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../src/theme";
import { sequences } from "../../src/sequences/catalog";
import type { OEISSequence } from "../../src/sequences/types";
import SequenceCard from "../../src/components/SequenceCard";
import ResultRow from "../../src/components/ResultRow";
import AmbientButton, { AmbientVolumeRow } from "../../src/components/AmbientButton";
import {
  AppFooter,
  BodyText,
  CountingLoader,
  LogoTitleRow,
  PillButton,
  SearchField,
  SectionHeading,
} from "../../src/components/ui";
import { APP_TAGLINE } from "../../src/constants/brand";
import {
  MAX_PAGE_WIDTH,
  PAGE_PADDING,
  safeAreaTop,
  tabBarScrollPadding,
} from "../../src/theme/layout";
import { radii, spacing } from "../../src/theme/tokens";
import * as oeis from "../../src/oeis/db";
import PlainText from "../../src/components/PlainText";
import FibonacciPullRefresh from "../../src/components/FibonacciPullRefresh";
import { Pressable } from "react-native";
import {
  MATH_FIELDS,
  metadataFor,
  type MathFieldId,
} from "../../src/sequences/metadata";

// Header count-up: ticks 0 → target over 1.4s (easeOut cubic) on first mount.
// Reduced motion: the final number immediately.
function useCountUp(target: number | null): number {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const sv = useSharedValue(0);

  useEffect(() => {
    if (target == null) return;
    if (reducedMotion) {
      sv.value = target;
      return;
    }
    sv.value = withTiming(target, {
      duration: 1400,
      easing: Easing.out(Easing.cubic),
    });
  }, [target, reducedMotion, sv]);

  useAnimatedReaction(
    () => Math.round(sv.value),
    (v, prev) => {
      if (v !== prev) runOnJS(setDisplay)(v);
    }
  );

  return display;
}

export default function HomeScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const { width: screenW } = useWindowDimensions();
  const pageW = Math.min(screenW, MAX_PAGE_WIDTH);
  const twoCol = Platform.OS === "web" && pageW >= 760;
  const gridGap = spacing.lg;
  const cardW = twoCol ? (pageW - PAGE_PADDING * 2 - gridGap) / 2 : pageW - PAGE_PADDING * 2;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OEISSequence[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [sotd, setSotd] = useState<OEISSequence | null>(null);
  const [seqCount, setSeqCount] = useState<number | null>(null);
  // featured previews show the Recamán skeleton until the db is warm
  const [dbReady, setDbReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const reducedMotion = useReducedMotion();
  const displayCount = useCountUp(seqCount);

  useEffect(() => {
    oeis.sequenceCount().then(setSeqCount).catch(() => {});
  }, []);
  // field filter: tags come from the sequence NAME (see fieldsFromName), which
  // covers every sequence in the db. Difficulty is NOT a filter here: it can
  // only be honestly assigned to the ~26 curated sequences, so a difficulty
  // filter would hide almost every search result.
  const [fieldFilter, setFieldFilter] = useState<MathFieldId | null>(null);

  const filteredResults = React.useMemo(() => {
    if (!results) return null;
    if (!fieldFilter) return results;
    return results.filter((seq) =>
      metadataFor(seq.anum, seq.name).fields.includes(fieldFilter)
    );
  }, [results, fieldFilter]);

  useEffect(() => {
    oeis
      .warmDb()
      .catch(() => {})
      .finally(() => setDbReady(true));
    oeis.sequenceOfTheDay().then(setSotd).catch(() => {});
  }, []);

  // Whimsy item 12: the pull refetches the daily pick and count. Both are
  // deterministic per day/binary, so this is the honest no-op refresh.
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [pick, n] = await Promise.all([
        oeis.sequenceOfTheDay(),
        oeis.sequenceCount(),
      ]);
      setSotd(pick);
      setSeqCount(n);
    } catch {}
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    let cancelled = false;
    const t = setTimeout(() => {
      oeis
        .search(q)
        .then((r) => {
          if (cancelled) return;
          setResults(r);
          setSearching(false);
        })
        .catch((err) => {
          console.error("search failed", err);
          if (!cancelled) setSearching(false);
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const goRandom = async () => {
    try {
      const seq = await oeis.random();
      router.push(`/visualize/${seq.anum}`);
    } catch {}
  };

  const scrollProps = {
    contentContainerStyle: styles.scroll,
    showsVerticalScrollIndicator: false,
    keyboardShouldPersistTaps: "handled" as const,
    removeClippedSubviews: Platform.OS !== "web",
  };

  const body = (
    <>
        <View style={styles.heroSection}>
          <LogoTitleRow
            title="Sequence Trip"
            subtitle={
              seqCount
                ? `Visualizations of all ${displayCount.toLocaleString()} OEIS integer sequences`
                : APP_TAGLINE
            }
            size="hero"
            titleTestID="home-title"
          />
        </View>

        <View style={styles.searchWrap}>
          <SearchField
            testID="search-input"
            value={query}
            onChangeText={setQuery}
            placeholder='Try "fibonacci", A005132, or 1,1,2,3,5'
          />
        </View>

        {results !== null && filteredResults !== null ? (
          <View style={styles.results}>
            <View style={styles.filterRow} testID="search-filters">
              {(Object.keys(MATH_FIELDS) as MathFieldId[]).map((f) => (
                <Pressable
                  key={f}
                  onPress={() => setFieldFilter(fieldFilter === f ? null : f)}
                  style={[styles.filterChip, fieldFilter === f && styles.filterChipOn]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: fieldFilter === f }}
                  testID={`filter-field-${f}`}
                >
                  <PlainText style={fieldFilter === f ? styles.filterTextOn : styles.filterText}>
                    {MATH_FIELDS[f].label}
                  </PlainText>
                </Pressable>
              ))}
            </View>
            {searching && <CountingLoader />}
            {!searching && filteredResults.length === 0 && (
              results.length === 0 ? (
                <>
                  <BodyText variant="empty" style={styles.emptyTitle}>
                    This sequence has not been imagined yet.
                  </BodyText>
                  <BodyText variant="muted">
                    Try a name, an A-number, or the first few terms.
                  </BodyText>
                </>
              ) : (
                <BodyText variant="empty">No results in that field</BodyText>
              )
            )}
            {filteredResults.map((seq, i) => (
              <ResultRow key={seq.anum} sequence={seq} index={i} />
            ))}
          </View>
        ) : (
          <>
            <View style={styles.actionsRow}>
              <PillButton variant="action" icon="shuffle" onPress={goRandom}>
                Random
              </PillButton>
              <PillButton
                variant="action"
                icon="git-compare-outline"
                onPress={() => router.push("/compare")}
                testID="home-compare"
              >
                Compare
              </PillButton>
              {sotd && (
                <PillButton
                  variant="primary"
                  icon="today-outline"
                  onPress={() => router.push(`/visualize/${sotd.anum}`)}
                  // no `flex`: flex-basis 0 lets it squeeze into vertical
                  // text instead of wrapping; grow only after wrapping
                  style={styles.todayBtn}
                >
                  {`Today: ${sotd.anum}`}
                </PillButton>
              )}
              <AmbientButton />
            </View>
            <View style={styles.volumeWrap}>
              <AmbientVolumeRow />
            </View>

            <SectionHeading>Featured</SectionHeading>
            <View style={[styles.featuredGrid, twoCol && { gap: gridGap }]}>
              {sequences.map((seq, i) => {
                // Hallmark: break equal-card grid — first featured is full bleed on web.
                const width =
                  twoCol && i === 0
                    ? pageW - PAGE_PADDING * 2
                    : cardW;
                return (
                  <SequenceCard
                    key={seq.anum}
                    sequence={seq}
                    index={i}
                    cardWidth={width}
                    loading={!dbReady}
                  />
                );
              })}
            </View>
          </>
        )}

        <AppFooter />
    </>
  );

  // Whimsy item 12: golden-spiral pull-to-refresh on native. Reduced motion
  // keeps the stock RefreshControl; web keeps a plain scroll (no pull there).
  const fibPull = Platform.OS !== "web" && !reducedMotion;

  return (
    <View style={styles.container} nativeID="main">
      {fibPull ? (
        <FibonacciPullRefresh
          {...scrollProps}
          refreshing={refreshing}
          onRefresh={onRefresh}
          topOffset={safeAreaTop("home") - 24}
        >
          {body}
        </FibonacciPullRefresh>
      ) : (
        <ScrollView
          {...scrollProps}
          refreshControl={
            Platform.OS !== "web" ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            ) : undefined
          }
        >
          {body}
        </ScrollView>
      )}
    </View>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingBottom: tabBarScrollPadding(),
  },
  heroSection: {
    paddingTop: safeAreaTop("home"),
    paddingBottom: spacing.lg,
    paddingHorizontal: PAGE_PADDING,
  },
  searchWrap: {
    paddingHorizontal: PAGE_PADDING,
    marginBottom: spacing.md,
  },
  results: {
    paddingHorizontal: PAGE_PADDING,
  },
  emptyTitle: {
    marginBottom: 0,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipOn: {
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextOn: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    // four actions no longer fit one row on phones; Today wraps to its own
    // line instead of squeezing into vertical text
    flexWrap: "wrap",
    paddingHorizontal: PAGE_PADDING,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  todayBtn: {
    flexGrow: 1,
  },
  volumeWrap: {
    paddingHorizontal: PAGE_PADDING,
    marginBottom: spacing.sm,
  },
  featuredGrid: {
    paddingHorizontal: PAGE_PADDING,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
