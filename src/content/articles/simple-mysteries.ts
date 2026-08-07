import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "simple-mysteries",
  title: "Simple rules, deep mysteries",
  summary: "Rules a child can run by hand, carrying questions no one on Earth can answer.",
  icon: "help-circle-outline",
  sections: [
    {
      id: "mystery-intro",
      body: [
        "There is a popular image of unsolved mathematics as something locked behind years of graduate school: you need to climb a mountain of definitions before you can even read the question. Some open problems really are like that. The ones in this article are not. Each of them starts from a rule you can explain to a ten-year-old, run with pencil and paper, and verify by hand in an afternoon. And each of them ends in a question that has defeated every mathematician who has ever tried it.",
        "That combination is not a coincidence, and it is worth taking seriously. A rule being easy to run tells you nothing about whether its long-term behavior is easy to predict. The four rules below, Collatz, Recamán, Kolakoski, and the aliquot map, are among the cleanest demonstrations of that gap anywhere in mathematics. Every one of them is in this app, so you can generate the data yourself. What nobody can do, so far, is turn the data into a proof.",
      ],
    },
    {
      id: "mystery-collatz",
      title: "Collatz: the problem mathematics may not be ready for",
      body: [
        "The rule: take any positive whole number. If it is even, halve it. If it is odd, triple it and add one. Repeat. Start at 7 and you get 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1. Start at 27 and the sequence climbs all the way to 9232 before crashing down to 1 after 111 steps. The trajectories rise and fall so erratically that the values are nicknamed hailstone numbers. The Collatz conjecture says that every starting number eventually reaches 1.",
        "The problem is named for Lothar Collatz, who circulated questions of this kind in the 1930s, and it spread through the mathematical world mostly by word of mouth, picking up aliases as it went: the 3x+1 problem, the Syracuse problem, Ulam's problem, Kakutani's problem. Jeffrey Lagarias, who has tracked its history and literature for decades, collected all of this in a survey that remains the standard reference [1]. The problem's reputation is summed up by a remark of Paul Erdős, reported by Lagarias: \"Mathematics is not yet ready for such problems\" [1].",
        "Computers have checked an astonishing range. A distributed computation led by David Bařina verified that every starting value up to $2^{68}$, about 295 quintillion, falls to 1 [2], and the project has since pushed further. It is tempting to read that as overwhelming evidence, and as evidence it is fine. As proof it is worth nothing, and number theory has burned us before. Pólya's conjecture about prime factors held for every number ever tested until it failed at 906,150,257. The Mertens conjecture was verified to ten trillion and is nevertheless false. A statement about all infinitely many integers simply cannot be settled by checking finitely many of them.",
        "Why does such a small rule resist proof? The honest short answer: the map keeps scrambling the very structure you would use to analyze it. Halving is a statement about a number's binary digits; tripling and adding one is more natural in base 3. Each step shreds whatever pattern the previous step exposed, so the usual tools of number theory, which work by finding structure that persists, get no grip. There is also a warning sign from logic. John Conway showed in 1972 that a natural generalization of Collatz-style iterations is undecidable: no algorithm can determine, for every rule of that family, whether it always reaches 1 [1]. That does not mean Collatz itself is undecidable, but it does mean the difficulty is not an illusion.",
        "The biggest modern step came in 2019, when Terence Tao proved that almost all orbits of the Collatz map attain almost bounded values [3]. Unpacked: for almost every starting number N (in the technical sense of logarithmic density), the trajectory eventually dips below any slowly growing function of N you care to name, even something as glacial as log log log log N. In other words, exceptions to near-total collapse, if they exist at all, are vanishingly rare. What the argument cannot do, by its own design, is rule out a single rogue orbit that shoots off to infinity, which is exactly what the conjecture demands. Tao built the proof by treating Collatz trajectories statistically, like a random process that drifts downward on average, and the statistical frame is both the source of its power and the reason it stops short.",
      ],
      quote: {
        text: "You can get as close as you want to the Collatz conjecture, but it's still out of reach.",
        attribution: "Terence Tao, in Quanta Magazine, December 2019",
      },
      anums: ["A006577"],
      links: [
        { label: "Tao, Almost all orbits of the Collatz map", url: "https://arxiv.org/abs/1909.03562" },
      ],
    },
    {
      id: "mystery-recaman",
      title: "Recamán: does it visit every number?",
      body: [
        "The rule: start at 0. On step n, try to subtract n from where you are. If the result would be negative, or is a number the sequence has already visited, add n instead. That yields 0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, and so on, a walk along the number line that lurches forward when it cannot politely step back.",
        "The sequence reached the world through a 1991 letter from the Colombian mathematician Bernardo Recamán Santos to Neil Sloane, keeper of what became the OEIS, and it was Sloane who attached Recamán's name to it [4]. It has since become one of the most beloved entries in the entire encyclopedia: the drawing of its jumps as alternating semicircles above and below the number line, popularized by the mathematical artist Edmund Harriss and a 2018 Numberphile video, is the same picture this app draws in the Recamán arc view. Sloane has also said it is his favorite sequence in the OEIS to listen to [4], and the sound is genuinely eerie: mostly stepwise motion, punctured by sudden leaps.",
        "The open question is coverage: does every nonnegative integer eventually appear? In 1991 Sloane conjectured yes. By 2017 he had publicly changed his mind to \"not so sure,\" which is itself a lesson in how mathematicians hold beliefs [4]. The evidence is unsettling. Benjamin Chaffin, an engineer who took the computation to extraordinary lengths, found that the number 852655 has still not appeared after $10^{612}$ terms [4]. That number of terms is so far beyond physical scale that it needs a trick even to represent: Chaffin's program does not store every visited number individually, which would be impossible, but compresses the visited set into long filled-in runs, which stay manageable because the sequence tends to sweep out solid intervals. For comparison, the observable universe holds roughly $10^{80}$ atoms. After a search unimaginably past that, 852655 just sits there, unvisited.",
        "Nothing stops it from appearing at step $10^{700}$. Nothing promises it ever will. What makes the question hard is the sequence's perfect memory: whether step n goes up or down depends on the entire set of numbers visited so far, so there is no local formula, no modular shortcut, nothing to induct on. You cannot know term one billion without, in some form, knowing all the terms before it.",
      ],
      anums: ["A005132"],
      links: [
        { label: "Recamán's sequence, OEIS A005132", url: "https://oeis.org/A005132" },
      ],
    },
    {
      id: "mystery-kolakoski",
      title: "Kolakoski: the sequence that describes itself",
      body: [
        "The rule: write a sequence using only 1s and 2s, in blocks (runs) of equal digits, such that the lengths of its own runs read back the sequence itself. It begins 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, ... Check it: the runs are \"1\", \"22\", \"11\", \"2\", \"1\", \"22\", ... with lengths 1, 2, 2, 1, 1, 2, ... which is the sequence again. It is its own run-length description, a snake eating its own tail one digit at a time.",
        "The sequence is named after William Kolakoski, an American artist and recreational mathematician who posed it as a problem in the American Mathematical Monthly in 1965, though the OEIS notes it was actually discussed earlier, by Rufus Oldenburger in 1939, in work on symbolic dynamics [4]. Following Sloane's ruling, the OEIS keeps the name Kolakoski to avoid having one object under two names [4].",
        "The open question sounds like it belongs in a grade-school workbook: in the long run, are half the entries 1s? Nobody knows. It is not even known that the density of 1s converges to anything at all. The best rigorous information is a bound of Václav Chvátal from 1993, which pins the long-run frequency of 1s, in the limiting sense, between 0.499162 and 0.500838 [5]. Think about what that says: after decades of attention, humanity's knowledge about the fraction of 1s in a sequence anyone can generate on paper is \"somewhere within about a tenth of a percent of one half, probably.\"",
        "The contrast with what is known makes the ignorance sharper. It is proved that the sequence never contains three identical blocks in a row, that only six of the eight possible triples of digits ever occur, and much else about its local grammar [4]. Local structure: well understood. Global statistics: wide open. The self-referential rule is exactly what poisons the usual methods, since any statement about the sequence's digits is simultaneously a statement about its runs, and the two levels chase each other forever.",
      ],
      anums: ["A000002"],
      links: [
        { label: "Kolakoski sequence, OEIS A000002", url: "https://oeis.org/A000002" },
      ],
    },
    {
      id: "mystery-aliquot",
      title: "Aliquot sequences: five stubborn numbers",
      body: [
        "The rule: take a number, add up its proper divisors (all divisors except the number itself), and repeat. From 10 you get 1 + 2 + 5 = 8, then 1 + 2 + 4 = 7, then 1, then 0, and the sequence dies. Perfect numbers like 6 and 28 are fixed points: they equal their own divisor sum. The amicable pair 220 and 284 swap back and forth forever, a two-cycle known since antiquity. Longer loops, called sociable cycles, exist too.",
        "So every aliquot sequence should either hit a prime and die, or fall into one of these cycles, right? That guess has a name: the Catalan-Dickson conjecture, after Eugène Catalan (1888) and Leonard Dickson (1913). But there is a serious rival. Richard Guy and John Selfridge conjectured the opposite: that many aliquot sequences, perhaps most of those that start even, escape to infinity and never settle [6]. Two respected conjectures, pointing in opposite directions, about a rule taught alongside long division.",
        "The battleground is concrete. Among starting values below 1000, exactly five have unknown fate: 276, 552, 564, 660, and 966, the so-called Lehmer five. The sequence starting at 276 has been pushed past its 2150th term, where the numbers involved exceed 200 digits, and it is still climbing with no cycle and no prime in sight. Each further term requires factoring a number of that size, which is the same computational wall that protects cryptography, so progress is measured in years per step. Distributed volunteer projects keep grinding at the factorizations.",
        "Here the obstacle is different from Collatz's. The rule itself, the sum of divisors, is well understood; what is not understood is how its output relates arithmetically to its input across repeated application. Guy and Selfridge observed that certain divisibility patterns, called drivers, can lock a sequence into sustained growth for long stretches [6], which is why they doubted Catalan and Dickson. But no one can prove any particular sequence grows forever, and no one can prove 276 does not.",
      ],
      anums: ["A008892", "A001065"],
      links: [
        { label: "Aliquot sequences, OEIS wiki", url: "https://oeis.org/wiki/Aliquot_sequences" },
      ],
    },
    {
      id: "mystery-why",
      title: "What these four have in common",
      body: [
        "Look at the shape of the difficulty in each case. Recamán needs the full history of visited numbers to take one more step. Kolakoski's digits and runs define each other, so no level of description is prior to the other. An aliquot step needs the complete factorization of the current term, and factorizations do not compose across steps in any known way. Collatz keeps translating between the arithmetic of 2 and the arithmetic of 3, and each translation destroys the structure the last one used. In every case, the next term is cheap, but the ten-thousandth term seems to require actually walking there. The rules are computationally easy and structurally opaque, and mathematics currently has no general bridge from one to the other.",
        "This is also what makes them ideal first open problems. You do not need permission or prerequisites to gather real data: run Collatz in the app and watch the hailstones spike, listen to Recamán lurch, drum out Kolakoski's runs, plot 276's aliquot climb on a log scale. Everything you see will be true and honestly earned, and none of it will settle the question. Sitting with that, the full experience of evidence without proof, is the most authentic taste of research mathematics a beginner can get.",
      ],
    },
  ],
  citations: [
    "J. C. Lagarias, The 3x+1 problem and its generalizations, American Mathematical Monthly 92 (1985), 3-23.",
    "D. Barina, Convergence verification of the Collatz problem, The Journal of Supercomputing 77 (2021), 2681-2688.",
    "T. Tao, Almost all orbits of the Collatz map attain almost bounded values, Forum of Mathematics, Pi 10 (2022), e12; arXiv:1909.03562.",
    "OEIS Foundation, entries A005132 (Recamán) and A000002 (Kolakoski): comments of N. J. A. Sloane and B. Chaffin, and W. Kolakoski, Problem 5304, American Mathematical Monthly 72 (1965), 674.",
    "V. Chvátal, Notes on the Kolakoski sequence, DIMACS Technical Report 93-84, 1993.",
    "R. K. Guy and J. L. Selfridge, What drives an aliquot sequence?, Mathematics of Computation 29 (1975), 101-107.",
  ],
};
