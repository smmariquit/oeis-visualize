// src/components/TermsLine.tsx
//
// Joined term preview line with prime glow. Render inside a Text/BodyText.

import React from "react";
import { Text } from "react-native";
import { isPrimeTerm } from "../sequences/generators";
import { useThemeColors } from "../theme";

export default function TermsLine({ terms, max }: { terms: string[]; max: number }) {
  const colors = useThemeColors();
  const glow = {
    color: colors.candySky,
    textShadowColor: colors.primeGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  } as const;
  return (
    <>
      {terms.slice(0, max).map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ", " : ""}
          <Text style={isPrimeTerm(t) ? glow : undefined}>{t}</Text>
        </React.Fragment>
      ))}
      …
    </>
  );
}
