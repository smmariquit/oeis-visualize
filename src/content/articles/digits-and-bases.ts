import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "digits-and-bases",
  title: "Digits make patterns",
  summary: "Base ten is an accident of anatomy, and digits still hide real mathematics.",
  icon: "keypad-outline",
  sections: [
    {
      id: "digits-accident",
      body: [
        "Here is a fact so obvious it is easy to never think about: the number thirteen is not \"13\". The number is the quantity; \"13\" is its costume in base ten, the numeral system we use because humans happen to have ten fingers. Dress the same number in base two and it reads 1101. In base sixteen it is D. Nothing about the number changed, only the clothing.",
        "History makes the arbitrariness vivid. The Babylonians ran their mathematics in base sixty, and we still live inside their choice every time we read a clock (60 minutes) or a compass (360 degrees). The Maya used base twenty. Several natural languages carry traces of counting in twenties (quatre-vingts, four twenties, is French for eighty), and linguists have documented the Yuki people of California counting in base eight, using the spaces between fingers rather than the fingers themselves.",
        "Computers, famously, use base two. If dolphins did arithmetic, they would not use base ten, and none of mathematics would care: primality, divisibility, being a perfect square, all of it is independent of the costume. A case can even be made that ten is a mediocre choice; twelve, with divisors 2, 3, 4, and 6, makes far friendlier fractions, which is roughly why dozens and sixties dominated ancient bookkeeping.",
      ],
    },
    {
      id: "digits-notation",
      title: "Numerals are inventions",
      body: [
        "Even the way we write digits is an invention with a history, not a given. Positional notation, where a digit's place tells you its weight, was a Babylonian idea perfected in India, where the crucial invention of a symbol for zero made the system complete.",
        "Europe ran on Roman numerals until Leonardo of Pisa, the same Fibonacci from the earlier article, spent his youth in North African counting houses, saw the Hindu-Arabic system at work, and opened his 1202 book Liber Abaci by teaching it, arguing that with these nine digits and the sign 0 any number can be written. It took centuries more for merchants to trust the new numerals. Everything below about digit patterns is downstream of that adoption: change the notation and different patterns become visible or invisible.",
      ],
    },
    {
      id: "digits-oeis",
      title: "Digit sequences in the OEIS",
      body: [
        "So why does a serious mathematical database like the OEIS contain thousands of sequences about digits? Because once you fix a base, the numeral system becomes a genuine mathematical object with its own structure, its own theorems, and, as you will see below, its own scandalously unsolved problems. The OEIS is careful about the distinction: sequences whose definition depends on the chosen base carry the keyword \"base\", quarantining the costume from the body.",
        "The simplest digit sequences take a number and read something off its numeral: the digit sum (A007953), the number reversed (A004086), the leading digit (A000030). These look like idle games until they start connecting to real structure. The digit sum, for instance, governs the ancient test for divisibility by nine, because 10 leaves remainder 1 when divided by 9, so every digit contributes itself, and only itself, to the remainder. That is a theorem about base ten, honest mathematics about the costume.",
        "The star of digit-defined sequences is Thue-Morse (A010060): write 0 if a number has an even number of 1s in its binary numeral, 1 if odd. It begins 0, 1, 1, 0, 1, 0, 0, 1, and you can generate it by repeatedly copying the block so far and appending its bitwise flip. It never becomes periodic, yet a machine that only reads binary digits produces it, which makes it the flagship example of an automatic sequence, a whole class studied in depth by Allouche and Shallit [6]. Thue-Morse is also the fairest known way to take turns: the sharing order ABBA BAAB balances out first-mover advantage at every scale.",
        "And digit games can lead to entirely serious mathematics. The look-and-say sequence starts at 1 and each term reads the previous one aloud: 1, 11 (\"one 1\"), 21 (\"two 1s\"), 1211, 111221, 312211. It looks like a children's riddle.",
        "John Conway analyzed it and found something absurdly deep: the term lengths grow by a fixed factor, now called Conway's constant, approximately 1.3036, which is an algebraic number, the root of a specific polynomial of degree 71. A rule about reading digits aloud secretly encodes a degree-71 polynomial. That is the recurring joke of this whole subject, and by now you can see it coming.",
        "Sequences like these are the cleanest evidence that \"digit mathematics\" is not a contradiction. The base is arbitrary, but once fixed, it induces real structure, and that structure can be deep.",
      ],
      figure: {
        kind: "term-plot",
        params: {
          terms: [
            1, 2, 2, 4, 6, 6, 8, 10, 14, 20, 26, 34, 46, 62, 78, 102, 134, 176, 226,
            302, 408, 528, 678, 904, 1182,
          ],
          label: "look-and-say term lengths",
        },
        caption:
          "Lengths of the first 25 look-and-say terms: the nearly straight climb on this log scale is Conway's constant at work, each term about 1.3036 times longer than the last.",
      },
      anums: ["A007953", "A004086", "A010060", "A005150"],
    },
    {
      id: "digits-palindromes",
      title: "Palindromes and repunits",
      body: [
        "A palindrome reads the same forwards and backwards: 121, 3443, 9. The palindromes form OEIS entry A002113, and they come with a tidy provable fact: every palindrome with an even number of digits is divisible by 11. (The alternating-sum test for 11 cancels perfectly when the digits mirror.) One consequence: 11 is the only palindromic prime with an even number of digits.",
        "Palindromes also host a genuinely open problem you can attack with grade-school arithmetic. Take a number, reverse it, add the two, and repeat. Most numbers hit a palindrome fast: 59 + 95 = 154, 154 + 451 = 605, 605 + 506 = 1111. But 196 has been pushed through millions of iterations, producing numbers millions of digits long, without ever reaching a palindrome.",
        "Numbers suspected of never getting there are called Lychrel numbers (A023108), and here is the embarrassing part: nobody has proved that even a single Lychrel number exists in base ten. 196 probably never reaches a palindrome, and nobody can prove it.",
        "The repunits are the numbers written with only 1s: 1, 11, 111, 1111, in general $R_n = (10^n - 1)/9$. When is a repunit prime? A quick argument shows $R_n$ can only be prime if n itself is prime (if n factors, the numeral factors visibly: 111111 splits into 111 times 1001). But that is far from sufficient, and the primes are astonishingly rare.",
        "The known repunit primes have n = 2, 19, 23, 317, and 1031, with the last proved prime by Williams and Dubner in 1986 [5]; the candidates n = 49081, 86453, 109297, and 270343 were later found as probable primes, and the first two were finally certified prime in 2022 and 2023 with elliptic curve methods. It is conjectured, but not proved, that infinitely many repunit primes exist. Notice how thoroughly base-dependent all this is: in binary, the repunits are the Mersenne numbers $2^n - 1$, a different celebrated family with its own centuries of literature.",
      ],
      anums: ["A002113", "A023108", "A004023"],
      links: [
        { label: "Repunit primes, OEIS A004023", url: "https://oeis.org/A004023" },
      ],
    },
    {
      id: "digits-benford",
      title: "Benford's law: the first digit is not fair",
      body: [
        "Pick a huge messy pile of real-world numbers: populations of towns, lengths of rivers, invoice amounts, physical constants. What fraction should start with the digit 1? Intuition says one ninth, about 11%. Reality says just over 30%. Leading digits follow a logarithmic distribution, with digit d appearing first with probability $\\log_{10}(1 + 1/d)$: 30.1% for 1, down to 4.6% for 9.",
        "The astronomer Simon Newcomb noticed this in 1881, from physical wear: the front pages of shared logarithm books, the pages for numbers starting with 1, were visibly grubbier than the back pages [1]. The physicist Frank Benford rediscovered the law in 1938 and documented it across more than 20,000 measurements, from river areas to death rates, and the law took his name [2].",
        "Why does it happen? The honest modern explanation, made rigorous by Theodore Hill in 1995, has two parts [3]. First, the law is the unique distribution that is scale-invariant: if leading digits have any universal distribution at all, it must survive converting dollars to euros or miles to kilometers, and only the logarithmic distribution does.",
        "Second, Hill proved a central-limit-style theorem: if you sample from many different distributions chosen without bias and pool the results, the pooled leading digits converge to Benford's law. That is exactly the situation of accounting ledgers and almanac data, which mix many quantities on many scales. The law applies to data spanning several orders of magnitude and born of multiplicative growth; it does not apply to tightly clustered data (adult heights in centimeters) or assigned numbers (phone numbers, zip codes).",
        "Two consequences are worth knowing. Practically, deviations from Benford's law are used in forensic accounting to flag fabricated figures, a practice developed by Mark Nigrini; people inventing numbers unconsciously spread first digits too evenly. It is a flag for auditors, not a proof of fraud, and it is misused whenever someone treats a Benford deviation alone as conviction-grade evidence.",
        "Mathematically, some sequences in this app provably obey Benford's law: the Fibonacci numbers and the powers of 2 both do, because their logarithms march in irrational steps that spread uniformly around the unit circle. Pull up Fibonacci and tally the first digits yourself; the skew is visible within thirty terms.",
      ],
      quote: {
        text: "That the ten digits do not occur with equal frequency must be evident to any one making much use of logarithmic tables, and noticing how much faster the first pages wear out than the last ones.",
        attribution: "Simon Newcomb, American Journal of Mathematics, 1881",
      },
      figure: {
        kind: "benford-bars",
        caption:
          "First digits of 80 Fibonacci numbers against the dashed Benford curve: tap Powers of 2 and Uniform to see which datasets obey the law and which refuse.",
      },
      anums: ["A000030", "A000045", "A000079"],
    },
    {
      id: "digits-normal",
      title: "Normal numbers, and what we do not know about pi",
      body: [
        "Call a number normal in base ten if, in its decimal expansion, every digit appears one tenth of the time, every two-digit block one hundredth of the time, and so on for blocks of every length: its digits are statistically indistinguishable from fair rolls of a ten-sided die. Émile Borel proved in 1909 that almost every real number is normal, in the precise sense that the exceptions have measure zero [4]. Pick a real number truly at random and, with probability one, it is normal in every base at once.",
        "Now for one of the strangest gaps in mathematics: although almost all numbers are normal, essentially none of the numbers anyone actually cares about is known to be. Is $\\pi$ normal? Unknown. Is e? Unknown. $\\sqrt{2}$, $\\ln 2$? Unknown, in every base.",
        "The ignorance runs deeper than most people believe: it has never been proved that the digit 7 appears infinitely often in the decimal expansion of $\\pi$. Nothing anyone has proved rules out the possibility that after some far-off point, $\\pi$'s expansion abandons the digit 7 entirely. No mathematician believes that, but belief is not the standard.",
        "The empirical evidence, for what it is worth, is enormous: trillions of digits of $\\pi$ have been computed, and every statistical test finds the digits behaving like a perfect random stream. After the last section, you know exactly how much that proves. It is Collatz-style evidence: overwhelming, and worth nothing as proof. The digits of $\\pi$ are in this app as A000796; run them through the visualizations and the sound engine and you will hear precisely why \"indistinguishable from noise\" is the technical impression.",
      ],
      figure: {
        kind: "residue-wheel",
        params: { seq: "A000796" },
        caption:
          "The digits of pi, one tap at a time: step around the wheel and watch the landings scatter with no favorite cell, exactly the statistical blandness normality demands.",
      },
      anums: ["A000796"],
    },
    {
      id: "digits-champernowne",
      title: "Champernowne: normality made to order",
      body: [
        "If we cannot prove normality for any natural constant, can we at least exhibit some normal number concretely? Yes, by cheating with intent. In 1933 the economist David Champernowne, then an undergraduate at Cambridge, wrote down the number 0.123456789101112131415..., formed by concatenating the positive integers, and proved it is normal in base ten [5]. Every digit block of every length appears with exactly the fair frequency, provably, because every block of digits is eventually forced to appear inside the integers being glued on.",
        "The construction generalizes: concatenating the primes, 0.235711131719..., also gives a number normal in base ten, a result of Copeland and Erdős from 1946. But the fine print restores humility. Champernowne's constant is proved normal in base ten only; whether it is normal in, say, base two is open. We can manufacture normality in a chosen base, but we cannot yet certify it for a single number that mathematics handed us naturally, nor carry it from one base to another.",
        "That is the honest state of digits and bases, and it is a fitting place to end. Base ten is an accident of anatomy. The properties that survive changing the costume, primality, divisibility, growth, are the deep ones.",
        "And yet the costume itself generates real theorems, real applications, and questions, 196, repunit primes, the normality of $\\pi$, that have outlasted every attempt to answer them. The digit expansion of Champernowne's constant is in the OEIS as A033307; it makes a memorable listen, a voice slowly counting in pitches.",
      ],
      anums: ["A033307"],
      links: [
        { label: "Champernowne constant digits, OEIS A033307", url: "https://oeis.org/A033307" },
        { label: "Lychrel candidates, OEIS A023108", url: "https://oeis.org/A023108" },
      ],
    },
  ],
  citations: [
    "S. Newcomb, Note on the frequency of use of the different digits in natural numbers, American Journal of Mathematics 4 (1881), 39-40.",
    "F. Benford, The law of anomalous numbers, Proceedings of the American Philosophical Society 78 (1938), 551-572.",
    "T. P. Hill, A statistical derivation of the significant-digit law, Statistical Science 10 (1995), 354-363.",
    "É. Borel, Les probabilités dénombrables et leurs applications arithmétiques, Rendiconti del Circolo Matematico di Palermo 27 (1909), 247-271.",
    "D. G. Champernowne, The construction of decimals normal in the scale of ten, Journal of the London Mathematical Society 8 (1933), 254-260; H. C. Williams and H. Dubner, The primality of R1031, Mathematics of Computation 47 (1986), 703-711.",
    "J.-P. Allouche and J. Shallit, Automatic Sequences: Theory, Applications, Generalizations. Cambridge University Press, 2003.",
  ],
};
