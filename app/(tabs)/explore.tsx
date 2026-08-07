// app/(tabs)/explore.tsx

import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Svg, { Polyline } from "react-native-svg";
import { useThemeColors } from "../../src/theme";
import { COLLECTIONS } from "../../src/sequences/collections";
import type { OEISSequence } from "../../src/sequences/types";
import { resolveSequences } from "../../src/sequences/resolveSequence";
import { getSequence } from "../../src/sequences/catalog";
import {
  MATH_FIELDS,
  metadataFor,
  type MathFieldId,
} from "../../src/sequences/metadata";
import { normalize } from "../../src/sequences/normalize";
import ExploreCard, { EXPLORE_CARD_W } from "../../src/components/ExploreCard";
import ResultRow from "../../src/components/ResultRow";
import SequenceName from "../../src/components/SequenceName";
import {
  BodyText,
  CountingLoader,
  LogoTitleRow,
  PillButton,
} from "../../src/components/ui";
import {
  PAGE_PADDING,
  safeAreaTop,
  tabBarScrollPadding,
} from "../../src/theme/layout";
import { radii, spacing } from "../../src/theme/tokens";
import * as oeis from "../../src/oeis/db";

const FIELD_IDS = Object.keys(MATH_FIELDS) as MathFieldId[];
const SPARK_W = 64;
const SPARK_H = 22;

