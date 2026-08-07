// app/visualize/[id].tsx

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  type LayoutChangeEvent,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getSequence } from "../../src/sequences/catalog";
import * as oeis from "../../src/oeis/db";
import type { OEISSequence } from "../../src/sequences/types";
import Controls from "../../src/components/Controls";
import { PlaybackProvider } from "../../src/playback/PlaybackContext";
import { MusicProvider } from "../../src/audio/MusicContext";
import { useThemeColors } from "../../src/theme";
import VizPreview from "../../src/components/VizPreview";
import VizCaption from "../../src/components/VizCaption";
import VizSwitcher from "../../src/components/VizSwitcher";
import { rankGenericViz, type GenericVizKey } from "../../src/visualizations/generic/select";
import { setActiveAnum } from "../../src/visualizations/vizColorStore";
import SequenceEntryPanel from "../../src/components/SequenceEntryPanel";
import TermsSheet from "../../src/components/TermsSheet";
import SoundSheet from "../../src/components/SoundSheet";
import TermsLine from "../../src/components/TermsLine";
import { spacing } from "../../src/theme/tokens";
import { musicSettings, setMusicSettings } from "../../src/audio/musicSettings";
import {
  exportWallpaper,
  WALLPAPER_W,
  WALLPAPER_H,
} from "../../src/components/exportWallpaper";
import { CenteredState } from "../../src/components/ui";
import { useSequenceTermCount } from "../../src/hooks/useSequenceTermCount";
import { dailyPuzzleByAnum } from "../../src/game/daily";
import ZoomableViz from "../../src/components/ZoomableViz";

export default function VisualizeScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const { id } = useLocalSearchParams<{ id: string }>();
  const catalogSeq = useMemo(
    () => getSequence(id ?? "") ?? dailyPuzzleByAnum(id ?? ""),
    [id]
  );
  const [dbSeq, setDbSeq] = useState<OEISSequence | null>(null);
  const [loading, setLoading] = useState(() => !catalogSeq && !!id);
  const [vizSize, setVizSize] = useState({ width: 0, height: 0 });
  const [entryOpen, setEntryOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const shotRef = React.useRef<View>(null);
  const [vizKey, setVizKey] = useState<GenericVizKey | undefined>();

  useEffect(() => setVizKey(undefined), [id]);
  // per-sequence color overrides key off the active sequence
  useEffect(() => {
    setActiveAnum(id ?? null);
    return () => setActiveAnum(null);
  }, [id]);

  const seq = catalogSeq ?? dbSeq;
  const golden = seq?.anum === "A000045";

  // L14 golden A000045: while viewing Fibonacci the sonification root lifts a
  // fifth (+7 semitones), a golden chime over the same scale.
  // ponytail: mechanism is the global musicSettings store — shift on mount,
  // restore on unmount; an app killed mid-view keeps the shift until Settings
  // is next touched. Add a transient overlay in musicSettings if that bites.
  useEffect(() => {
    if (!golden) return;
    const prev = musicSettings().rootShift;
    setMusicSettings({ ...musicSettings(), rootShift: (prev + 7) % 12 });
    return () => setMusicSettings({ ...musicSettings(), rootShift: prev });
  }, [golden]);

  const {
    termCount,
    displaySequence,
    loadMore,
    loadingMore,
    canLoadMore,
  } = useSequenceTermCount(seq, setDbSeq);

  const onVizLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setVizSize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );
  }, []);

  useEffect(() => {
    if (catalogSeq) {
      setDbSeq(null);
      setLoading(false);
      return;
    }
    if (!id) {
      setDbSeq(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setDbSeq(null);

    oeis
      .getById(id)
      .then((hit) => {
        if (cancelled) return;
        setDbSeq(hit);
      })
      .catch((err) => {
        console.warn("Failed to load sequence", id, err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, catalogSeq]);

  const vizChoices = useMemo(
    () =>
      !seq?.vizType && displaySequence?.terms?.length
        ? rankGenericViz(displaySequence.terms)
        : [],
    [seq?.vizType, displaySequence?.terms]
  );

  if (loading) {
    return <CenteredState loading />;
  }

  if (!seq || !displaySequence) {
    return <CenteredState message="Sequence not found" />;
  }

  return (
    <PlaybackProvider>
      <MusicProvider sequence={displaySequence}>
        <View style={styles.container} testID="visualize-screen" nativeID="main">
          <Controls
            title={seq.name}
            oeis={seq.anum}
            onEntryPress={() => setEntryOpen(true)}
            onTermsPress={() => setTermsOpen(true)}
            onExportPress={() => exportWallpaper(shotRef, setExporting)}
            onSoundPress={() => setSoundOpen(true)}
            termCount={termCount}
            canLoadMore={canLoadMore}
            loadingMore={loadingMore}
            onLoadMore={loadMore}
          />
          <View
            style={styles.vizArea}
            onLayout={onVizLayout}
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Animated visualization of ${seq.name}`}
          >
            {vizSize.width > 0 && vizSize.height > 0 && (
              <>
                <ZoomableViz
                  key={`${id ?? ""}:${vizKey ?? "auto"}`}
                  width={vizSize.width}
                  height={vizSize.height}
                >
                  <VizPreview
                    sequence={displaySequence}
                    width={vizSize.width}
                    height={vizSize.height}
                    preview={false}
                    count={seq.vizType ? termCount : undefined}
                    genericVizKey={vizKey}
                  />
                </ZoomableViz>
                <VizSwitcher choices={vizChoices} active={vizKey} onSelect={setVizKey} />
                {golden ? (
                  <View pointerEvents="none" style={styles.goldTint} />
                ) : null}
                <VizCaption
                  sequence={displaySequence}
                  termCount={termCount}
                  genericVizKey={vizKey}
                />
              </>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.termStrip}
            contentContainerStyle={styles.termStripContent}
            testID="visualize-term-strip"
          >
            <Text style={styles.termStripText} numberOfLines={1}>
              <TermsLine terms={displaySequence.terms ?? []} max={16} />
            </Text>
          </ScrollView>
          <SequenceEntryPanel
            anum={seq.anum}
            visible={entryOpen}
            onClose={() => setEntryOpen(false)}
          />
          <TermsSheet
            anum={seq.anum}
            terms={displaySequence.terms ?? []}
            visible={termsOpen}
            onClose={() => setTermsOpen(false)}
          />
          <SoundSheet
            anum={seq.anum}
            name={seq.name}
            terms={displaySequence.terms ?? []}
            visible={soundOpen}
            onClose={() => setSoundOpen(false)}
          />
          {exporting ? (
            <View
              ref={shotRef}
              collapsable={false}
              style={[styles.exportSurface, { backgroundColor: colors.bg }]}
              pointerEvents="none"
            >
              <VizPreview
                sequence={displaySequence}
                width={WALLPAPER_W}
                height={WALLPAPER_H}
                preview={false}
                count={seq.vizType ? termCount : undefined}
                genericVizKey={vizKey}
              />
            </View>
          ) : null}
        </View>
      </MusicProvider>
    </PlaybackProvider>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  vizArea: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    position: "relative",
  },
  // golden A000045: gild the canvas with a whisper of gold
  goldTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.gold,
    opacity: 0.06,
  },
  termStrip: {
    flexGrow: 0,
    backgroundColor: colors.bgElevated,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  termStripContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  termStripText: {
    color: colors.textDim,
    fontSize: 14,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  exportSurface: {
    position: "absolute",
    left: -10000,
    top: 0,
    width: WALLPAPER_W,
    height: WALLPAPER_H,
  },
});
