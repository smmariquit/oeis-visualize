import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "deep-end",
  title: "The deep end",
  summary: "Generating functions, transforms, and the OEIS as a research tool.",
  icon: "telescope-outline",
  sections: [
    {
      id: "deep",
      title: "For the researchers",
      body: [
        "For readers who want the real machinery, the OEIS is a working research instrument, not just a curiosity cabinet.",
        "Generating functions compress a whole sequence into one object: Fibonacci is $x/(1-x-x^2)$, and the Formula section of most entries records such closed forms alongside recurrences and asymptotics like $F(n) \\sim \\varphi^n/\\sqrt{5}$.",
        "Entries are connected by transforms (binomial, Euler, Möbius, and friends), so a sequence you meet in one problem is often a known transform of another; the cross-references map that web. Motzkin, Catalan, and the Riordan numbers form a binomial-transform ladder you can watch in the compare view.",
        "Empirically the OEIS even has structure of its own: plot how often each integer appears across the database and a thin band of under-represented numbers emerges, known as Sloane's gap.",
        "In practice: compute the first 8 or 10 terms of whatever your research produces and search them before proving anything. A hit hands you formulas, references, and fifty years of prior art; a miss is an invitation to submit.",
      ],
      links: [
        { label: "Superseeker (deep search)", url: "https://oeis.org/ol.html" },
        { label: "OEIS transforms", url: "https://oeis.org/transforms.html" },
        { label: "Sloane's gap (paper)", url: "https://arxiv.org/abs/1101.4470" },
      ],
      anums: ["A000045", "A001006", "A005043"],
    },
  ],
};
