import type { WikiArticle } from "../infoContent";
import { WIKI_IMAGES } from "../wikiImages";

export const article: WikiArticle = {
  id: "fibonacci",
  title: "The Fibonacci numbers",
  summary: "From a rabbit puzzle to sunflower heads.",
  icon: "leaf-outline",
  sections: [
    {
      id: "fibonacci-rule",
      body: [
        "In 1202, Leonardo of Pisa closed a puzzle about breeding rabbits in his Liber Abaci with a rule of disarming simplicity: each month's count is the sum of the two before it [1]. Written as a recurrence, a(n) = a(n−1) + a(n−2), it is the first sequence most of us ever meet.",
      ],
      anums: ["A000045"],
    },
    {
      id: "fibonacci-golden",
      body: [
        "Divide any term by the one before it and the ratios settle toward the golden ratio, φ = (1 + √5) / 2 ≈ 1.618. Binet's closed form writes every term directly in powers of φ [2], which is why the sequence and the ratio keep turning up in the same places.",
      ],
      quote: {
        text: "As 5 is to 8, so is 8 to 13, practically, and as 8 is to 13, so is 13 to 21, almost.",
        attribution: "Johannes Kepler, On the Six-Cornered Snowflake, 1611",
      },
    },
    {
      id: "fibonacci-see",
      image: {
        ...WIKI_IMAGES.sunflower,
        caption:
          "A sunflower packs seeds at the golden angle, about 137.5°. Count the spirals and you find consecutive Fibonacci numbers, most often 34 and 55 [3].",
      },
    },
  ],
  citations: [
    "L. E. Sigler, Fibonacci's Liber Abaci: A Translation. Springer, 2002.",
    "R. Graham, D. Knuth, O. Patashnik, Concrete Mathematics, 2nd ed. Addison-Wesley, 1994, §6.6.",
    "M. Livio, The Golden Ratio. Broadway Books, 2002.",
    "J. H. Conway, R. K. Guy, The Book of Numbers. Copernicus, 1996.",
  ],
};
