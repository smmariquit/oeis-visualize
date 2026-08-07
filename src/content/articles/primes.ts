import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "primes",
  title: "The primes keep surprising us",
  summary: "The building blocks of multiplication still hide their most basic patterns.",
  icon: "lock-closed-outline",
  sections: [
    {
      id: "prime-rule",
      title: "Atoms of multiplication",
      body: [
        "A prime is a whole number greater than 1 with exactly two positive divisors: 1 and itself. The first few are 2, 3, 5, 7, 11, 13, and they earn the name atoms of multiplication from the fundamental theorem of arithmetic: every whole number above 1 factors into primes in exactly one way, apart from reordering. Sixty is 2 × 2 × 3 × 5, and no amount of cleverness will ever produce a different prime recipe for 60 [1].",
        "That uniqueness clause explains a perennial classroom question: why is 1 not a prime? Not because of some deep property it lacks, but because letting it in would wreck the bookkeeping. If 1 were prime, then 60 would equal 2 × 2 × 3 × 5, and also 1 × 2 × 2 × 3 × 5, and so on forever, and the one-recipe-per-number theorem would need an asterisk.",
        "Mathematicians chose clean bookkeeping. Definitions in mathematics are decisions, made so that the theorems come out simple.",
        "Everything else in this chapter flows from a tension you can feel within the first hundred numbers. Locally, the primes look chaotic: 23 and 29 are prime but nothing between them is, then 31 arrives immediately. Globally, as we will see, they obey laws of startling precision. Both faces are real, and the whole subject lives in the gap between them.",
      ],
      anums: ["A000040", "A001359", "A000720"],
      figure: {
        kind: "residue-wheel",
        params: {
          terms: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89],
        },
        caption:
          "The first 24 primes dropped onto a mod 25 wheel: after 5 itself, no prime ever lands on a cell divisible by 5, because atoms of multiplication share no factors. Tap to step through and hear each landing.",
      },
    },
    {
      id: "prime-euclid",
      title: "There is no last prime",
      body: [
        "The oldest theorem in this book, and still among the most beautiful, appears as Proposition 20 of Book IX of Euclid's Elements, around 300 BC: there are more primes than any finite collection can hold [1].",
        "Euclid's argument, in modern dress, takes three sentences. Suppose someone hands you a finite list of primes, any list at all, say 2, 3, and 7. Multiply them together and add one: 2 × 3 × 7 + 1 = 43.",
        "This new number leaves remainder 1 when divided by every prime on the list, so whatever primes divide it, and every number above 1 has at least one prime divisor, they must be new ones missing from the list. Here 43 is itself a new prime. No finite list can be complete, so the primes never run out [1].",
        "Two details reward attention. First, folklore often retells this as a proof by contradiction ending with the punchline that the product-plus-one is prime. Euclid claimed no such thing, and it can be false: 2 × 3 × 5 × 7 × 11 × 13 + 1 = 30031 = 59 × 509, not prime. The argument only needs its prime divisors to be new, which they always are.",
        "Second, the proof is constructive in spirit: it does not merely insist more primes exist somewhere, it tells you where to look. Twenty-three centuries later, the argument still gets taught on the first day, because nobody has found a shorter path to an infinite truth [1].",
      ],
    },
    {
      id: "prime-distribution",
      title: "How the primes thin out",
      body: [
        "Primes become rarer as numbers grow, and the remarkable fact is that they do so on schedule. Near a large number n, roughly one number in every ln n, the natural logarithm, is prime: around a million, about 1 in 14; around a trillion, about 1 in 28. Equivalently, the nth prime sits near n × ln n, and the count of primes up to n, a quantity important enough to have its own name, π(n), grows like n / ln n. This is the prime number theorem, conjectured from tables by the teenage Gauss around 1792 and finally proved a century later, in 1896, by Jacques Hadamard and Charles de la Vallée Poussin, working independently [2].",
        "Sit with the strangeness of that. No formula predicts whether tomorrow's number is prime; primality feels like a coin flip weighted by 1 / ln n. Yet averaged over any long stretch, the flips obey the logarithm law so faithfully that Don Zagier, in a famous lecture on the first 50 million primes, could describe the two facts he wanted engraved in his audience's hearts: lawless in the small, lawful in the large [2].",
        "The tension is not a temporary embarrassment awaiting better mathematics. It appears to be what the primes are.",
      ],
      figure: {
        kind: "term-plot",
        params: {
          terms: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281],
          label: "The nth prime",
        },
        caption:
          "The first 60 primes on a log scale: the curve keeps flattening as it climbs, the primes thinning to about one in every ln n, far slower growth than any exponential.",
      },
      quote: {
        text: "The prime numbers grow like weeds among the natural numbers, seeming to obey no other law than that of chance, and yet they exhibit stunning regularity, and obey their laws with almost military precision.",
        attribution: "Don Zagier, The First 50 Million Prime Numbers, 1977 (condensed)",
      },
    },
    {
      id: "prime-gaps",
      title: "Gaps and twins",
      body: [
        "Thinning on average says nothing about any particular gap, and the gaps misbehave in both directions. They can be as long as you like: the run of numbers from 101! + 2 up to 101! + 101, where 101! means the product of everything from 1 to 101, contains one hundred consecutive composites, since 101! + k is plainly divisible by k. Deserts of any length exist, and yet the very next number after a desert can be prime.",
        "In the other direction, primes sometimes crowd as closely as parity permits: pairs like 11 and 13, 29 and 31, 101 and 103, separated by just two. The twin prime conjecture says such pairs never run out, and it is one of the oldest unsolved problems in mathematics, easy enough to explain to a child, resistant to every tool yet invented. The largest known twin pair has hundreds of thousands of digits, and the pairs keep being found, but infinitude remains unproven.",
        "Then, in 2013, came one of the great shocks of modern number theory. Yitang Zhang, a University of New Hampshire lecturer then virtually unknown to the research community, proved that some gap size below 70 million occurs between primes infinitely often [3]. Seventy million is a comically large stand-in for the hoped-for two, but the point was the barrier itself: no finite bound of any size had ever been established.",
        "Within a year, a public online collaboration, the Polymath project, joined by a new method of James Maynard, drove the bound from 70 million down to 246, where it has stood for over a decade [3]. From 246 to 2 is the remaining distance to the twin prime conjecture. The tools that got this far are known to fall short of finishing; something new is required, and nobody knows what.",
      ],
      figure: {
        kind: "term-plot",
        params: {
          terms: [1, 2, 2, 4, 2, 4, 2, 4, 6, 2, 6, 4, 2, 4, 6, 6, 2, 6, 4, 2, 6, 4, 6, 8, 4, 2, 4, 2, 4, 14, 4, 6, 2, 10, 2, 6, 6, 4, 6, 6, 2, 10, 2, 4, 2, 12, 12, 4, 2, 4, 6, 2, 10, 6, 6, 6, 2, 6, 4, 2],
          label: "Gaps between consecutive primes",
        },
        caption:
          "The gaps between the first 61 primes: every dip to 2 is a twin prime pair, the spike of 14 after 113 is a desert, and no simple law governs the jagged line in between.",
      },
    },
    {
      id: "prime-see",
      title: "See it",
      body: [
        "In 1963, the mathematician Stanisław Ulam sat through a long and boring conference talk doodling on paper: he wrote the numbers in a square spiral, 1 at the center, counting outward, and circled the primes. What he saw startled him enough to run computer experiments afterward with Myron Stein and Mark Wells at Los Alamos: the primes are not sprinkled evenly across the spiral but pile up along diagonal streaks [4].",
        "The streaks have an explanation, though not a complete one. Every diagonal of the spiral corresponds to a quadratic formula, something of the shape 4n² + bn + c, so a prime-rich diagonal is a quadratic that produces many primes. That such formulas exist has been known since Euler exhibited the uncanny n² + n + 41, which yields a prime for every n from 0 through 39.",
        "Why certain quadratics are so much richer than others connects to deep conjectures of Hardy and Littlewood from the 1920s, and here honesty requires an admission: to this day, not a single quadratic formula has been proved to produce infinitely many primes. The streaks in the spiral are, in the strict sense, an unexplained observation [4].",
        "This app draws the Ulam spiral live. Open the prime sequence and switch to the spiral view: the diagonals assert themselves within a few hundred terms, and they persist however far you zoom out. It is a rare thing, an open research problem you can see. The mod grid view offers a complementary look: primes above 3 crowd into just a few remainder columns, since the others are claimed by small divisors, a fact called Dirichlet's theorem in its strong form, which guarantees every eligible column holds infinitely many primes.",
      ],
      figure: {
        kind: "ulam-mini",
        params: { highlightDiagonal: true },
        caption:
          "The numbers 1 to 400 on Ulam's spiral, primes drawn as filled squares: they pile along diagonal streaks like the two highlighted, and every diagonal is a quadratic formula that no one has proved keeps producing primes forever.",
      },
    },
    {
      id: "prime-crypto",
      title: "In the real world",
      body: [
        "Every secure connection your phone makes leans on an asymmetry the primes provide. Multiplying two 300-digit primes together is instant. Starting from their 600-digit product and recovering the two factors is, as far as anyone can publicly demonstrate, computationally hopeless: the best known algorithms would need geological time. Easy one way, hopeless in reverse: that is the raw material of a trapdoor [5].",
        "The RSA cryptosystem, published by Rivest, Shamir, and Adleman in 1978, turned the trapdoor into public-key cryptography: your device publishes the product as a public key anyone can use to encrypt messages to you, while the factors, kept private, are what decrypting requires [5]. The scheme needs a steady supply of enormous random primes, and here the prime number theorem does quiet industrial labor: among 300-digit numbers, roughly one in every 690 is prime, so a computer can simply pick random candidates and test them, expecting a quick win. The testing itself is fast thanks to clever primality checks that decide 600-digit cases in milliseconds without ever attempting to factor, an asymmetry that is the entire point: telling that a number is composite turns out to be vastly easier than exhibiting its factors.",
        "One honest caveat belongs in every account of this subject. The hardness of factoring is an empirical observation, not a theorem; no proof exists that a fast factoring algorithm is impossible. And on a large-scale quantum computer, Peter Shor's 1994 algorithm would factor quickly, which is why standards bodies have already published post-quantum replacement schemes and begun the long migration. The primes secured half a century of digital life; whether they keep the job is an open engineering question layered on an open mathematical one [5].",
      ],
    },
    {
      id: "prime-greentao",
      title: "Order out of chaos",
      body: [
        "Given the local lawlessness, theorems that extract exact patterns from the primes feel almost illicit. The showpiece of the modern era: in 2004, Ben Green and Terence Tao proved that the primes contain arithmetic progressions of every finite length, evenly spaced runs like 5, 11, 17, 23, 29, five primes marching by sixes [6].",
        "Want ten primes in a row, each exactly the same distance from the next? They exist. A thousand? They exist. The proof is a landmark because it wrings structure from a set defined by what it excludes, and it helped earn Tao a Fields Medal.",
        "It is also a striking specimen of pure existence: the argument guarantees long progressions without locating them, and while computer searches have found progressions of 27 primes, no explicit progression of, say, 50 has ever been written down. We know they are out there the way astronomers know unseen planets are: the mathematics leaves them nowhere to hide [6].",
      ],
    },
    {
      id: "prime-open-door",
      title: "An open door",
      body: [
        "Above every question in this chapter hangs the Riemann hypothesis, and it can be stated honestly without a single formula. In 1859, Bernhard Riemann connected the primes to a smooth function of the continuous number line, the zeta function, showing that the primes' deviations from the prime number theorem's schedule are governed by where that function equals zero. He observed that all the zeros he could find lie on a single vertical line in the plane, and he remarked, almost in passing, that it would be desirable to prove this always holds. That remark is the most famous open problem in mathematics [2].",
        "What it would buy is precision: the hypothesis is equivalent to saying the primes stray from their schedule no more than square-root-sized fluctuations allow, the same law of errors a fair coin obeys. Computers have checked trillions of zeros, every one on the line; a million-dollar Clay Millennium Prize has waited since 2000; and the problem has swallowed careers whole. A proof would not just settle a formula, it would certify that the chaos of the primes is exactly the size of chance, and no larger [2].",
        "The frontier is wide open at every altitude. Goldbach's conjecture, that every even number above 2 is a sum of two primes, has been verified into the quintillions and proved for no general case. Nobody knows whether infinitely many primes are one more than a perfect square.",
        "Nobody knows whether the Mersenne primes, the primes one less than a power of two that underlie the largest known primes, go on forever; the current record holder, discovered by a volunteer computing project in 2024, has 41,024,320 digits, and there is no theorem promising a next one. Twenty-three centuries after Euclid, the atoms of multiplication still keep their deepest habits to themselves. The sequences below are the raw material; the app will draw and play them for as long as you care to look and listen.",
      ],
      links: [
        { label: "Prime numbers, OEIS A000040", url: "https://oeis.org/A000040" },
        { label: "Twin primes, OEIS A001359", url: "https://oeis.org/A001359" },
        { label: "NIST Digital Signature Standard", url: "https://csrc.nist.gov/pubs/fips/186-5/final" },
        { label: "Clay Mathematics Institute, the Riemann Hypothesis", url: "https://www.claymath.org/millennium/riemann-hypothesis/" },
      ],
    },
  ],
  citations: [
    "Euclid, Elements, Book IX, Proposition 20. In T. L. Heath, The Thirteen Books of Euclid's Elements, Vol. 2. Cambridge University Press, 1908.",
    "D. Zagier, \"The First 50 Million Prime Numbers\". The Mathematical Intelligencer 1, 1977, pp. 7-19.",
    "Y. Zhang, \"Bounded Gaps Between Primes\". Annals of Mathematics 179(3), 2014, pp. 1121-1174.",
    "M. L. Stein, S. M. Ulam, M. B. Wells, \"A Visual Display of Some Properties of the Distribution of Primes\". American Mathematical Monthly 71(5), 1964, pp. 516-520.",
    "R. L. Rivest, A. Shamir, L. Adleman, \"A Method for Obtaining Digital Signatures and Public-Key Cryptosystems\". Communications of the ACM 21(2), 1978, pp. 120-126.",
    "B. Green, T. Tao, \"The Primes Contain Arbitrarily Long Arithmetic Progressions\". Annals of Mathematics 167(2), 2008, pp. 481-547.",
  ],
};
