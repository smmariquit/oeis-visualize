import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getSequence } from "../../src/sequences/catalog";
import Controls from "../../src/components/Controls";
import { colors } from "../../src/theme";
import {
  RecamanArcs,
  FibonacciSpiral,
  UlamSpiral,
  CollatzTree,
  PascalFractal,
  DigitFlow,
} from "../../src/visualizations";

const { width: W, height: H } = Dimensions.get("window");

function FullViz({ vizType }: { vizType: string }) {
  switch (vizType) {
    case "recaman-arcs":
      return <RecamanArcs width={W} height={H} count={80} />;
    case "fibonacci-spiral":
      return <FibonacciSpiral width={W} height={H} count={500} />;
    case "ulam-spiral":
      return <UlamSpiral width={W} height={H} count={3000} />;
    case "collatz-tree":
      return <CollatzTree width={W} height={H} count={60} />;
    case "pascal-fractal":
      return <PascalFractal width={W} height={H} count={160} />;
    case "digit-flow":
      return <DigitFlow width={W} height={H} count={500} />;
    default:
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unknown visualization</Text>
        </View>
      );
  }
}

export default function VisualizeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const seq = useMemo(() => getSequence(id ?? ""), [id]);

  if (!seq) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Sequence not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FullViz vizType={seq.vizType} />
      <Controls title={seq.name} oeis={seq.oeis} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
  errorText: {
    color: colors.textDim,
    fontSize: 16,
  },
});
