import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "seeing",
  title: "Ways to see a sequence",
  summary: "What each visualization reveals, and when to compare instead.",
  icon: "eye-outline",
  sections: [
    {
      id: "viz",
      title: "Visualization types",
      body: [
        "Some sequences have dedicated views (Recamán arcs, Fibonacci spiral, Ulam spiral, Collatz tree, Pascal fractal, digit flow).",
        "Everything else gets a generic viz chosen from the term shape: line plot, polar spiral, turtle walk, signed bar waveform, or mod-2 grid. The chips on the top right of a visualization switch between them; the help chip explains what the active one encodes.",
      ],
    },
    {
      id: "comparing",
      title: "Comparing sequences",
      body: [
        "Growth alone hides relationships that a comparison exposes. The Compare button on the home screen overlays up to four sequences on a shared log scale; with exactly two you also get a phase plane (one plotted against the other) and a term-by-term ratio.",
        "A straight ratio line means one sequence is an exact multiple or shift of the other. Parallel log-scale lines mean the same exponential base. Complementary pairs, two lists that together hit every whole number exactly once, hug the diagonal in the phase plane.",
        "The \"Classic matchups\" presets on the compare screen are curated examples of each of these behaviors.",
      ],
    },
    {
      id: "glossary",
      title: "Tags & difficulty",
      body: [
        "Sequences carry small tags so you can tell at a glance what area of math they touch and how approachable they are.",
        "Difficulty measures how easy the rule is to understand, not how hard the open problems are.",
      ],
      bullets: [
        "Beginner: you can follow this with basic counting.",
        "Intermediate: some math vocabulary helps, but the viz carries you.",
        "Advanced: easy to state, deeply subtle to grasp.",
        "Number theory: primes, divisors, and the hidden structure of whole numbers.",
        "Combinatorics: counting arrangements. How many ways can things combine?",
        "Geometry: shapes, spirals, and where numbers land in space.",
        "Analysis: constants like π and e, limits, and digit expansions.",
        "Algebra: polynomials, coefficients, and symbolic structure.",
        "Probability: randomness, expected values, and statistical patterns.",
        "Recreational: puzzles and playful rules, math for the fun of it.",
        "Fractals: self-similar patterns that repeat at every scale.",
      ],
    },
  ],
};
