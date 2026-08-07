import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "simple-mysteries",
  title: "Simple rules, deep mysteries",
  summary: "Three rules you can run by hand, with questions nobody has settled.",
  icon: "help-circle-outline",
  sections: [
    {
      id: "mystery-rules",
      title: "Rules small enough to play",
      body: [
        "Recamán tries to step backward by n, but steps forward whenever that would go below zero or revisit a number. Kolakoski writes down the lengths of its own runs. Collatz halves an even number and triples an odd one before adding one.",
        "Each rule is easy to state. The sequences they create are hard because every new term remembers, directly or indirectly, the whole path before it.",
      ],
      anums: ["A005132", "A000002", "A006577"],
    },
    {
      id: "mystery-see-hear",
      title: "See it and hear it",
      body: [
        "Recamán's arc view turns jumps into a map. Its sound is especially revealing because the rule repeatedly changes direction. Kolakoski is best tried with the mod grid or the rhythm instrument: its only values are 1 and 2, but their runs keep reorganizing themselves.",
      ],
    },
    {
      id: "mystery-real-world",
      title: "In the real world",
      body: [
        "Run-length descriptions are practical data-compression ideas. These sequences are not compression formats, but they teach the same lesson: local rules can encode long, structured behavior without storing a long script.",
      ],
    },
    {
      id: "mystery-open-door",
      title: "An open door",
      body: [
        "Nobody knows whether Recamán eventually visits every nonnegative integer. Nobody has proved that Kolakoski has equally many 1s and 2s in the long run. And the Collatz conjecture asks whether every positive start eventually reaches 1.",
      ],
      links: [
        { label: "Recamán's sequence, OEIS A005132", url: "https://oeis.org/A005132" },
        { label: "Kolakoski sequence, OEIS A000002", url: "https://oeis.org/A000002" },
        { label: "Tao, Almost all orbits of the Collatz map", url: "https://arxiv.org/abs/1909.03562" },
      ],
    },
  ],
};
