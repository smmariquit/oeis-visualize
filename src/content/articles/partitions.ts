import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "partitions",
  title: "Making sums",
  summary: "How many ways can a number be broken into parts, and why the answer grows so fast?",
  icon: "layers-outline",
  sections: [
    {
      id: "partition-rule",
      title: "Seven ways to make five",
      body: [
        "A partition of a number is a sum where order does not matter. There are seven partitions of 5: 5; 4 + 1; 3 + 2; 3 + 1 + 1; 2 + 2 + 1; 2 + 1 + 1 + 1; and five 1s.",
        "The partition numbers begin 1, 1, 2, 3, 5, 7, 11, 15, …. Small inputs give modest answers, then the count rises much faster than any polynomial.",
      ],
      anums: ["A000041", "A000009", "A000110"],
    },
    {
      id: "partition-see",
      title: "See it",
      body: [
        "Overlay ordinary partitions, partitions into distinct parts, and Bell numbers. A shared log scale turns three kinds of counting question into three visibly different growth stories.",
      ],
    },
    {
      id: "partition-real-world",
      title: "In the real world",
      body: [
        "Partitions count ways to distribute a total. That is why their generating functions appear in statistical mechanics, where a fixed amount of energy can be split among many possible states.",
      ],
    },
    {
      id: "partition-open-door",
      title: "An open door",
      body: [
        "Ramanujan found startling divisibility patterns in partition numbers, such as p(5k + 4) always being divisible by 5. Researchers still look for new congruences and explanations of how these arithmetic patterns fit together.",
      ],
      links: [
        { label: "Partition numbers, OEIS A000041", url: "https://oeis.org/A000041" },
        { label: "Ramanujan's partition congruences", url: "https://doi.org/10.1017/S0305004100010095" },
      ],
    },
  ],
};
