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
        "The rabbit puzzle itself is a cheerful fiction. Leonardo's rabbits never die, always produce exactly one mixed pair, and mature on a fixed schedule. No population on Earth behaves this way, and Leonardo surely knew it. The puzzle was a worked example in a textbook, one exercise among hundreds, meant to show off calculation with the new Hindu-Arabic numerals he was championing to a Europe still doing arithmetic on Roman numerals and counting boards [1]. The book's real legacy is the digits you use every day. The rabbits were a footnote that outgrew the book.",
        "Leonardo was not even first. Centuries earlier, scholars of Sanskrit prosody in India studied the ways a line of poetry can be built from short syllables lasting one beat and long syllables lasting two. Count the patterns for a line of n beats and you get exactly this sequence: Virahanka stated the rule around the eighth century, and Hemachandra wrote it out clearly about fifty years before Leonardo was born [3]. Mathematics keeps no borders; the same idea surfaces wherever someone counts something built from steps of size one and two.",
      ],
      anums: ["A000045"],
    },
    {
      id: "fibonacci-golden",
      title: "The golden thread",
      body: [
        "Divide any term by the one before it and the ratios settle toward the golden ratio, φ = (1 + √5) / 2 ≈ 1.618. Binet's closed form writes every term directly in powers of φ [2], which is why the sequence and the ratio keep turning up in the same places.",
        "Watch the convergence happen: 8/5 = 1.6, then 13/8 = 1.625, then 21/13 ≈ 1.615, then 34/21 ≈ 1.619. The ratios overshoot and undershoot, closing in from both sides. Kepler noticed this four centuries ago, in a little book about why snowflakes have six corners.",
        "Why φ? Suppose the ratios settle down to some limit x at all. Dividing the recurrence a(n) = a(n−1) + a(n−2) through by a(n−1) says that x must satisfy x = 1 + 1/x, and the positive solution of that equation is exactly (1 + √5) / 2. The golden ratio is not decoration here; it is the only number the rule allows.",
        "That same equation, x = 1 + 1/x, can be fed into itself forever: φ equals 1 plus 1 over 1 plus 1 over 1 plus... continuing without end. Every entry in this continued fraction is a 1, the smallest possible, and a theorem of number theory says this makes φ the irrational number that rational fractions approximate worst [2]. Mathematicians affectionately call it the most irrational number. Hold that thought; it is the honest core of the sunflower story below.",
      ],
      quote: {
        text: "As 5 is to 8, so is 8 to 13, practically, and as 8 is to 13, so is 13 to 21, almost.",
        attribution: "Johannes Kepler, On the Six-Cornered Snowflake, 1611",
      },
    },
    {
      id: "fibonacci-binet",
      title: "A formula for the nth term",
      body: [
        "The recurrence forces you to climb the sequence one rung at a time. Binet's formula lets you jump: F(n) = (φⁿ − ψⁿ) / √5, where ψ = (1 − √5) / 2 ≈ −0.618 is φ's neglected twin, the other root of the same equation [2].",
        "The formula looks like a magic trick. It stirs together two irrational numbers, divides by a third, and lands exactly on a whole number every single time. The trick is that ψ has absolute value less than 1, so ψⁿ shrivels toward zero as n grows. For n ≥ 1 its contribution is already so small that F(n) is simply φⁿ / √5 rounded to the nearest whole number. The tenth term: φ¹⁰ / √5 ≈ 55.004, and indeed F(10) = 55.",
        "Two honest asides. First, the formula is named for Jacques Binet, who published it in 1843, but Abraham de Moivre knew it more than a century earlier, in the 1730s [2]. Mathematical credit is a lottery. Second, Binet's formula is a beautiful way to understand growth and a poor way to compute: for large n the rounding demands enormous precision. Real software uses clever identities that let F(2n) be built directly from F(n), doubling the index at each step [2]. What the formula does tell you at a glance is the growth law: Fibonacci numbers grow exponentially, multiplying by roughly 1.618 per step, which is why every plot of them in this app bends upward so unrelentingly.",
      ],
    },
    {
      id: "fibonacci-lucas",
      title: "The companion sequence",
      body: [
        "Change nothing about the rule and everything about the start. Begin with 2 and 1 instead of 0 and 1 and you get the Lucas numbers: 2, 1, 3, 4, 7, 11, 18, 29, 47, ... [4]. Same recurrence, same golden growth, different DNA.",
        "The two sequences are entangled at every level. Where Fibonacci obeys F(n) = (φⁿ − ψⁿ) / √5, Lucas obeys the even cleaner L(n) = φⁿ + ψⁿ, no square root needed [4]. Multiply corresponding terms and you land back inside Fibonacci: F(n) · L(n) = F(2n). Check it: F(5) = 5, L(5) = 11, and F(10) = 55.",
        "Édouard Lucas, the nineteenth-century French mathematician the companion is named for, is also the person who attached Fibonacci's name to the original sequence, six centuries after Liber Abaci [4]. He was a connoisseur of computation: he invented the Tower of Hanoi puzzle, and he used properties of his sequences to prove by hand in 1876 that the 39-digit number 2¹²⁷ − 1 is prime. That remains the largest prime ever verified by unaided human calculation, and the test he pioneered, later refined by Lehmer, is essentially the one computers still use to hunt record Mersenne primes today [4].",
      ],
      anums: ["A000032"],
    },
    {
      id: "fibonacci-zeckendorf",
      title: "A number system built from Fibonacci",
      body: [
        "Here is a theorem that sounds too tidy to be true. Every positive integer can be written as a sum of Fibonacci numbers in which no two are consecutive, and there is exactly one way to do it [2]. Take 100: the largest Fibonacci number that fits is 89, leaving 11; the largest that fits in 11 is 8, leaving 3, itself a Fibonacci number. So 100 = 89 + 8 + 3, and no other non-consecutive selection works.",
        "The greedy strategy, always grab the largest term that fits, succeeds every time, and the non-consecutive condition is what makes the answer unique. This is called Zeckendorf's theorem, and it turns the Fibonacci sequence into a genuine positional number system, a cousin of binary in which the place values are 1, 2, 3, 5, 8, 13, ... instead of powers of two, with the house rule that no two adjacent places may both hold a 1 [2].",
        "The name is its own small lesson in folklore. Édouard Zeckendorf, a Belgian army doctor who did mathematics on the side, published the theorem in 1972, but the Dutch mathematician Gerrit Lekkerkerker had already published a proof in 1952, and Zeckendorf maintained he had known it since 1939 [2]. The name stuck anyway. Attribution in mathematics rewards many things; being first is only sometimes one of them.",
        "The tidy theorem earns its keep. Fibonacci coding uses Zeckendorf representations to encode numbers as bit strings in which the pattern 11 appears only as a terminator, giving compression schemes that recover gracefully from corrupted data. Fibonacci numbers also mark the worst case of Euclid's ancient algorithm for greatest common divisors: consecutive Fibonacci numbers are precisely the inputs that force it to grind through the most steps, a fact proved by Gabriel Lamé in 1844 and sometimes counted as the first computational complexity result in history [2].",
      ],
    },
    {
      id: "fibonacci-pisano",
      title: "Numbers in a loop",
      body: [
        "Look only at the last digit of each Fibonacci number: 0, 1, 1, 2, 3, 5, 8, 3, 1, 4, 5, 9, ... The digits wander, seem patternless, and then, exactly 60 steps in, the pair 0, 1 reappears and the whole show repeats from the top. The last digits of the Fibonacci numbers cycle forever with period 60 [5].",
        "This is no accident of base ten. Reduce the sequence modulo any number m, that is, keep only remainders after dividing by m, and it must eventually repeat: there are only m² possible pairs of consecutive remainders, so some pair recurs, and since each term is determined by the two before it (and, running the rule backwards, each term determines the one before it), the sequence is locked into a perfect cycle from the very start. Modulo 2 the period is 3: even, odd, odd, even, odd, odd, so every third Fibonacci number is even. Modulo 3 the period is 8. These cycle lengths are called Pisano periods, after Leonardo Pisano himself, and their systematic study was opened by D. D. Wall in 1960 [5].",
        "The Pisano periods form a sequence of their own, and a strange one: 1, 3, 8, 6, 20, 24, 16, 12, 24, 60, ... No simple formula for it is known. Wall asked an innocent-sounding question that is still open more than sixty years later: is the period modulo p² always longer than the period modulo p, for every prime p? Every prime ever checked, into the trillions, says yes, but nobody can prove it [5].",
        "You can hear all of this in the app. The sonification plays each term modulo the number of notes in a scale, which is exactly a Pisano reduction. Play the Fibonacci sequence and you are not hearing a stream of ever-larger numbers; you are hearing a finite melody, looping. Change the scale size and you change the modulus, so the melody and its length change with it. The periodicity that took mathematicians centuries to articulate is audible within a minute.",
      ],
      anums: ["A001175"],
    },
    {
      id: "fibonacci-see",
      image: {
        ...WIKI_IMAGES.sunflower,
        caption:
          "A sunflower packs seeds at the golden angle, about 137.5°. Count the spirals and you often find consecutive Fibonacci numbers, such as 34 and 55, though real flowers do not always comply [6].",
      },
    },
    {
      id: "fibonacci-phyllotaxis",
      title: "The sunflower, honestly",
      body: [
        "The claim you have heard is that nature loves Fibonacci: count the spirals in a sunflower head, a pinecone, or a pineapple and you find consecutive Fibonacci numbers. The claim is real, but it deserves to be told with its caveats attached, because the honest version is better science and a better story.",
        "First, the mechanism. New primordia, the nubs that become seeds or leaves, emerge one at a time at a growing tip, each rotated from the last by about 137.5°, the golden angle, which is the full circle divided in the golden ratio. Because φ is the most irrational number, this angle never settles into a repeating spoke pattern; each new primordium lands in the least crowded gap available, and the eye, connecting near neighbors, traces two families of spirals whose counts are consecutive Fibonacci numbers. In 1992, the physicists Douady and Couder built the pattern with no biology at all: magnetized droplets dripping onto a dish, repelling each other while drifting outward, spontaneously fell into golden-angle spirals. The arrangement is not a designer's flourish but the signature of a simple packing process, and mathematical models show the Fibonacci spirals emerging robustly across a wide range of growth rates [6].",
        "Second, the data. In 2016, a citizen science project begun for Alan Turing's centenary published spiral counts for 657 real sunflowers, the largest survey ever conducted. The verdict: among 768 reliably countable spiral families, 565, about 74 percent, were Fibonacci numbers, and another 67 fit closely related patterns, such as Lucas numbers or doubled Fibonacci numbers [6]. That is a strong signal. It is also one in five flowers declining to follow the script, with some heads showing counts like 56 or 77 that fit no tidy sequence at all. Turing himself, who spent his last years working on the mathematics of plant patterns, would likely have cared more about the exceptions than the conformists: the flowers that break the rule are the ones that test which model of growth is actually right [6].",
        "So the sunflower story survives scrutiny, scaled honestly: Fibonacci spirals are the strong default of a real packing mechanism, not an iron law of nature. Most popular retellings skip the 26 percent. You now know better.",
      ],
    },
    {
      id: "fibonacci-myths",
      title: "Myths of the golden ratio",
      body: [
        "Success breeds mythology, and no number has a thicker file of myths than φ. The golden ratio is claimed to govern the Parthenon, the Great Pyramid, the Mona Lisa, the nautilus shell, and the proportions of the ideal human body. Nearly all of these claims dissolve on inspection [3].",
        "The Parthenon case is typical. Overlay a golden rectangle on a photograph and it fits, if you choose which ledge to start from and whether to include the pediment. Choose differently and it does not. No document from ancient Greece connects the building to the ratio; the aesthetic claims date from the mid-1800s, more than two millennia after construction [3]. The Great Pyramid claims rest on similar cherry-picking among its many measurable ratios, some of which land near φ by arithmetic accident. The nautilus shell is a genuine logarithmic spiral, but a measured one: its chambers grow by a factor of roughly 1.3 per quarter turn, visibly flatter than a golden spiral, as anyone with a shell and a ruler can confirm [3].",
        "Even the psychology is shaky. Gustav Fechner's famous 1876 experiments, endlessly cited as proof that people prefer golden rectangles, have repeatedly failed to replicate cleanly; preferences scatter across a broad range of pleasant-looking rectangles with no sharp peak at 1.618 [3].",
        "What survives is worth more than what dissolves. The golden ratio genuinely rules the geometry of the regular pentagon and the five-pointed star, where it appears as the ratio of diagonal to side; Euclid computed with it under the name division in extreme and mean ratio around 300 BC, and it is the reason no flat floor can be tiled by regular pentagons [3]. It genuinely emerges in phyllotaxis, with the honest caveats of the previous section. And it genuinely governs the growth of this sequence, as Binet's formula shows. A number this good needs no forged credentials.",
      ],
    },
    {
      id: "fibonacci-coda",
      body: [
        "Strip away the rabbits and the myths and what remains is the point: an utterly simple rule, add the last two, that generates golden ratios, number systems, looping melodies, spiral flowers, and open problems that have outlasted every mathematician who touched them. That is the recurring miracle of sequences, and it is why this one gets a chapter of its own. Open A000045 in the app, set it looping in the sonification, and listen to a piece of mathematics that was already old when it reached Pisa in 1202.",
      ],
    },
  ],
  citations: [
    "L. E. Sigler, Fibonacci's Liber Abaci: A Translation. Springer, 2002.",
    "R. Graham, D. Knuth, O. Patashnik, Concrete Mathematics, 2nd ed. Addison-Wesley, 1994, §6.6.",
    "M. Livio, The Golden Ratio. Broadway Books, 2002.",
    "J. H. Conway, R. K. Guy, The Book of Numbers. Copernicus, 1996.",
    "D. D. Wall, \"Fibonacci Series Modulo m\". American Mathematical Monthly 67, 1960, pp. 525-532.",
    "J. Swinton, E. Ochu, MSI Turing's Sunflower Consortium, \"Novel Fibonacci and non-Fibonacci structure in the sunflower: results of a citizen science experiment\". Royal Society Open Science 3, 2016, 160091.",
  ],
};
