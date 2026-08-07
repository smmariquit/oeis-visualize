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
        "The Catalan numbers begin 1, 1, 2, 5, 14, 42, 132, 429, ... The fourth term, 5, can count the ways to parenthesize a product of four factors, the mountain walks of six steps that never dip below ground, or the ways to slice a pentagon into triangles. Ask any of the three questions for larger inputs and the answers march in lockstep forever.",
        "That is not a coincidence, and the way mathematicians prove it is one of the loveliest ideas in combinatorics: the bijection, a reversible translation between two kinds of objects. If every triangulated pentagon can be converted into a parenthesized product, and the conversion can be run backwards without losing information, then the two collections must be the same size, even if you never count either one. You have counted without counting. Richard Stanley's book on the Catalan numbers catalogs 214 different families of objects they count, from handshake patterns across a round table to configurations in chemistry, all stitched together by such translations [1].",
        "There is also a formula, and it is a strange beauty. The nth Catalan number equals the central binomial coefficient, the number of ways to choose n things from 2n, divided by n + 1. Nothing about brackets or polygons whispers why dividing by n + 1 should even produce a whole number, let alone the right one. By the end of this chapter you will know a three-sentence proof.",
      ],
      anums: ["A000108", "A000984", "A001006"],
      figure: {
        kind: "term-plot",
        params: {
          terms: [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845],
          label: "Catalan numbers C(0) to C(15)",
        },
        caption:
          "The Catalan numbers on a log scale: after a slow start the curve straightens into steady exponential growth, multiplying by roughly 4 per step.",
      },
    },
    {
      id: "catalan-brackets",
      title: "Balanced brackets",
      body: [
        "The cleanest doorway into the family is a typing exercise. How many strings of n opening and n closing brackets are balanced, meaning that reading left to right you never close a bracket you have not opened? For n = 3 there are exactly five: ((())), (()()), (())(), ()(()), ()()(). Five is the third Catalan number, and the pattern holds for every n [1].",
        "Balanced brackets are the skeleton key to the whole collection, because so many other structures are secretly bracket strings. A binary tree can be spelled as brackets: each node becomes a pair enclosing the spelling of its children. A parenthesized product is already made of brackets.",
        "Even the handshake problem, in which 2n people around a table shake hands without any two handshakes crossing, is brackets in disguise: walk the circle clockwise and write an opening bracket at each person who starts a handshake with someone ahead, a closing bracket at each person who completes one. Non-crossing is exactly balanced [1].",
      ],
    },
    {
      id: "catalan-recurrence",
      title: "The self-similar recurrence",
      body: [
        "Before the formula, the family had a recurrence, and the recurrence explains why trees keep appearing in this chapter. Look at any balanced bracket string and mark the moment its very first bracket finally closes. Everything strictly inside that first pair is itself a smaller balanced string, and everything after it is another one. So every balanced string of n pairs splits, in exactly one way, into a first-enclosed part with some k pairs and a trailing part with the remaining n − 1 − k pairs, and conversely any two smaller balanced strings can be reassembled this way [1].",
        "Counting both sides of that split gives Segner's recurrence: the nth Catalan number is the sum, over every possible size k of the enclosed part, of the count for k times the count for n − 1 − k. Each Catalan number is built from products of smaller ones, which is the algebraic shadow of a structural fact: these objects are self-similar, each one a shell containing two smaller instances of the same kind of object. That is precisely the anatomy of a binary tree, one node holding two subtrees, and it is why any structure with a first-return decomposition, wherever it comes from, lands in the Catalan family. When you meet a count you suspect is Catalan, testing whether its objects split this way is usually the fastest route to certainty [1].",
      ],
    },
    {
      id: "catalan-dyck",
      title: "Mountains, and a proof by reflection",
      body: [
        "Redraw a bracket string as a walk: each opening bracket is a step up, each closing bracket a step down. Balanced strings become mountain ranges of 2n steps that start at sea level, end at sea level, and never dip below it. Combinatorialists call these Dyck paths, and they turn the counting problem into geometry [1].",
        "Here is the promised proof, in prose. Among all walks of n up-steps and n down-steps in some order, sea level rules ignored, there are exactly choose-n-from-2n, since a walk is just a choice of which steps go up. Call a walk bad if it ever dips below sea level.",
        "Take any bad walk, find the very first step on which it sinks to one below sea level, and flip every step after that point, ups becoming downs and downs becoming ups. The flipped walk now ends at two below sea level, so it has n − 1 up-steps and n + 1 down-steps. The flip loses no information: given any walk with n − 1 ups and n + 1 downs, it must at some point first reach one below sea level, and flipping its tail there restores the original bad walk.",
        "So bad walks correspond exactly to walks with n − 1 ups, of which there are choose n − 1 from 2n. Good walks are what remains: choose-n minus choose-n−1, and that difference simplifies to the central binomial coefficient divided by n + 1. The mysterious formula falls out of a mirror [2].",
        "This reflection trick is a workhorse of combinatorics, and its history carries a small correction worth making. The technique is almost universally called André's reflection method, after Désiré André's 1887 solution of the ballot problem.",
        "But André's actual paper contains no reflection at all; he used a different, equally clever cut-and-paste argument, and the reflection proof entered the literature decades later, in 1923, through Jacques Aebly and Dmitry Mirimanoff. The misattribution was documented by Marc Renault in 2008, after generations of textbooks had copied it from one another [2]. Folklore compounds like interest.",
      ],
      figure: {
        kind: "dyck-paths",
        caption:
          "All five Dyck paths of six steps, C(3) = 5, one mountain per balanced bracket string. Tap a path to see the bracket string it spells.",
      },
    },
    {
      id: "catalan-ballot",
      title: "The ballot problem",
      body: [
        "The reflection story began with an election. In 1887, Joseph Bertrand asked: candidate A beats candidate B by p votes to q, and the ballots are counted one at a time in random order; what is the chance A stays strictly ahead of B throughout the entire count? The answer is astonishingly clean: (p − q) / (p + q), nothing else surviving in the formula [2]. A 60-to-40 landslide keeps its winner ahead all the way with probability just one in five.",
        "The connection to everything above: chart the count as a walk, one step up per vote for A, one step down per vote for B, and staying strictly ahead means the walk never returns to sea level after the first step. Ballot counts, Dyck paths, and bracket strings are one picture wearing three costumes. In the tied case p = q, the counts in which A never falls behind are counted precisely by the Catalan numbers, which is how the family earned its place in probability theory as well as combinatorics [1][2].",
      ],
    },
    {
      id: "catalan-history",
      title: "Who found them first?",
      body: [
        "The naming of the Catalan numbers is a lesson in how mathematical credit actually works. Leonhard Euler studied them in the 1750s, counting the triangulations of polygons in correspondence with Christian Goldbach and guessing the formula from the data. His colleague Johann Andreas von Segner supplied the recurrence that builds each value from the earlier ones, and Euler, in a move familiar to anyone who has reviewed a paper, wrote back pointing out how the recurrence and his formula fit together [3].",
        "Eugène Charles Catalan, the Belgian mathematician whose name stuck, arrived nearly a century later, in 1838, connecting the numbers to bracket sequences in the flurry of notes that followed a proof by Gabriel Lamé which Joseph Liouville had circulated among his colleagues. For decades some authors called them Segner numbers; the modern name only hardened in the twentieth century, largely through John Riordan's influential textbooks [3].",
        "And yet everyone named so far was late. In the 1730s, the Mongolian-born astronomer and mathematician Ming Antu, working at the Qing imperial observatory in Beijing, was computing infinite series expansions of trigonometric functions, a line of work sparked when the French Jesuit Pierre Jartoux brought three of Newton-era Europe's power series to China. In the course of expressing the sine of a whole multiple of an angle in terms of the sine of the angle, Ming Antu derived series whose coefficients are exactly the Catalan numbers, and he used their defining recurrence, decades before Euler and a full century before Catalan [4].",
        "His treatise, the Ge Yuan Mi Lu Jie Fa, or Quick Methods for Accurate Values of Circle Segments, was left unfinished at his death around 1763, completed by his student Chen Jixin in 1774, and finally printed in 1839. It then sat unread by the wider world for another 150 years, until the Chinese historian of mathematics Luo Jianjin identified the Catalan numbers in it in 1988, a finding introduced to Western readers by Peter Larcombe a decade later [4].",
        "The numbers are named for the fourth person to find them. There is no scandal in this, only the ordinary physics of communication: credit flows along the channels that exist, and eighteenth-century Beijing and Saint Petersburg were not connected. The mathematics did not care. It was simply true in both places.",
      ],
    },
    {
      id: "catalan-see",
      title: "See it",
      body: [
        "Compare Catalan numbers with the central binomial coefficients in the app. On the ratio view, Catalan is exactly the central binomial coefficient divided by n + 1, so their ratio traces the curve 1 / (n + 1). The shared log-scale view makes their common growth visible: both climb like 4 to the power n, with the Catalan curve running just below its parent. That growth rate is no accident either; it follows from the formula, and it means the family outruns every polynomial while staying forever a factor of about n to the three-halves below 4ⁿ [1].",
        "The central binomial coefficients live in the middle column of Pascal's triangle, pictured here in its oldest printed form. Yang Hui's triangle predates Pascal by three centuries and, fittingly for this chapter, reminds you that the objects in it were discovered more than once, on more than one continent.",
      ],
      image: WIKI_IMAGES.yanghui,
      figure: {
        kind: "term-plot",
        params: {
          terms: [1, 2, 6, 20, 70, 252, 924, 3432, 12870, 48620, 184756, 705432, 2704156, 10400600, 40116600, 155117520],
          label: "Central binomial coefficients",
        },
        caption:
          "The parent sequence: choose n from 2n climbs like 4ⁿ, a straight line on this log scale, with the Catalan numbers tracking it a factor of n + 1 below.",
      },
    },
    {
      id: "catalan-real-world",
      title: "In the real world",
      body: [
        "Computer science is where the Catalan numbers punch a clock every day. A compiler checking that your brackets, braces, and parentheses nest correctly is verifying membership in the Dyck language, the formal-language theorist's name for balanced bracket strings; it is the canonical example of a language that finite automata cannot recognize but pushdown automata can, which is the theoretical reason parsers need a stack [1].",
        "The trees are everywhere too. The number of distinct shapes a binary search tree on n keys can take is the nth Catalan number, which is the starting point for analyzing how well such trees perform on random data [5]. The number of ways a compiler can associate a chain of matrix multiplications, the search space of the classic dynamic programming exercise, is Catalan. Donald Knuth's analysis of a humble stack showed that the permutations obtainable by pushing and popping an input sequence are counted by the Catalan numbers as well, one of the results that opened the modern study of patterns in permutations [5].",
        "Beyond computing, the numbers and their close cousins, such as the Motzkin numbers, count non-crossing structures wherever they arise: the ways RNA strands can fold back and pair with themselves without their bonds crossing, the planar diagrams of certain interactions in physics, the triangulated polygons of computational geometry and computer graphics. Whenever a system forbids crossing or requires nesting, the Catalan numbers are lying in wait [1][6].",
      ],
    },
    {
      id: "catalan-open-door",
      title: "An open door",
      body: [
        "Stanley's catalog of 214 interpretations is not closed; combinatorialists keep finding new families of objects counted by the same sequence, and each addition comes with the same puzzle, namely to exhibit the translation that explains it [1]. Many known bijections are still unsatisfying, proving two families equal in size through a chain of intermediaries rather than by a direct, natural correspondence. Finding the direct translation is a standard sport, accessible to anyone with patience and paper.",
        "A good challenge: take a counting problem you care about, and look for the hidden non-crossing structure, the nesting, the tree inside it. Compute the first four or five values by brute force. If you see 1, 2, 5, 14, you have almost certainly caught a Catalan problem, and the OEIS entry below, one of the richest pages in the entire encyclopedia, will hand you a century of company.",
        "Ming Antu found these numbers inside trigonometry, about as far from bracket-counting as mathematics gets. The next surprising residence is open.",
      ],
      figure: {
        kind: "ferrers",
        caption:
          "A direct translation you can perform, borrowed from the partitions chapter: tap the diagram and rows become columns, pairing every partition with its conjugate and proving two counts equal with no counting. Finding a flip this clean for a Catalan family is the sport.",
      },
      links: [
        { label: "Catalan numbers, OEIS A000108", url: "https://oeis.org/A000108" },
        { label: "Richard Stanley, Catalan Numbers", url: "https://doi.org/10.1017/CBO9781107420206" },
        { label: "Igor Pak, History of Catalan numbers", url: "https://arxiv.org/abs/1408.5711" },
      ],
    },
  ],
  citations: [
    "R. P. Stanley, Catalan Numbers. Cambridge University Press, 2015.",
    "M. Renault, \"Lost (and Found) in Translation: André's Actual Method and Its Application to the Generalized Ballot Problem\". American Mathematical Monthly 115, 2008, pp. 358-363.",
    "I. Pak, \"History of Catalan Numbers\", appendix B in R. P. Stanley, Catalan Numbers. Cambridge University Press, 2015.",
    "P. J. Larcombe, \"The 18th Century Chinese Discovery of the Catalan Numbers\". Mathematical Spectrum 32(1), 1999, pp. 5-7.",
    "D. E. Knuth, The Art of Computer Programming, Vol. 1: Fundamental Algorithms, 3rd ed. Addison-Wesley, 1997.",
    "T. Koshy, Catalan Numbers with Applications. Oxford University Press, 2009.",
  ],
};
