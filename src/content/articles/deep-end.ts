import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "deep-end",
  title: "The deep end",
  summary: "Where to go next: books, the OEIS itself, the exposition community, and how open problems get attacked.",
  icon: "telescope-outline",
  sections: [
    {
      id: "deep-next",
      body: [
        "If the earlier articles did their job, you have watched hailstone numbers spike, heard Fibonacci loop, and sat with a few questions nobody can answer. This last article is a map of what lies past the app: what to read, which university topics touch this material, how the OEIS accepts new knowledge, and how working mathematicians actually chip away at open problems.",
      ],
    },
    {
      id: "deep-lookup",
      title: "Look it up first",
      body: [
        "First, the single most useful research habit this subject offers, stated plainly: whenever any piece of work hands you a sequence of integers, compute the first eight or ten terms and search the OEIS before proving anything. A hit hands you formulas, references, and decades of prior art; a miss on an interesting sequence is an invitation to contribute. The OEIS is not a curiosity cabinet, it is a working instrument, and lookup-before-labor is how thousands of published papers have found their key lemma. For stubborn cases there is even Superseeker, a server that applies dozens of transformations to your terms and searches for the transformed versions too.",
        "The habit is as old as the database, because the database exists precisely because its founder needed it. In 1964 Neil Sloane, then a graduate student studying how information percolates through random tree networks, computed the sequence 0, 1, 8, 78, 944, ... and could not identify it or its growth rate anywhere in the literature [5]. The lookup tool he wanted did not exist, so he started building it, on punched cards.",
        "That sequence sits in the database today as A000435, flagged as the one that started it all, and its entry now carries exactly what young Sloane was missing: a formula, an asymptotic, references, and code. Sixty years of mathematicians hitting the same wall, and one of them decided the wall should be a door.",
      ],
      figure: {
        kind: "term-plot",
        params: {
          terms: [0, 1, 8, 78, 944, 13800, 237432, 4708144, 105822432, 2660215680],
          label: "A000435, where the OEIS began",
        },
        caption:
          "The ten terms that started the OEIS: even on this log scale Sloane's 1964 tree sequence bends upward, the faster-than-exponential growth he could not find in any book.",
      },
      anums: ["A000435"],
      links: [
        { label: "Superseeker (deep search)", url: "https://oeis.org/ol.html" },
      ],
    },
    {
      id: "deep-books",
      title: "A short shelf",
      body: [
        "The OEIS itself began as a book. As a graduate student in 1964, Neil Sloane needed a sequence looked up, found no reference existed, and started a card file that became A Handbook of Integer Sequences in 1973, with 2,372 sequences [5]. The 1995 sequel with Simon Plouffe, The Encyclopedia of Integer Sequences, held 5,487 and became a cult classic on mathematicians' shelves [1]. A year later the collection went online, where it could grow without a binding; it now holds over 370,000 sequences, with Sloane's own retrospective telling the whole story [5]. The books are worth seeing even today, as the fossil record of the database you have been using.",
        "For the machinery, the standard recommendation is Concrete Mathematics by Graham, Knuth, and Patashnik [2]. The title is a manifesto: a blend of CONtinuous and disCRETE, from the Stanford course Knuth began teaching in 1970 as a rebellion against the era's fashion for abstraction, on the theory that students needed techniques for solving actual problems more than they needed another layer of generality. It teaches sums, recurrences, binomial coefficients, and generating functions as tools you can actually compute with, complete with the margin graffiti of the students it was tested on. It is demanding and unusually fun, and nearly every sequence in this app appears somewhere in it.",
        "Two gentler companions. Herbert Wilf's generatingfunctionology teaches the single most powerful idea in this subject (next section) with disarming clarity, and the author made the full text free to download, so it costs exactly nothing to start [3]. Mario Livio's The Golden Ratio is the cultural history of φ, and its greatest service is honest debunking: Livio chases down the claims about golden rectangles in the Parthenon and the Great Pyramid and shows how little evidence supports them, a model of loving a topic without believing its folklore [4].",
      ],
    },
    {
      id: "deep-undergrad",
      title: "The undergraduate on-ramp",
      body: [
        "Two standard university topics turn sequence-watching into sequence-solving. The first is linear recurrences, or difference equations, the discrete cousin of differential equations. Fibonacci's rule $a(n) = a(n-1) + a(n-2)$ has characteristic polynomial $x^2 = x + 1$, whose roots are φ and its conjugate; general theory then hands you Binet's closed formula and the asymptotic $F(n) \\sim \\varphi^n/\\sqrt{5}$ mechanically, no ingenuity required. Every \"why does this grow like that?\" question in the app's compare view is answered by this machinery.",
        "The second is generating functions: pack a whole sequence into a single power series, $F(x) = x/(1 - x - x^2)$ for Fibonacci, and algebra on the series becomes surgery on the sequence. Multiplying by $1/(1-x)$ takes partial sums; partial fractions decompose a sequence into its exponential ingredients; products of series count combinations of structures, which is why generating functions are the native language of combinatorics [3]. The Formula section of most OEIS entries records exactly these objects, so you can learn to read entries the way musicians read scores [2].",
        "With those two tools, the OEIS's web of cross-references starts making sense. Entries are connected by transforms, standard operations like the binomial, Euler, and Möbius transforms, so a sequence you meet in one problem is often a known transform of another; Motzkin, Catalan, and the Riordan numbers form a binomial-transform ladder you can watch directly in the compare view. And the database rewards even purely empirical curiosity: plot how often each integer appears across all of the OEIS and a thin band of oddly under-represented numbers emerges, known as Sloane's gap, a genuine statistical structure in mathematics' collective attention.",
        "If you want a concrete exercise to start tomorrow: pick any counting problem small enough to enumerate by hand, ways to tile a strip with squares and dominoes, ways to parenthesize a product, anything. Compute six terms. Guess the recurrence by looking at differences and ratios, then confirm it in the OEIS and see how your amateur enumeration connects to published mathematics. That loop, enumerate, conjecture, look up, prove, is the actual daily texture of combinatorics research, and it needs no equipment beyond paper and the search box.",
      ],
      quote: {
        text: "A generating function is a clothesline on which we hang up a sequence of numbers for display.",
        attribution: "Herbert Wilf, generatingfunctionology, 1990",
      },
      anums: ["A000045", "A001006", "A005043"],
      links: [
        { label: "OEIS transforms", url: "https://oeis.org/transforms.html" },
        { label: "Sloane's gap (paper)", url: "https://arxiv.org/abs/1101.4470" },
      ],
    },
    {
      id: "deep-contribute",
      title: "Contributing to the OEIS",
      body: [
        "The OEIS is not read-only. It is a moderated wiki, and its contributors range from Fields Medalists to high school students; what gets a sequence accepted is the mathematics, not the credentials. The pipeline works like scholarly publishing in miniature: you register under your real name, draft a submission, and volunteer editors review it, request changes, and eventually approve or reject [5]. Expect real review; the editors' standards are why a fifty-year-old database is still trustworthy.",
        "What makes a submission good, condensed from the official guidance: the sequence should be well-defined and correct (editors recompute your terms), interesting to someone beyond its author, genuinely new rather than a trivial variant of an existing entry, and dressed properly, with a clear definition, enough terms, a program that generates them, and references or links [5]. The contribution overview and the Style Sheet linked below spell out the details, and reading a few dozen well-groomed entries, A000045 is a fine model, teaches the house style faster than any manual.",
        "You do not have to start with a new sequence. Adding a reference, a program, a proof of a conjectured formula in an existing entry, or extending a b-file of terms, are all real contributions that go through the same review, and they are the natural first step. The database that has been feeding this app runs entirely on such accumulated small acts.",
      ],
      links: [
        { label: "Overview of the contribution process", url: "https://oeis.org/wiki/Overview_of_the_contribution_process" },
        { label: "OEIS Style Sheet", url: "https://oeis.org/wiki/Style_Sheet" },
      ],
    },
    {
      id: "deep-some",
      title: "The exposition community",
      body: [
        "There is also a thriving community for the other thing this app tries to do: explaining mathematics well. In 2021 Grant Sanderson of 3Blue1Brown, with James Schloss, launched the Summer of Math Exposition, an annual open contest for math explainers in any medium, videos, essays, interactive toys, apps. The first edition drew over 1,300 entries, and the event has run every year since, with winners featured to millions of viewers and a Discord community trading drafts and feedback year-round.",
        "The premise behind SoME deserves stating, because it is a claim about how mathematics advances: exposition is contribution. A proof nobody understands moves the field less than an explanation that recruits a thousand new problem-solvers. The best entries each year are frequently by students explaining something they only just learned, which is worth remembering if you are one. An app, a visualization, a sonification of a sequence you love would be entirely at home there.",
        "The judging principles the contest publishes double as a checklist for any explanation you will ever give: motivate before you define, put a concrete example before every abstraction, be honest about what is hard, and respect the audience's time. If those sound familiar, it is because the articles you have been reading tried to follow them, arcs before theorems, hailstones before densities. Stealing that structure is encouraged; it is the whole point of publishing it.",
      ],
      links: [
        { label: "Summer of Math Exposition", url: "https://some.3b1b.co" },
      ],
    },
    {
      id: "deep-attack",
      title: "How open problems actually get attacked",
      body: [
        "The earlier articles left several problems standing: Collatz, Recamán's coverage, Kolakoski's density, the fate of 276. It is fair to ask what anyone actually does about such problems beyond waiting for genius. The realistic answer is a portfolio of strategies, each visible in this app's own material.",
        "Computation scouts the territory. Bařina's verification of Collatz to $2^{68}$, Chaffin's $10^{612}$ terms of Recamán, and the volunteer factoring projects grinding out aliquot terms do not prove anything, but they kill weak conjectures, sharpen strong ones, and occasionally find the counterexample that ends the story. Partial results shrink the mystery: Tao's almost-all theorem for Collatz and Chvátal's density bounds for Kolakoski are the current outer fence of what rigorous argument can reach, and each was built from genuinely new technique, which tends to pay off elsewhere even when the original problem stands. Impossibility results mark the cliffs: Conway's proof that generalized Collatz problems are undecidable warns that some fences may never come down.",
        "Collaboration has changed shape too. The Polymath projects showed that blogs full of strangers can do research mathematics together; the Erdős discrepancy problem, a decades-old question about sign sequences, fell in 2015 when Tao built on a surge of Polymath groundwork, months after a computer-assisted proof had settled the first nontrivial case with a SAT solver [6]. And formal verification has grown from curiosity to working tool: when Thomas Hales's proof of the Kepler sphere-packing conjecture ran to hundreds of pages plus gigabytes of computation and referees could only say they were 99 percent sure, Hales and collaborators spent a decade rebuilding the entire argument inside proof assistants, finishing in 2014 with a proof a machine checks line by line. Proof assistants like Lean now host growing libraries of formalized mathematics, which matters most for exactly the computer-heavy arguments this paragraph is full of.",
        "The sober summary: computers scout and verify, statistics fences in the exceptions, and the final step, so far every single time, has been a human noticing structure nobody had framed before. Some of the problems in these articles have been open for a century. All of them are still taking applications, and the entry requirements, as you now know, are a pencil and the willingness to start.",
      ],
    },
  ],
  citations: [
    "N. J. A. Sloane and S. Plouffe, The Encyclopedia of Integer Sequences. Academic Press, 1995.",
    "R. L. Graham, D. E. Knuth, and O. Patashnik, Concrete Mathematics: A Foundation for Computer Science, 2nd ed. Addison-Wesley, 1994.",
    "H. S. Wilf, generatingfunctionology, 2nd ed. Academic Press, 1994; free download at www2.math.upenn.edu/~wilf/DownldGF.html.",
    "M. Livio, The Golden Ratio: The Story of Phi, the World's Most Astonishing Number. Broadway Books, 2002.",
    "N. J. A. Sloane, \"A Handbook of Integer Sequences\" Fifty Years Later, arXiv:2301.03149, 2023.",
    "T. Tao, The Erdős discrepancy problem, Discrete Analysis 1 (2016); see also B. Konev and A. Lisitsa, A SAT attack on the Erdős discrepancy conjecture, arXiv:1402.2184, 2014.",
  ],
};
