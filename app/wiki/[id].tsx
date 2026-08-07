// app/wiki/[id].tsx
//
// One wiki article, book treatment: chapter kicker, Literata body,
// pull quotes, numbered Further Reading, prev/next chapter pills, and
// a scroll-driven progress bar in the header.

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { WIKI_ARTICLES, type WikiArticle } from "../../src/content/infoContent";
import { useThemeColors } from "../../src/theme";
import {
  BackButton,
  CenteredState,
  InfoSectionBlock,
  PillButton,
} from "../../src/components/ui";
import {
  MAX_INFO_WIDTH,
  PAGE_PADDING,
  safeAreaTop,
} from "../../src/theme/layout";
import { fonts, radii, spacing } from "../../src/theme/tokens";

/** Rough reading time at 200 wpm from every text field in the chapter. */
function readingMinutes(article: WikiArticle): number {
  const words = article.sections
    .flatMap((s) => [
      ...(s.body ?? []),
      ...(s.bullets ?? []),
      s.quote?.text ?? "",
      s.image?.caption ?? "",
    ])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function WikiArticleScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const index = WIKI_ARTICLES.findIndex((a) => a.id === id);
  const article = index >= 0 ? WIKI_ARTICLES[index] : undefined;

  // Read progress: (offset + viewport) / content height, as a percent.
  const [pct, setPct] = React.useState(0);
  const dims = React.useRef({ y: 0, viewport: 0, content: 1 });
  const updatePct = React.useCallback(() => {
    const { y, viewport, content } = dims.current;
    const next =
      content <= viewport
        ? 100
        : Math.min(100, Math.max(0, Math.round(((y + viewport) / content) * 100)));
    setPct(next);
  }, []);

  if (!article) return <CenteredState message="Article not found" />;

  const chapter = index + 1;
  const total = WIKI_ARTICLES.length;
  const prev = index > 0 ? WIKI_ARTICLES[index - 1] : undefined;
  const next = index < total - 1 ? WIKI_ARTICLES[index + 1] : undefined;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    dims.current.y = e.nativeEvent.contentOffset.y;
    updatePct();
  };
  const onLayout = (e: LayoutChangeEvent) => {
    dims.current.viewport = e.nativeEvent.layout.height;
    updatePct();
  };
  const onContentSizeChange = (_w: number, h: number) => {
    dims.current.content = h;
    updatePct();
  };

  return (
    <View style={styles.container} testID={`wiki-article-${article.id}`}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <BackButton compact testID="wiki-back" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Learn</Text>
            <Text style={styles.headerMeta}>
              Chapter {chapter} of {total} · {pct}%
            </Text>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={32}
        nativeID="main"
      >
        <Text style={styles.kicker}>
          LEARN · CHAPTER {chapter} · {readingMinutes(article)} MIN
        </Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.dek}>{article.summary}</Text>

        {article.sections.map((section) => (
          <InfoSectionBlock key={section.id} section={section} />
        ))}

        {article.citations?.length ? (
          <View style={styles.furtherReading} testID="wiki-further-reading">
            <Text style={styles.furtherReadingLabel}>FURTHER READING</Text>
            {article.citations.map((citation, i) => (
              <View key={citation} style={styles.citationRow}>
                <Text style={styles.citationNumber}>[{i + 1}]</Text>
                <Text style={styles.citationText}>{citation}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.chapterNav}>
          {prev ? (
            <PillButton
              variant="back"
              flex
              icon="chevron-back"
              label={`Ch ${chapter - 1} · ${prev.title}`}
              onPress={() => router.replace(`/wiki/${prev.id}`)}
              style={styles.chapterPill}
              testID="wiki-prev-chapter"
            />
          ) : null}
          {next ? (
            <PillButton
              variant="primary"
              flex
              icon="chevron-forward"
              iconPosition="right"
              label={`Ch ${chapter + 1} · ${next.title}`}
              onPress={() => router.replace(`/wiki/${next.id}`)}
              style={styles.chapterPill}
              testID="wiki-next-chapter"
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingTop: safeAreaTop("controls"),
    backgroundColor: colors.bg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.sm,
    maxWidth: MAX_INFO_WIDTH,
    width: "100%",
    alignSelf: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.display,
  },
  headerMeta: {
    color: colors.textMuted,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.borderSubtle,
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: spacing.xxl,
    maxWidth: MAX_INFO_WIDTH,
    width: "100%",
    alignSelf: "center",
  },
  kicker: {
    color: colors.interactive,
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontFamily: fonts.display,
    lineHeight: 34,
    marginTop: 6,
  },
  dek: {
    fontFamily: "Literata_400Regular_Italic",
    color: colors.textDim,
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: 6,
  },
  furtherReading: {
    marginTop: spacing.xl + 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.bgCard,
    padding: spacing.lg,
    gap: spacing.sm + 2,
  },
  furtherReadingLabel: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  citationRow: {
    flexDirection: "row",
    gap: spacing.sm + 2,
  },
  citationNumber: {
    color: colors.interactive,
    fontSize: 12,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  citationText: {
    flex: 1,
    fontFamily: "Literata_400Regular",
    color: colors.textDim,
    fontSize: 13.5,
    lineHeight: 20,
  },
  chapterNav: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg + 2,
  },
  chapterPill: {
    borderRadius: radii.pill,
    minHeight: 46,
  },
});
