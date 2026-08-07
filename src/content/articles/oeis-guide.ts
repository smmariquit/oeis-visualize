import type { WikiArticle } from "../infoContent";
import { WIKI_IMAGES } from "../wikiImages";

export const article: WikiArticle = {
  id: "oeis-guide",
  title: "The OEIS",
  summary: "The encyclopedia behind the app, and how to read its entries.",
  icon: "library-outline",
  sections: [
    {
      id: "oeis",
      title: "What is the OEIS?",
      body: [
        "The On-Line Encyclopedia of Integer Sequences (OEIS) is a free, searchable catalog of number lists: a dictionary for patterns in whole numbers. By mid 2025 it held more than 385,000 entries, and it grows by thousands every year [3]. It is one of the most cited resources in mathematics, referenced in over ten thousand papers, and it is the database this entire app is built on.",
        "Neil J. A. Sloane (usually cited as N. J. A. Sloane) began collecting sequences in 1964 and has tended the collection ever since, through file cards, punched cards, two books, an email server, and finally the website that gave the project its name. The full story is below, because it is a good one.",
        "Every entry gets a permanent ID called an A-number, like A005132 for Recamán's sequence. The same sequence always has the same A-number, so you can cite it, search for it, and share it unambiguously. This app shows the A-number in the header of every visualization; tap it to open the entry on oeis.org.",
        "You do not need to be a mathematician to use it. People consult the OEIS when they notice a pattern in a puzzle, a card game, a piece of code, or a vegetable, and wonder: has anyone seen this list of numbers before? Remarkably often the answer is yes, with fifty years of accumulated knowledge attached.",
      ],
      image: {
        ...WIKI_IMAGES.romanesco,
        caption:
          "Romanesco broccoli. Notice a pattern, count something about it, and the OEIS will tell you whether anyone has counted the same thing before you.",
      },
      links: [
        { label: "Browse oeis.org", url: "https://oeis.org" },
        { label: "N. J. A. Sloane (OEIS founder)", url: "https://oeis.org/wiki/User:N._J._A._Sloane" },
        { label: "OEIS for beginners (wiki)", url: "https://oeis.org/wiki/Welcome" },
      ],
    },
    {
      id: "og-cards",
      title: "1964: a graduate student and a stack of cards",
      body: [
        "The encyclopedia began as a personal filing problem. In 1964, Sloane was a graduate student at Cornell University, working on a thesis about networks, when his research produced the sequence 0, 1, 8, 78, 944, counting total heights of a kind of labeled tree. He needed to know if the sequence was already understood, and discovered that no reference book on Earth could answer the question [5]. That sequence, by the way, is now A000435, and Sloane likes to call it the sequence that started it all.",
        "So he started his own reference. Every interesting sequence he met, in books, journals, or his own work, went onto a file card, and the cards were sorted into lexicographic order so a sequence could be looked up from its opening terms, the same way you look up a word from its opening letters. In 1967 the growing collection was transferred to punched cards, which made it sortable by machine [5].",
        "The design decision hiding in those cards still powers the OEIS today: index the sequences by their terms, not by their names. Names are inconsistent and inventions of hindsight, but the numbers themselves are a universal address. Type what you have, get back what it is.",
      ],
      anums: ["A000435"],
    },
    {
      id: "og-books",
      title: "Two books before the web",
      body: [
        "In 1973, Academic Press published the card collection as A Handbook of Integer Sequences: 2,372 sequences, printed in lexicographic order, each with references [1]. It was an odd book, a dictionary in which every word is a list of numbers, and it found an audience immediately. Martin Gardner recommended it to readers of Scientific American in July 1974, and mathematicians began writing to Sloane with corrections and new sequences by the hundreds.",
        "The letters kept coming for two decades. In 1995, Sloane and Simon Plouffe published the sequel, The Encyclopedia of Integer Sequences, now containing 5,488 sequences with M-numbers as identifiers [2]. It too was a success, and it too was obsolete almost on arrival: new material was arriving faster than print could possibly absorb. A book can hold a snapshot of a growing collection, but not the collection itself.",
        "The lesson was clear, and Sloane drew it. The collection needed to live somewhere that could grow every day.",
      ],
      quote: {
        text: "Every recreational mathematician should buy a copy forthwith.",
        attribution: "Martin Gardner, Scientific American, July 1974, on the Handbook",
      },
    },
    {
      id: "og-web",
      title: "Going online",
      body: [
        "The first step online was email. In the mid 1990s, Sloane set up a lookup service at AT&T Bell Labs: send a message containing a few terms, receive the matching entries by return mail [3]. It was primitive and it was magic, the first time in history a mathematician anywhere could query the collection without owning the book.",
        "In 1996 the collection moved to the web as The On-Line Encyclopedia of Integer Sequences, with around 10,000 entries and, at last, room to grow without limit [3]. Grow it did, by roughly ten thousand or more sequences a year, contributed by professionals, students, and hobbyists worldwide. Sloane maintained it personally on his homepage for over a decade, an astonishing act of scholarly stamina.",
        "In 2009 he transferred the intellectual property to a nonprofit, The OEIS Foundation Inc., to guarantee the encyclopedia would outlive any one person or employer, and in 2010 the OEIS moved to its own site at oeis.org, run as a moderated wiki where submissions are reviewed by a board of volunteer editors before publication [3].",
        "Today the OEIS is that rare thing, a fifty year old database that is simultaneously a research tool, a historical archive, and a public playground. Each entry carries its accumulated scholarship: terms, formulas, programs, references, and the names and dates of everyone who added to it.",
      ],
    },
    {
      id: "reading",
      title: "Reading an entry",
      body: [
        "Open any sequence in this app and tap the document icon to see its full OEIS entry. Entries follow a fixed anatomy, and once you can read one, you can read all 385,000. The parts, roughly top to bottom:",
      ],
      anums: ["A000045"],
      bullets: [
        "A-number and name: the permanent catalog ID and a one-line description of what the sequence counts or computes.",
        "Offset: the index of the first term. Offset 0 means the list starts at a(0). (A second number after the comma is internal search bookkeeping; you can ignore it.)",
        "Data: a few dozen stored terms. Long sequences continue in a b-file, a separate plain-text file holding thousands or even millions of terms, which this app fetches when you ask a visualization for more terms.",
        "Keywords: short tags from the editors. \"core\" marks foundational sequences, \"nice\" especially elegant ones, \"easy\" ones whose rule is simple, \"hard\" ones where computing more terms is an open problem, \"more\" a request for more terms, \"base\" ones that depend on digit representation, and \"hear\" ones worth listening to.",
        "Formulas: exact expressions, recurrences, generating functions, and asymptotic estimates, each signed and dated by its contributor. Reading down this section is reading the sequence's research history in miniature.",
        "Programs: code in Maple, Mathematica, PARI/GP, Python, and other languages that computes the terms, so any claim can be checked.",
        "Cross-references: relatives worth visiting next, wired into this app as tappable links. The compare button next to each one plots the two sequences against each other.",
        "References and links: the papers and books where the sequence appears, sometimes stretching back centuries.",
      ],
    },
    {
      id: "og-reading-walkthrough",
      body: [
        "A worked example makes the anatomy concrete. Open the Fibonacci entry, A000045, and you will find: offset 0, so the data 0, 1, 1, 2, 3, 5, ... starts at a(0); the keywords \"core\" and \"nice\", the editors telling you this one is both foundational and beautiful; a b-file extending the terms into the thousands; a formula section that opens with the recurrence and Binet's closed form and then wanders through dozens of stranger identities; programs in a dozen languages; and cross-references to the Lucas numbers, the golden ratio, and scores of variants. All of that knowledge is attached to one permanent address, which is the whole trick of the encyclopedia in a sentence.",
      ],
    },
    {
      id: "og-superseeker",
      title: "Superseeker, the tireless detective",
      body: [
        "Sometimes an ordinary lookup fails: your sequence is not in the database, at least not in the exact form you have it. For those cases the OEIS operates Superseeker, an email server (superseeker@oeis.org) that does not just look your sequence up but actively tries to explain it [3].",
        "Superseeker applies well over a hundred transformations to your terms and looks up each result. It takes differences, partial sums, and ratios; it tries dropping terms, interleaving, and dozens of classical transforms like the binomial transform; it attempts to fit recurrences and to guess a generating function using symbolic algebra packages. If your sequence is a disguised version of a known one, there is a decent chance Superseeker unmasks the disguise and mails you the explanation.",
        "Because each query burns real computing time, etiquette asks for at most one request per person per hour. It is a striking piece of infrastructure when you think about it: an automated colleague, running continuously for decades, whose whole job is answering the question \"what is this sequence, really?\"",
      ],
      links: [
        { label: "Superseeker help file", url: "https://oeis.org/superhelp.txt" },
      ],
    },
    {
      id: "og-culture",
      title: "A culture of contributions",
      body: [
        "The OEIS is written by its readers. Anyone can register and propose a new sequence or an addition to an existing entry: a formula, a program, a reference, more terms. Volunteer editors review every proposal, ask questions, request corrections, and eventually approve or reject it, a workflow closer to a journal's peer review than to an open wiki [3].",
        "The contributors are gloriously mixed: research mathematicians, programmers, teachers, students, and dedicated amateurs, thousands of them across the decades. Contributions are signed and dated, which gives every entry a visible archaeology. On a good entry you can watch fifty years of mathematics accumulate line by line: the original submission, a formula found in the 1990s, a b-file computed in the 2010s, a connection to another entry spotted last year.",
        "The culture prizes correctness above all. Terms must be verifiable, ideally by an included program; claims need references or proofs; and wrong terms, once discovered, are corrected with a note preserving the history. There is also room for taste: the keyword \"nice\" is the editors' quiet applause for a sequence with unusual elegance.",
        "What makes a good submission? The community's answer has been stable for decades: the sequence should be well defined, so that anyone can recompute it; it should come with enough terms to be searchable; and it should be interesting, which the OEIS deliberately declines to define too precisely, because the collection's charm lives in its breadth. Sequences from serious research sit next to sequences about calculator keyboards, and both are welcome if they are correct.",
        "Sloane himself, well into his eighties, has remained the project's central editor and best publicist, giving talks and interviews about his favorite entries [4]. The habit the community has settled into, noticing something, counting it, checking the count, and sharing it, is a miniature of how mathematics itself moves forward.",
      ],
      links: [
        { label: "How to submit a sequence", url: "https://oeis.org/wiki/Overview_of_the_contribution_process" },
      ],
    },
    {
      id: "og-gap",
      title: "Sloane's gap",
      body: [
        "Here is an experiment you can only do because the OEIS exists. For each number N, count how many OEIS entries contain N among their terms. Popular numbers like 12 or 1024 appear in tens of thousands of entries; obscure numbers in only a handful. Plot that popularity against N and you would expect a smooth, gradually thinning cloud: bigger numbers, fewer appearances.",
        "That is not what the plot shows. The cloud splits into two clearly separated bands, a popular class and an unpopular one, with a nearly empty gap between them. A number tends to be either interesting or forgettable, with surprisingly little middle class. The phenomenon was first noticed by the engineer and blogger Philippe Guglielmetti, and was analyzed in a 2013 paper by Nicolas Gauvrit, Jean-Paul Delahaye, and Hector Zenil under the name Sloane's gap [6].",
        "Part of the explanation is pure mathematics: primes, powers, factorials, and highly structured numbers naturally show up in many contexts, so they populate the upper band. But the authors argue that mathematics alone does not explain the sharpness of the split. The rest is social: mathematicians study what other mathematicians have made interesting, so attention concentrates and the popular get more popular. The gap, on this reading, is partly a portrait of the mathematical community's collective taste [6].",
        "That dual nature is worth keeping in mind as you wander this app. The OEIS is a map of mathematical reality, but it is also a map of human curiosity, showing which corners of the number world people have bothered to visit. The empty corners are not empty because nothing is there.",
      ],
    },
  ],
  citations: [
    "N. J. A. Sloane, A Handbook of Integer Sequences. Academic Press, 1973.",
    "N. J. A. Sloane, S. Plouffe, The Encyclopedia of Integer Sequences. Academic Press, 1995.",
    "N. J. A. Sloane, \"The On-Line Encyclopedia of Integer Sequences,\" Notices of the American Mathematical Society 65(9), 2018, pp. 1062-1074.",
    "E. Klarreich, \"The Connoisseur of Number Sequences,\" Quanta Magazine, August 6, 2015.",
    "N. J. A. Sloane, \"'A Handbook of Integer Sequences' Fifty Years Later,\" The Mathematical Intelligencer 45, 2023.",
    "N. Gauvrit, J.-P. Delahaye, H. Zenil, \"Sloane's Gap: Do Mathematical and Social Factors Explain the Distribution of Numbers in the OEIS?\" Journal of Humanistic Mathematics 3(1), 2013, pp. 3-19.",
  ],
};
