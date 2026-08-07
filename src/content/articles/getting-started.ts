import type { WikiArticle } from "../infoContent";
import { WIKI_IMAGES } from "../wikiImages";

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
        "An integer sequence is an ordered list of whole numbers that follows some rule. Each number in the list is called a term. The rule can be as plain as add one each time, or so subtle that nobody alive knows how to state it completely. Either way, the list itself is the object of study: a stream of numbers, one after another, that you can compute, draw, compare, and even listen to.",
        "You already know several. Counting is 1, 2, 3, 4, 5, and so on forever. The even numbers are 0, 2, 4, 6, 8. The Fibonacci sequence 0, 1, 1, 2, 3, 5, 8, 13 adds the previous two terms to make the next one. Each of these lists has a personality: steady, skipping, accelerating. Learning to read that personality, at a glance or by ear, is most of what this app is for.",
        "Sequences hide everywhere. Count the petals on a flower, the spirals in a pinecone, the ways you can climb a staircase taking one or two steps at a time, or the number of pieces a pancake falls into after n straight cuts. Every one of those counts, listed in order, is an integer sequence, and every one of them lives in the On-Line Encyclopedia of Integer Sequences (OEIS), the giant reference this app is built on [1].",
        "Some rules are simple. Others are strange or still unsolved, like the Collatz rule (halve an even number, triple an odd one and add one), where every starting number seems to reach 1 eventually, yet nobody has proved that it always must [3]. A ten year old can play with the same list an expert has studied for decades. That mix of easy entry and deep water is the charm of the whole subject.",
      ],
      bullets: [
        "a(n) means \"the nth term\". In the counting numbers, a(1) = 1 and a(2) = 2.",
        "The index n starts at 0 or 1 depending on the sequence. That starting point is called the offset, explained below.",
        "Search this app by name (\"fibonacci\"), by A-number (A000045), or by typing the first few terms (1,1,2,3,5).",
      ],
      anums: ["A000045", "A005843", "A000027"],
    },
    {
      id: "gs-order",
      title: "Why order matters",
      body: [
        "A sequence is not a bag of numbers. It is a list, and the order is part of the information. The set containing 1, 2, 4, and 8 is the same set however you shuffle it, but the sequence 1, 2, 4, 8, where each term doubles, is a different mathematical object from 8, 4, 2, 1, where each term halves. Same ingredients, opposite stories.",
        "Position carries meaning. In the decimal digits of pi, which read 3, 1, 4, 1, 5, 9, the 4 sitting in third place is a specific fact about pi. Scramble those digits and you no longer have pi at all, just a pile of digits. The same holds for every sequence in this app: the n in a(n) tells you where you are, and where you are matters as much as what you see there.",
        "This is why mathematicians write sequences with parentheses, (1, 2, 4, 8), rather than braces, {1, 2, 4, 8}. Braces mean a set, where order and repetition are ignored. Parentheses mean a list, where both are kept. The Fibonacci sequence repeats the value 1 twice near the start, and that repetition is genuine information. A set would silently swallow it; the sequence remembers.",
        "Order is also exactly what search uses. Typing 1, 1, 2, 3, 5 into this app finds Fibonacci because those values appear consecutively, in that order, in its data. Type the same numbers backwards and you will find something else, or nothing at all. A sequence is a story, and stories read front to back.",
      ],
    },
    {
      id: "gs-rules",
      title: "Recurrences, closed forms, and honest mysteries",
      body: [
        "Mathematicians describe sequence rules in a few standard shapes, and it pays to know their names. The first is the recurrence: a recipe for the next term built from earlier ones. Fibonacci is the classic, a(n) = a(n−1) + a(n−2): to know a term, first know the two before it. Recurrences are wonderfully easy to run, and this app animates them term by term, but they make you walk the whole road. To reach the millionth term you pass through the 999,999 before it [2].",
        "The second shape is the closed form: a formula that jumps straight to any term with no walking. The square numbers obey a(n) = n², so the thousandth square is 1000000, computed in one step. Some sequences enjoy both descriptions at once. Fibonacci has its recurrence and also Binet's closed form, which produces a(n) directly from powers of the golden ratio φ ≈ 1.618. Two very different descriptions, one identical list, and proving that two descriptions agree is a small theorem every single time [2].",
        "The third shape is the honest confession: no formula known. The primes can be found by sieving, but no simple closed form hands you the nth prime directly. For the Collatz stopping times, nobody has proved a formula exists, and nobody has even proved that every term is finite [3]. The OEIS marks some sequences with the keyword \"hard\" for exactly this reason. A missing formula is not a defect in the sequence. It is a status report from the frontier, and it tells you precisely where the open problems live.",
        "There are shapes in between as well: generating functions, which pack a whole sequence into a single algebraic expression; asymptotic estimates, which describe the long run behavior without pinning down each term; and computer programs, which are formulas a machine can read. A good OEIS entry collects all of them side by side, contributed by different people across decades [1].",
      ],
    },
    {
      id: "gs-notation",
      title: "How to read a(n)",
      body: [
        "The notation a(n) means nothing more than \"the nth term of the list\", read aloud as \"a of n\". The letter a names the sequence and n names the position. In the square numbers, a(1) = 1, a(2) = 4, a(3) = 9, and a(7) = 49. Underneath the notation sits a simple idea: a sequence is a function. Feed in a position, get out a value.",
        "Once a(n) feels natural, recurrences become plain sentences. a(n) = a(n−1) + a(n−2) says \"each term is the sum of the term one step back and the term two steps back\". a(n) = 2·a(n−1) says \"each term doubles the previous one\". When you meet an unfamiliar formula on an OEIS entry, try reading it aloud this way; most of them turn out to be one short sentence wearing symbols.",
        "One habit is worth forming early: distinguish the position from the value. In the Fibonacci sequence, a(10) = 55 is a sentence with two numbers in it, and they play completely different roles. The 10 is an address; the 55 is what lives there. Plenty of classic puzzles turn on this distinction, such as asking for which n it happens that a(n) = n, so keep the two numbers mentally separate and half the confusion of the subject never arrives.",
        "This app uses the same notation everywhere: in captions under the visualizations, in the wiki articles, and in the full OEIS entries you can open from any sequence. When a caption says a(4) = 2 for Recamán's sequence, it is pointing at the fifth number the construction draws, because that particular sequence starts counting at n = 0. Which brings us to the one piece of bookkeeping every beginner should meet once.",
      ],
      anums: ["A000290", "A005132"],
    },
    {
      id: "gs-offset",
      title: "What \"offset\" means",
      body: [
        "Where does n start? Some sequences naturally begin at n = 0, others at n = 1, and a few start elsewhere entirely. That starting index is called the offset, and every OEIS entry declares it near the top [1].",
        "It matters more than it looks. The Fibonacci entry has offset 0, with a(0) = 0. So its tenth term depends on where you begin counting: with offset 0, a(10) = 55, but a friend counting from 1 would call 55 the eleventh term. Neither of you is wrong. You are using different conventions, and stating the offset out loud is how mathematicians avoid arguing about it.",
        "The primes use offset 1: a(1) = 2, a(2) = 3, and the fifth prime is a(5) = 11. The choice is a convention, made once per sequence, so that everyone on Earth can point at the same term with the same finger. When this app shows an index under a visualization, it respects the offset of the sequence you are watching.",
        "One last honest detail: if you open a full OEIS entry, the offset field actually holds two numbers, something like \"0,4\". The first is the starting index you now understand. The second is internal bookkeeping, the position of the first term whose absolute value exceeds 1, which the encyclopedia uses to align searches. Beginners only ever need the first number, but now the second one will not surprise you.",
      ],
    },
    {
      id: "gs-why",
      title: "Why mathematicians care",
      body: [
        "Sequences are the fingerprints of problems. Whenever you count anything, arrangements, paths, tilings, primes, petals, the answers arrive as a sequence, and matching fingerprints reveal hidden kinship. If counting two apparently unrelated things produces the same list of numbers, that is strong evidence the two things are secretly one thing wearing different costumes, and finding the disguise is a theorem waiting to happen [1].",
        "This happens constantly. Climbing stairs one or two steps at a time gives the Fibonacci numbers. So does tiling a strip with dominoes and single squares, and so does counting certain arrangements of coins. Before 1973 you needed luck and a good memory to notice such coincidences. Then Neil Sloane began publishing his collections of sequences, and suddenly mathematicians could look a pattern up the way a detective runs a fingerprint through a database [5]. Whole papers exist because two entries in that database turned out to match.",
        "There is also a plainer reason, and it is worth saying without embarrassment: patterns are the raw material of mathematics, and sequences are patterns in their purest form. You do not need permission or a degree to notice one. The workflow of a modern experimental mathematician is available to anyone with this app: compute a few terms, look them up, read what is known, guess what comes next, and then try to prove your guess [1].",
      ],
      quote: {
        text: "A mathematician, like a painter or a poet, is a maker of patterns.",
        attribution: "G. H. Hardy, A Mathematician's Apology, 1940",
      },
      image: {
        ...WIKI_IMAGES.aloe,
        caption:
          "A spiral aloe. Count its spiral arms and you are already doing sequence mathematics: nature keeps producing ordered lists of whole numbers, and the OEIS keeps the dictionary.",
      },
    },
    {
      id: "try",
      title: "Try it yourself",
      body: [
        "Play the guessing game. Pick any sequence in this app, cover the screen, reveal terms one at a time, and guess the next before it appears. The daily OEISdle tab is exactly this game made official, with a new sequence every day, three difficulty levels, and a streak to protect. Guessing is not a warmup for real mathematics; it is the first half of it. The second half is explaining why your guess works.",
        "Draw the triangular numbers. Put down one dot, then a row of two beneath it, then three, then four, and count the total after each row: 1, 3, 6, 10, 15. Type those into the search box and meet A000217, one of the oldest sequences humanity knows. Then try the same trick with squares of dots and confirm you get 1, 4, 9, 16.",
        "Take differences. Write the squares 0, 1, 4, 9, 16, 25 and under each neighboring pair write the gap: 1, 3, 5, 7, 9, the odd numbers. Differencing is the sequence detective's first tool, because a complicated sequence often has a simpler one hiding one layer down. Try it on the triangular numbers and see what appears.",
        "Invent a rule of your own. Double and subtract one, add the digits, whatever you like, and write out ten terms carefully. Search for them. If the OEIS knows your list, you have rediscovered something real, and the entry will tell you who found it first and what it is for. If it does not, you may have found something genuinely new. People submit new sequences to the encyclopedia every week, and some of them started exactly this way.",
        "Finally, use the senses. Watch one sequence through different visualizations (the chips at the top right of any visualization screen), then turn on sound. A pattern your eyes miss, your ears often catch, which is why the OEIS itself tags certain entries as worth listening to.",
      ],
      anums: ["A000217", "A000290", "A005408"],
    },
  ],
  citations: [
    "N. J. A. Sloane, \"The On-Line Encyclopedia of Integer Sequences,\" Notices of the American Mathematical Society 65(9), 2018, pp. 1062-1074.",
    "R. Graham, D. Knuth, O. Patashnik, Concrete Mathematics, 2nd ed. Addison-Wesley, 1994.",
    "J. C. Lagarias, \"The 3x+1 Problem and Its Generalizations,\" The American Mathematical Monthly 92(1), 1985, pp. 3-23.",
    "G. H. Hardy, A Mathematician's Apology. Cambridge University Press, 1940.",
    "N. J. A. Sloane, S. Plouffe, The Encyclopedia of Integer Sequences. Academic Press, 1995.",
  ],
};
