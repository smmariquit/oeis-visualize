import type { WikiArticle } from "../infoContent";
import { WIKI_IMAGES } from "../wikiImages";

export const article: WikiArticle = {
  id: "famous",
  title: "Famous sequences",
  summary: "Six celebrities of the integer world, and why they earned it.",
  icon: "star-outline",
  sections: [
    {
      id: "famous",
      title: "Worth meeting first",
      body: [
        "Every field has its celebrities, and the integer world is no exception. Out of the hundreds of thousands of sequences in the OEIS, a handful come up again and again: in classrooms, in research papers, in puzzles, and in nature. The six below are the ones a newcomer should meet first.",
        "Each gets a short portrait here, and each portrait ends the same way: with one fact that should genuinely surprise you, and one question that nobody on Earth can currently answer. Famous does not mean finished. Every sequence on this list is still an active crime scene.",
      ],
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
    {
      id: "famous-fibonacci",
      title: "Fibonacci numbers",
      body: [
        "The rule fits in a breath: start with 0 and 1, and every term after is the sum of the two before it, giving 0, 1, 1, 2, 3, 5, 8, 13, 21. Leonardo of Pisa reached it in 1202 through a puzzle about breeding rabbits, and eight centuries of mathematics have not exhausted it. The dedicated Fibonacci article in this wiki covers the golden ratio and the sunflower spirals; here is the portrait in brief.",
        "The surprising fact: this medieval rabbit sequence helped close one of the deepest questions of the twentieth century. In 1900, David Hilbert asked for an algorithm that could decide whether any given polynomial equation has whole-number solutions, his famous tenth problem. In 1970, the young Russian mathematician Yuri Matiyasevich supplied the final missing piece proving that no such algorithm can exist, and the engine of his proof was the Fibonacci sequence: its precisely calibrated exponential growth turned out to be expressible in the language of polynomial equations, which was exactly the tool needed to show those equations can encode unsolvable problems [1]. A toy about rabbits ended a seventy year quest in mathematical logic.",
        "The open question: are there infinitely many Fibonacci primes? Some Fibonacci numbers are prime, like 2, 3, 5, 13, 89, 233, and 1597, and they keep appearing as far as computers have searched. But despite the sequence's age and fame, nobody can prove the supply never runs out. The question is sharpened by a lovely known fact: the greatest common divisor of two Fibonacci numbers is itself a Fibonacci number, gcd(F(m), F(n)) = F(gcd(m, n)), which forces any prime Fibonacci number beyond 3 to sit at a prime position. The known Fibonacci primes are collected in A005478, a sequence whose ultimate length is anyone's guess.",
      ],
      anums: ["A000045", "A005478"],
    },
    {
      id: "famous-primes",
      title: "The primes",
      body: [
        "A prime is a whole number above 1 divisible only by 1 and itself: 2, 3, 5, 7, 11, 13, and onward forever, as Euclid proved around 300 BCE. The primes are the atoms of multiplication, since every whole number above 1 factors into primes in exactly one way. They are also famously unruly: no simple formula produces them, and their gaps and clusters have taunted mathematicians for millennia.",
        "The surprising fact: the primes contain arithmetic progressions of every finite length. Take 5, 11, 17, 23, 29: five primes marching in equal steps of 6. Want a hundred primes in equal steps? A million? They exist. Ben Green and Terence Tao proved this in one of the landmark theorems of the century, published in the Annals of Mathematics in 2008 [2]. The proof is a masterpiece of finding order inside apparent chaos: the primes are irregular enough that no formula tames them, yet regular enough that perfect arithmetic patterns of any length must occur.",
        "The open question: the twin prime conjecture. Pairs like 11 and 13, or 101 and 103, differ by exactly 2, and the conjecture says infinitely many such pairs exist. In 2013 Yitang Zhang stunned the field by proving that some gap smaller than 70 million occurs between primes infinitely often, the first finite bound ever established, and a massive collaborative effort (the Polymath project) drove that bound down to 246. From 246 to the conjectured 2 remains open, and the last step is expected to need a genuinely new idea.",
      ],
      anums: ["A000040", "A001097"],
    },
    {
      id: "famous-recaman",
      title: "Recamán's sequence",
      body: [
        "Invented by the Colombian mathematician Bernardo Recamán Santos, this sequence is a drunkard's walk with a memory. Start at 0. At step n, try to hop backward by n; if that would go negative or land on a number already visited, hop forward by n instead. The result, 0, 1, 3, 6, 2, 7, 13, 20, 12, 21, lurches around the number line in a way that no formula predicts, and this app draws it as its signature arcs.",
        "The surprising fact: Recamán's sequence may be the only OEIS entry more famous as music than as mathematics. It carries the keyword \"hear\", and when the OEIS community wants to demonstrate what listening to a sequence can reveal, this is the standard demo: played as pitches, its hops become eerie, wandering melodies. Sloane himself regularly names it among his favorite sequences in the entire encyclopedia, out of hundreds of thousands [3]. Try the app's Musicalize button on it and you will hear why.",
        "The open question: does every nonnegative number eventually get visited? Benjamin Chaffin has computed the sequence to an almost absurd length, 10²³⁰ terms, and one modest number is still missing: 852,655. Every smaller number has been reached; this one never has [3]. Either it appears someday, beyond any computation yet attempted, or it is the smallest of infinitely many numbers the walk skips forever. Sloane has remarked that decades ago everyone assumed every number appears, and that confidence has quietly evaporated. Nobody has a proof in either direction.",
      ],
      anums: ["A005132"],
    },
    {
      id: "famous-collatz",
      title: "Collatz stopping times",
      body: [
        "Take any positive number. If it is even, halve it; if odd, triple it and add one. Repeat. Start from 7 and you get 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1. The Collatz conjecture says every starting number reaches 1 eventually, and A006577 records how many steps each one takes: a wildly jagged sequence with no visible order. The problem is usually credited to Lothar Collatz around 1937, though the written trail is thin and it circulated for decades under other names (Syracuse, Ulam, Kakutani), passed along like folklore. Honest historians call its true origin murky.",
        "The surprising fact: the problem looked untouchable until very recently. In 2019, Terence Tao proved that in a precise statistical sense, almost every starting number eventually falls almost as low as you could ask, the strongest result in the problem's history [4]. Meanwhile David Barina's distributed computation, published in The Journal of Supercomputing in 2021, has verified the conjecture for every starting value up to 2⁶⁸ and beyond. Overwhelming evidence, statistical near-certainty, and still no proof.",
        "The open question: the conjecture itself, in its full stubborn glory. Nobody can rule out a single starting number that climbs forever, or a hidden loop other than 4, 2, 1. Paul Erdős offered five hundred dollars for a solution and is said to have added the warning quoted below. It remains the most famous unsolved problem that a child can fully understand in one minute.",
      ],
      quote: {
        text: "Mathematics may not be ready for such problems.",
        attribution: "Paul Erdős, on the Collatz problem, as reported by Jeffrey Lagarias, 1985",
      },
      anums: ["A006577"],
    },
    {
      id: "famous-catalan",
      title: "Catalan numbers",
      body: [
        "The Catalan numbers 1, 1, 2, 5, 14, 42, 132 are combinatorics' favorite answer. How many ways can you write n pairs of brackets so they balance? Catalan. How many mountain ranges can you draw with n up-strokes and n down-strokes? Catalan. Triangulations of polygons, paths that never dip below a diagonal, ways to fully parenthesize a product: all Catalan. Richard Stanley's book on the subject collects over two hundred distinct things they count [5], which is why they are sometimes called the most ubiquitous numbers after the binomial coefficients.",
        "The surprising fact: they are named after the wrong person, twice over. Eugène Catalan studied them in the 1830s, and Leonhard Euler had already found the formula in 1751, working with Johann Segner and Christian Goldbach. But a century before Catalan, in the 1730s, the Mongolian astronomer and mathematician Minggatu, working in Qing dynasty China on infinite series for trigonometric functions, was already using these numbers routinely. His manuscript was only published in 1839, and the connection went unnoticed until the historian Luo Jianjin spotted it in 1988 [5]. In mathematics, names tend to honor the best-connected discoverer, not the first.",
        "The open question: primes interact with Catalan numbers in a strangely fragile way. Every odd prime p passes a certain clean divisibility test built from the Catalan number C((p−1)/2). Composite numbers essentially always fail it, with exactly three known exceptions, the so-called Catalan pseudoprimes: 5907, 1194649, and 12327121. The last two are the squares of the only known Wieferich primes, 1093 and 3511, a connection nobody fully understands [6]. Are there infinitely many Catalan pseudoprimes? Is there a fourth one at all? Decades of computer search have found nothing, and no proof exists either way.",
      ],
      image: {
        ...WIKI_IMAGES.yanghui,
        caption:
          "Yang Hui's triangle, China, around 1303. Take the middle entry of every other row (1, 2, 6, 20, 70) and divide by 1, 2, 3, 4, 5: out come the Catalan numbers 1, 1, 2, 5, 14.",
      },
      anums: ["A000108"],
    },
    {
      id: "famous-kolakoski",
      title: "The Kolakoski sequence",
      body: [
        "This one takes a moment, and the moment is worth it. The Kolakoski sequence 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, ... uses only 1s and 2s, and it is defined by a single strange property: it equals its own run-length description. Read off the lengths of its runs (one 1, two 2s, two 1s, one 2, ...) and you get 1, 2, 2, 1, ..., the sequence itself. It is the ouroboros of the integer world: reading it is the same act as generating it.",
        "The surprising fact: it is named after the wrong person too. William Kolakoski, an artist with a mathematics degree, posed it as a problem in the American Mathematical Monthly in 1965, and his name stuck. But the sequence had already appeared in 1939, in a paper on symbolic dynamics by the American mathematician Rufus Oldenburger, a full 26 years earlier. Careful authors now write Oldenburger-Kolakoski, and the OEIS entry records the double parentage. Even in a field with perfect archives, credit is a lottery.",
        "The open question: how many 1s are there? Everyone believes the 1s and 2s each occupy exactly half the sequence in the limit, and the numerical evidence is overwhelming. Yet nobody can prove the density is 1/2; nobody can even prove that the density exists at all. The best rigorous results are humbling: Václav Chvátal proved in 1993 that the upper density of 1s is below 0.50084, and Johan Nilsson later sharpened this to 0.500080. Fifty years of effort, and the frontier of human knowledge about a sequence a child can generate is the fifth decimal place.",
      ],
      anums: ["A000002"],
    },
    {
      id: "famous-close",
      body: [
        "Six sequences, six unanswered questions. That ratio is not bad luck; it is the normal condition of mathematics, and it is precisely what makes these lists worth watching rather than merely memorizing. Open any of them in the app, run the visualization, turn on the sound, and remember while you watch: parts of what you are looking at are unknown to everyone, including the people who study them for a living.",
        "And when you are ready for more, the rest of this wiki goes deeper on several of these celebrities, the Fibonacci and Catalan numbers and the primes each have a full article of their own, while the OEIS entries linked from every chip above hold the complete research record: formulas, programs, references, and the names of everyone who ever added a fact to the file.",
      ],
    },
  ],
  citations: [
    "Y. Matiyasevich, Hilbert's Tenth Problem. MIT Press, 1993.",
    "B. Green, T. Tao, \"The primes contain arbitrarily long arithmetic progressions,\" Annals of Mathematics 167(2), 2008, pp. 481-547.",
    "M. A. Alekseyev, J. S. Myers, R. Schroeppel, S. R. Shannon, N. J. A. Sloane, P. Zimmermann, \"Three Cousins of Recamán's Sequence,\" The Fibonacci Quarterly 60(3), 2022.",
    "T. Tao, \"Almost all orbits of the Collatz map attain almost bounded values,\" Forum of Mathematics, Pi 10, 2022.",
    "R. P. Stanley, Catalan Numbers. Cambridge University Press, 2015 (with a history appendix by Igor Pak).",
    "C. Aebi, G. Cairns, \"Catalan numbers, primes and twin primes,\" Elemente der Mathematik 63(4), 2008, pp. 153-164.",
  ],
};
