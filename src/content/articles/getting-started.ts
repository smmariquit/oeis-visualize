import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "getting-started",
  title: "Getting started",
  summary: "What an integer sequence is, and games to play with one.",
  icon: "school-outline",
  sections: [
    {
      id: "sequences",
      title: "What is a sequence?",
      body: [
        "An integer sequence is an ordered list of whole numbers (…, −2, −1, 0, 1, 2, 3, …) that follows a rule. Each number in the list is called a term.",
        "You already know several. Counting is 1, 2, 3, 4, 5, … Even numbers are 0, 2, 4, 6, 8, … The Fibonacci sequence 0, 1, 1, 2, 3, 5, 8, … adds the previous two terms to get the next one.",
        "Sequences hide everywhere. Count the petals on flowers, the spirals in a pinecone, or the ways you can climb stairs taking 1 or 2 steps at a time. All of those lists are in the OEIS.",
        "Some rules are simple (add 1 each time). Others are strange or still unsolved, like Collatz, where every starting number is believed to eventually reach 1, but nobody has proved it for all numbers. A kid can play with the same list an expert has studied for decades; that is the charm.",
      ],
      bullets: [
        "a(n) means \"the nth term\". E.g. in 1, 2, 3, … we have a(1) = 1, a(2) = 2.",
        "Term index n starts at 0 or 1 depending on the sequence. The caption shows you which.",
        "Search this app by name (\"fibonacci\"), by A-number (A000045), or by typing the first few terms (1,1,2,3,5).",
      ],
      anums: ["A000045", "A005843", "A000027"],
    },
    {
      id: "try",
      title: "Try it yourself",
      body: [
        "Cover the next number and guess it before it appears. The daily OEISdle tab is exactly this game, with a new sequence every day and three difficulty levels you can all play today.",
        "Pick a small rule of your own (double and subtract one, add the digits, anything) and write out ten terms. Then type them into the search box. If the OEIS knows your list, you have rediscovered something; if it does not, you may have found something genuinely new. People submit new sequences this way every week.",
        "Watch the same sequence with different visualizations (the chips on the top right of a visualization) and with sound on. A pattern your eyes miss, your ears often catch.",
      ],
    },
  ],
};
