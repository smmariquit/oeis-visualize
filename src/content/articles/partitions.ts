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
        "A partition of a number is a way of writing it as a sum where order does not matter. There are seven partitions of 5: 5 itself; 4 + 1; 3 + 2; 3 + 1 + 1; 2 + 2 + 1; 2 + 1 + 1 + 1; and five 1s. Since 3 + 2 and 2 + 3 are the same handful of parts, they count once. That indifference to order is the whole definition, and it is what separates partitions from the far easier problem of counting ordered sums.",
        "The partition numbers p(n) begin 1, 1, 2, 3, 5, 7, 11, 15, 22, 30, 42, ... Modest beginnings, and then the floor drops away: p(50) is 204,226, p(100) is 190,569,292, and p(1000) is a number with 32 digits. The growth is stranger than it first appears. It outruns every polynomial, yet crawls compared with the doubling of 2ⁿ; the partition function lives in an in-between regime that took two of history's great mathematicians to pin down, a story this chapter builds toward [1].",
        "One warning about a near neighbor. Counting the ways to split the set {1, 2, 3, 4, 5} into groups, where the elements are distinguishable individuals rather than identical units, gives the Bell numbers, a different and faster-growing sequence. Compare all three in the app and you can watch how much the identity of the pieces matters.",
      ],
      anums: ["A000041", "A000009", "A000110"],
    },
    {
      id: "partition-ferrers",
      title: "Pictures made of dots",
      body: [
        "Partitions become geometry the moment you draw them. Write each part as a row of dots, longest row on top: the partition 4 + 2 + 1 of 7 becomes a staircase of dots, four over two over one. These pictures are called Ferrers diagrams, after the nineteenth-century Cambridge mathematician Norman Ferrers, and they turn statements about sums into statements about shapes [1].",
        "The first dividend is the transpose. Flip a diagram across its diagonal, so rows become columns, and you get another legitimate partition of the same number: 4 + 2 + 1 flips to 3 + 2 + 1 + 1. The flip is reversible, so it pairs up partitions perfectly, and every pairing proves a theorem. Partitions of n into at most k parts correspond exactly to partitions of n into parts no bigger than k, because bounding the number of rows is, after a flip, bounding the length of the columns. A fact that looks like it needs calculation needs only a quarter turn of the page [1].",
        "This is a taste of bijective combinatorics, the art of proving two counts equal by translating between the objects rather than counting either side, and partition theory is its home turf. Some of its gems took centuries: the partitions of n into distinct parts and the partitions of n into odd parts are always equinumerous, six of each kind for n = 8, and Euler proved it with the machinery of the next section, but a direct dot-shuffling translation was only supplied later by Sylvester and others. The pictures are elementary; what people keep finding in them is not [1].",
      ],
    },
    {
      id: "partition-euler",
      title: "Euler's counting machine",
      body: [
        "Partition theory proper begins with Leonhard Euler in the 1740s, and with a trick that still powers the subject: the generating function. The idea sounds almost too naive to work. Encode a whole sequence of counts as the coefficients of one infinitely long polynomial, a power series, and then manipulate the series as a single algebraic object. Facts about the manipulation become facts about all the counts at once [1].",
        "For partitions the encoding writes itself. Build the product of the geometric series 1 + x + x² + ... times 1 + x² + x⁴ + ... times 1 + x³ + x⁶ + ... and so on, one factor for each part size. When the product is expanded, each way of picking one term from each factor contributes to a power of x; picking x⁶ from the third factor means using two 3s, and the exponents add exactly the way parts of a sum do. So the coefficient of xⁿ in the expansion is precisely p(n): the algebra performs the counting. Euler's machine converts partition problems into series manipulations, and its first triumphs came immediately. Deleting the factors for even part sizes counts partitions into odd parts; a different alteration counts partitions into distinct parts; and Euler showed the two altered series are algebraically identical, proving the odd-equals-distinct theorem of the previous section without drawing a single dot [1].",
        "Generating functions went on to conquer combinatorics far beyond partitions, and the app's other chapters keep meeting them. The Fibonacci and Catalan sequences each have one that fits on a napkin. The partition function's is the deepest of the lot: it opens onto the theory of modular forms, the same waters where the proof of Fermat's Last Theorem swims, and the bridge it provides between adding whole numbers and complex analysis is, a century after Hardy and Ramanujan crossed it, still carrying traffic [1][4].",
      ],
    },
    {
      id: "partition-pentagonal",
      title: "The pentagonal surprise",
      body: [
        "Euler kept probing his machine and hit one of the strangest theorems of his century. Consider the reciprocal of the partition series, the infinite product (1 − x)(1 − x²)(1 − x³)... Expanding it should, by rights, produce a chaos of coefficients. Instead nearly everything cancels. What survives is a ghostly skeleton: 1 − x − x² + x⁵ + x⁷ − x¹² − x¹⁵ + x²² + x²⁶ − ..., every surviving coefficient just plus or minus one, appearing in pairs of like sign [1].",
        "The exponents 1, 2, 5, 7, 12, 15, 22, 26 are the generalized pentagonal numbers, the dot-counts of nested pentagons and their mirror variants, a family with no visible business in this problem. Euler noticed the pattern from computed terms in the 1740s and then needed nearly a decade to find a proof, an interval he spent, by his own account, quite bothered. The modern proof is a Ferrers-diagram shuffle of exactly the kind this chapter has been practicing: a clever pairing that cancels almost every partition into distinct parts against a partner, with the pentagonal survivors left standing because the pairing rule jams on them [1].",
        "The theorem earns its keep the moment it is turned around. Because the pentagonal product is the reciprocal of the partition series, its skeleton yields a recurrence: p(n) = p(n − 1) + p(n − 2) − p(n − 5) − p(n − 7) + p(n − 12) + p(n − 15) − ..., signs in pairs, only about √n terms deep. This converts computing p(n) from an exhaustive listing problem into quick arithmetic, and it is how Percy MacMahon, the great hand-calculator of the era, produced his celebrated table of p(n) up to n = 200, computing by hand the thirteen-digit value p(200) = 3,972,999,029,388. That table was about to make history in someone else's hands [1][2].",
      ],
      anums: ["A001318"],
    },
    {
      id: "partition-see",
      title: "See it",
      body: [
        "Overlay ordinary partitions, partitions into distinct parts, and Bell numbers in the app. A shared log scale turns three kinds of counting question into three visibly different growth stories: the Bell numbers pull away fastest, while the two partition curves rise with a telltale bend, steepening forever but ever more gently. That bend is the visual signature of the exponential-of-a-square-root law derived below, and once you have seen it you will recognize partition-like growth in other sequences at a glance.",
        "The pentagonal recurrence is also why the app can show you exact partition values as far as you care to scroll: each term costs only a handful of additions and subtractions of earlier ones, just as it cost MacMahon, minus the quill.",
      ],
    },
    {
      id: "partition-ramanujan",
      title: "Ramanujan's congruences",
      body: [
        "In 1913, Godfrey Harold Hardy, then Britain's leading analyst, received an envelope from a 25-year-old shipping clerk in Madras with no university degree: nine pages of formulas, some familiar, some wild, a few, Hardy later said, that must be true because no one would have had the imagination to invent them. Srinivasa Ramanujan arrived in Cambridge the next year, and one of the most productive collaborations in the history of mathematics began [5].",
        "Among the objects waiting in Cambridge was MacMahon's table. Where others saw a wall of digits, Ramanujan saw stripes. Every fifth entry, p(4), p(9), p(14), p(19), ..., is divisible by 5. Every seventh entry starting from p(5) is divisible by 7; every eleventh starting from p(6) is divisible by 11. He proved the first two and stated the third, publishing the results in 1919 [3]. Stop and let the oddity land: partitions are pure addition, yet here is multiplicative structure, divisibility on a perfect schedule, surfacing in a count that has no right to know what a multiple of 5 is.",
        "The story since is a lesson in how one observation can feed a century. Freeman Dyson, as an undergraduate in 1944, conjectured a combinatorial explanation, a statistic he called the rank that should split the partitions of 5n + 4 into five exactly equal classes, and playfully named a subtler statistic, the crank, before anyone knew what it was; the rank explanation was proved for 5 and 7 in the 1950s, and the crank was finally constructed by Andrews and Garvan in 1988. Meanwhile the congruences themselves turned out to be the visible tip of something enormous: in 2000, Ken Ono proved that congruences like Ramanujan's exist for every prime modulus from 5 upward, infinitely many for each, by connecting the partition function to the theory of modular forms [4]. And in the other direction, an honest blank: whether p(n) is even or odd appears to behave like a coin flip, and proving anything about the pattern of its parity remains beyond reach. The stripes Ramanujan saw are now a landscape, with its far edge still unmapped [4].",
      ],
    },
    {
      id: "partition-growth",
      title: "How fast does it grow?",
      body: [
        "Hardy and Ramanujan's deepest joint work answered the question this chapter opened with: how fast does p(n) really grow? Their 1918 answer is one of the most striking formulas in mathematics: p(n) is asymptotically e raised to the power π√(2n/3), divided by 4n√3 [2]. An exponential, but of the square root of n: the in-between growth regime, caught exactly, with the circle constant π making an entirely unexpected appearance in a problem about adding whole numbers.",
        "The formula is astonishingly sharp. For n = 100 it predicts about 199 million against the true 190,569,292, an error under 5 percent, and the relative error shrinks as n grows. To get it, Hardy and Ramanujan invented the circle method, a technique for extracting a single coefficient from a generating function by integrating around a circle in the complex plane and dissecting the circle into arcs near and far from the series' worst singularities. The method outlived the problem to become one of analytic number theory's principal engines, powering results on Waring's problem and the ternary Goldbach theorem, among much else [2].",
        "There is a remarkable coda. In 1937, Hans Rademacher, refining the analysis, found that the asymptotic series could be repaired into an exact one: an infinite sum of analytic terms that converges to the precise integer value of p(n), a closed-form answer to a counting problem that looks like it could not possibly have one [6]. Truncate Rademacher's series after a modest number of terms and round, and you have the exact value of p(n) for astronomically large n, a fact modern computer algebra systems exploit daily.",
      ],
    },
    {
      id: "partition-real-world",
      title: "In the real world",
      body: [
        "Physicists care about partitions because nature keeps asking partition questions. In quantum statistical mechanics, a collection of identical bosonic oscillators sharing n indivisible quanta of energy realizes the definition exactly: the microstates available to the system are the partitions of n, so counting them, which is what entropy is, means evaluating p(n). The Hardy-Ramanujan formula thus reads as a statement of physics: entropy grows like the square root of energy for such systems [1].",
        "The reading is not a metaphor. In 1936, Hans Bethe estimated how the number of energy levels of a heavy atomic nucleus grows with excitation energy, and his celebrated level-density formula has exactly the exponential-of-a-square-root shape, for exactly the partition-theoretic reason. The same mathematics resurfaced decades later at the foundations of string theory, where counting the vibrational states of a quantized string is again a partition count; the growth rate of p(n) governs the theory's density of states at high energy, with consequences, such as a maximum sustainable temperature, that follow directly from Hardy and Ramanujan's exponent. A formula derived in 1918 to count sums of whole numbers turns out to constrain thermodynamics in theories its authors did not live to see [1].",
        "Closer to the ground, Ferrers diagrams under their other name, Young diagrams, index the irreducible representations of the symmetric group, the mathematical objects that classify how systems of identical particles can transform, and partition-shaped bookkeeping runs through quantum chemistry, random matrix theory, and the statistics of longest increasing subsequences in random data. Ask how a whole can be shared among indistinguishable pieces and you have asked for a partition; nature asks constantly [1].",
      ],
    },
    {
      id: "partition-open-door",
      title: "An open door",
      body: [
        "For a subject whose objects a child can draw, partition theory has a remarkable stock of open problems. The parity question heads the list: nobody can prove that p(n) is even infinitely often and odd infinitely often in the balanced way all computation suggests, and the analogous questions modulo 3 are just as stubborn. The congruence landscape Ono opened is still being surveyed, with explicit new congruences found by computer search and no complete map in sight [4].",
        "Ramanujan left one more gift. In his last letter to Hardy, written in 1920 as he was dying in India at 32, he described a new class of functions he called mock theta functions, partition-flavored series with mysterious symmetry defects. What he meant was only fully understood in 2002, when Sander Zwegers placed them inside the modern theory of modular forms, and they have since appeared in the physics of black holes, a subject that did not exist when Ramanujan wrote [5]. It is hard to name another case of a mathematician's deathbed notes setting research agendas a century out. The partition numbers sit in the app alongside every other sequence, and they will plot and play like any other; but you now know that behind the innocent staircase of 1, 2, 3, 5, 7, 11 lies one of mathematics' deepest and most human stories.",
      ],
      links: [
        { label: "Partition numbers, OEIS A000041", url: "https://oeis.org/A000041" },
        { label: "Ramanujan's partition congruences", url: "https://doi.org/10.1017/S0305004100010095" },
        { label: "G. E. Andrews, K. Eriksson, Integer Partitions", url: "https://doi.org/10.1017/CBO9781139167239" },
      ],
    },
  ],
  citations: [
    "G. E. Andrews, K. Eriksson, Integer Partitions. Cambridge University Press, 2004.",
    "G. H. Hardy, S. Ramanujan, \"Asymptotic Formulae in Combinatory Analysis\". Proceedings of the London Mathematical Society 17, 1918, pp. 75-115.",
    "S. Ramanujan, \"Some Properties of p(n), the Number of Partitions of n\". Proceedings of the Cambridge Philosophical Society 19, 1919, pp. 207-210.",
    "K. Ono, \"Distribution of the Partition Function Modulo m\". Annals of Mathematics 151, 2000, pp. 293-307.",
    "R. Kanigel, The Man Who Knew Infinity: A Life of the Genius Ramanujan. Charles Scribner's Sons, 1991.",
    "H. Rademacher, \"On the Partition Function p(n)\". Proceedings of the London Mathematical Society 43, 1937, pp. 241-254.",
  ],
};
