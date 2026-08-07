import type { WikiArticle } from "../infoContent";
import { WIKI_IMAGES } from "../wikiImages";

export const article: WikiArticle = {
  id: "catalan",
  title: "Counting without counting",
  summary: "Catalan numbers count brackets, paths, trees, and many surprisingly similar things.",
  icon: "git-branch-outline",
  sections: [
    {
      id: "catalan-rule",
      title: "One answer, many questions",
      body: [
        "The Catalan numbers begin 1, 1, 2, 5, 14, 42, …. The fifth term can count five ways to parenthesize four objects, five mountain walks that never dip below ground, or five ways to split a polygon into triangles.",
        "That is not a coincidence. A bijection is a reversible translation between two kinds of objects. Finding one explains why two different-looking problems share the same answer.",
      ],
      anums: ["A000108", "A000984", "A001006"],
    },
    {
      id: "catalan-see",
      title: "See it",
      body: [
        "Compare Catalan numbers with the central binomial coefficients. On the ratio view, Catalan is exactly the central binomial coefficient divided by n + 1. The shared log-scale view makes their common base-4 growth visible.",
      ],
      image: WIKI_IMAGES.yanghui,
    },
    {
      id: "catalan-real-world",
      title: "In the real world",
      body: [
        "Compilers must recognize correctly nested parentheses, brackets, and blocks. The same tree-shaped structures appear in expression parsers, version-control histories, and ways to split a problem into subproblems.",
      ],
    },
    {
      id: "catalan-open-door",
      title: "An open door",
      body: [
        "Catalan numbers have hundreds of known interpretations, and new ones still appear. A good challenge is to take a counting problem you care about and look for the hidden tree or path that turns it into a Catalan problem.",
      ],
      links: [
        { label: "Catalan numbers, OEIS A000108", url: "https://oeis.org/A000108" },
        { label: "Richard Stanley, Catalan Numbers", url: "https://doi.org/10.1017/CBO9781107420206" },
      ],
    },
  ],
};
