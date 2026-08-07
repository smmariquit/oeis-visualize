import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "famous",
  title: "Famous sequences",
  summary: "Six celebrities of the integer world, and why they earned it.",
  icon: "star-outline",
  sections: [
    {
      id: "famous",
      title: "Worth meeting first",
      bullets: [
        "Fibonacci (A000045): each term is the sum of the previous two; the spiral in sunflower heads and the ratio that approaches the golden number.",
        "Primes (A000040): the atoms of multiplication. Every whole number above 1 is built from them in exactly one way.",
        "Recamán (A005132): hop backward when you can, forward when you must. Nobody knows whether every number is eventually visited.",
        "Collatz stopping times (A006577): halve if even, triple and add one if odd. The most famous unsolved problem a child can state.",
        "Catalan numbers (A000108): the answer to dozens of different counting questions at once, from balanced brackets to mountain ranges.",
        "Kolakoski (A000002): the sequence that describes its own run lengths. Reading it IS generating it.",
      ],
      anums: ["A000045", "A000040", "A005132", "A006577", "A000108", "A000002"],
    },
  ],
};