// ponytail: plain symlog polyline instead of VizPreview — dozens of Skia
// canvases at 64x22 is the heavier tool for a one-line sparkline
function Sparkline({ terms, color }: { terms: string[]; color: string }) {
  const pts = React.useMemo(() => {
    const stats = normalize(terms.slice(0, 16));
    const n = stats.logs.length;
    if (n < 2) return "";
    const range = stats.maxLog - stats.minLog || 1;
    return stats.logs
      .map((v, i) => {
        const x = 3 + ((SPARK_W - 6) * i) / (n - 1);
        const y = SPARK_H - 3 - ((SPARK_H - 6) * (v - stats.minLog)) / range;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [terms]);
  if (!pts) return <View style={{ width: SPARK_W, height: SPARK_H }} />;
  return (
    <Svg width={SPARK_W} height={SPARK_H}>
      <Polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function ExploreScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const [sequences, setSequences] = useState<Map<string, OEISSequence> | null>(null);
  const [resolving, setResolving] = useState(true);
  // Atlas: dense list alternative to the shelves (design handoff section 4b)
  const [atlas, setAtlas] = useState(false);
  const [field, setField] = useState<MathFieldId | null>(null);
  // endless feed: random draws from all 397k sequences, appended on scroll
  const [feed, setFeed] = useState<OEISSequence[]>([]);
  const feedBusy = React.useRef(false);

  const loadMoreFeed = React.useCallback(async () => {
    if (feedBusy.current) return;
    feedBusy.current = true;
    try {
      const batch: OEISSequence[] = [];
      for (let i = 0; i < 8; i++) {
        try {
          batch.push(await oeis.random());
        } catch {
          break;
        }
      }
      setFeed((prev) => {
        const seen = new Set(prev.map((s) => s.anum));
        return [...prev, ...batch.filter((s) => !seen.has(s.anum))];
      });
    } finally {
      feedBusy.current = false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const anums = COLLECTIONS.flatMap((c) => c.anums);

    const initialMap = new Map<string, OEISSequence>();
    for (const anum of anums) {
      const cat = getSequence(anum);
      if (cat) initialMap.set(anum, cat);
    }
    setSequences(initialMap);

    oeis.warmDb().catch(() => {});
    resolveSequences(anums)
      .then((map) => {
        if (!cancelled) setSequences(map);
      })
      .catch((err) => {
        console.warn("Explore sequences load failed:", err);
      })
      .finally(() => {
        if (!cancelled) setResolving(false);
        if (!cancelled) void loadMoreFeed();
      });
    return () => {
      cancelled = true;
    };
  }, [loadMoreFeed]);

  // Atlas list: every collection anum once, then the endless feed continues it
  const atlasRows = React.useMemo(() => {
    if (!atlas || !sequences) return [];
    const seen = new Set<string>();
    const out: OEISSequence[] = [];
    for (const anum of COLLECTIONS.flatMap((c) => c.anums)) {
      const s = sequences.get(anum);
      if (s && !seen.has(s.anum)) {
        seen.add(s.anum);
        out.push(s);
      }
    }
    for (const s of feed) {
      if (!seen.has(s.anum)) {
        seen.add(s.anum);
        out.push(s);
      }
    }
    return field
      ? out.filter((s) => metadataFor(s.anum, s.name).fields.includes(field))
      : out;
  }, [atlas, sequences, feed, field]);

  return (
    <View style={styles.container} testID="explore-screen" nativeID="main">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={120}
        onScroll={(e) => {
          const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
          if (contentOffset.y + layoutMeasurement.height > contentSize.height - 900) {
            void loadMoreFeed();
          }
        }}
      >
        <View style={styles.hero}>
          <View style={styles.heroTitle}>
            <LogoTitleRow
              title="Explore"
              subtitle={
                atlas
                  ? "Browse the whole catalog."
                  : "Sequence collections. Swipe through, tap to visualize."
              }
              size="page"
            />
          </View>
          <PillButton
            variant="icon"
            icon={atlas ? "albums-outline" : "list-outline"}
            iconPosition="only"
            onPress={() => setAtlas((a) => !a)}
            accessibilityLabel={atlas ? "Switch to shelves view" : "Switch to Atlas view"}
            testID="explore-view-toggle"
          />
        </View>

        {!sequences ? (
          <View style={styles.loading}>
            <CountingLoader />
          </View>
        ) : atlas ? (
          <View style={styles.section} testID="explore-atlas">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fieldChips}
            >
              {FIELD_IDS.map((id) => {
                const active = field === id;
                return (
                  <Pressable
                    key={id}
                    onPress={() => setField(active ? null : id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Filter by ${MATH_FIELDS[id].label}`}
                    style={[styles.fieldChip, active && styles.fieldChipActive]}
                  >
                    <View
                      style={[styles.fieldDot, { backgroundColor: MATH_FIELDS[id].color }]}
                    />
                    <Text style={styles.fieldChipLabel}>{MATH_FIELDS[id].label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.atlasList}>
              {atlasRows.map((seq) => {
                // ponytail: first field colors dot + sparkline; fallback id
                // only guards sequences resolved without a name
                const fid = metadataFor(seq.anum, seq.name).fields[0] ?? "number-theory";
                const fcolor = MATH_FIELDS[fid].color;
                return (
                  <Pressable
                    key={seq.anum}
                    onPress={() => router.push(`/visualize/${seq.anum}`)}
                    accessibilityRole="button"
                    accessibilityLabel={`Visualize ${seq.name}, ${seq.anum}`}
                    style={({ pressed }) => [
                      styles.atlasRow,
                      pressed && styles.atlasRowPressed,
                    ]}
                  >
                    <View style={[styles.fieldDot, { backgroundColor: fcolor }]} />
                    <Text style={styles.atlasAnum}>{seq.anum}</Text>
                    <SequenceName
                      name={seq.name}
                      style={styles.atlasName}
                      numberOfLines={1}
                    />
                    {seq.terms?.length ? (
                      <Sparkline terms={seq.terms} color={fcolor} />
                    ) : (
                      <View style={styles.sparkGap} />
                    )}
                  </Pressable>
                );
              })}
            </View>
            <BodyText variant="caption" style={styles.atlasFoot}>
              Scrolling past the end draws randomly from all 397,648 sequences.
            </BodyText>
            <CountingLoader label="finding more" />
          </View>
        ) : (
          COLLECTIONS.map((collection) => (
            <View key={collection.title} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{collection.title}</Text>
                <BodyText variant="caption" style={styles.sectionDesc}>
                  {collection.description}
                </BodyText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={EXPLORE_CARD_W + spacing.md}
                contentContainerStyle={styles.carousel}
              >
                {collection.anums.map((anum) => {
                  const seq = sequences.get(anum);
                  if (seq) return <ExploreCard key={anum} sequence={seq} />;
                  // db still resolving: placeholder keeps the slot visible
                  if (!resolving) return null;
                  return (
                    <View key={anum} style={styles.cardPlaceholder} testID="explore-card-loading">
                      <CountingLoader />
                      <Text style={styles.placeholderText}>{anum}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ))
        )}

        {!atlas ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Endless</Text>
              <BodyText variant="caption" style={styles.sectionDesc}>
                Random draws from the whole database. Keep scrolling.
              </BodyText>
            </View>
            <View style={styles.feed} testID="explore-endless">
              {feed.map((seq) => (
                <ResultRow key={seq.anum} sequence={seq} />
              ))}
              <View style={styles.loading}>
                <CountingLoader label="finding more" />
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
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
  hero: {
    paddingTop: safeAreaTop("home"),
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  heroTitle: {
    flex: 1,
    minWidth: 0,
  },
  loading: {
    paddingVertical: spacing.xxl,
    alignItems: "center",
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    paddingHorizontal: PAGE_PADDING,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sectionDesc: {
    color: colors.textDim,
    lineHeight: 18,
    marginBottom: 0,
  },
  carousel: {
    paddingHorizontal: PAGE_PADDING,
    gap: spacing.md,
  },
  feed: {
    paddingHorizontal: PAGE_PADDING,
  },
  cardPlaceholder: {
    width: EXPLORE_CARD_W,
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 13,
    fontVariant: ["tabular-nums"],
  },
  fieldChips: {
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.md,
    gap: 6,
  },
  fieldChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldChipActive: {
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
  },
  fieldChipLabel: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: "600",
  },
  fieldDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  atlasList: {
    paddingHorizontal: PAGE_PADDING,
  },
  atlasRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  atlasRowPressed: {
    backgroundColor: colors.bgElevated,
  },
  atlasAnum: {
    color: colors.interactive,
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    width: 64,
  },
  atlasName: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  atlasFoot: {
    color: colors.textMuted,
    paddingHorizontal: PAGE_PADDING,
    paddingTop: spacing.sm,
    marginBottom: 0,
  },
  sparkGap: {
    width: SPARK_W,
    height: SPARK_H,
  },
});
