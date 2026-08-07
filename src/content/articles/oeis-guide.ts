import type { WikiArticle } from "../infoContent";

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
        "The On-Line Encyclopedia of Integer Sequences (OEIS) is a free, searchable catalog of number lists. Think of it as a dictionary for patterns in whole numbers.",
        "Neil J. A. Sloane (often cited as N. J. A. Sloane) began it in 1964 as a handwritten card file at AT&T Bell Labs, collecting every interesting sequence he encountered. It moved online in 1996 and has since grown to hundreds of thousands of entries from researchers, puzzle fans, and hobbyists worldwide.",
        "Every entry gets a permanent ID called an A-number (like A005132 for Recamán's sequence). The same sequence always has the same A-number, so you can cite it, search for it, and share it unambiguously.",
        "You do not need to be a mathematician to use it. People look up sequences when they notice a pattern in a puzzle, a game, nature (petals, seed spirals), or computer output and wonder: has anyone seen this list before?",
      ],
      links: [
        { label: "Browse oeis.org", url: "https://oeis.org" },
        { label: "N. J. A. Sloane (OEIS founder)", url: "https://oeis.org/wiki/User:N._J._A._Sloane" },
        { label: "OEIS for beginners (wiki)", url: "https://oeis.org/wiki/Welcome" },
      ],
    },
    {
      id: "reading",
      title: "Reading an entry",
      body: [
        "Open any sequence here and tap the document icon to see its full OEIS entry. The parts, top to bottom:",
      ],
      bullets: [
        "A-number: the permanent catalog ID, like a serial number.",
        "Offset: the index of the first term. Offset 0 means the list starts at a(0).",
        "Keywords: short tags from OEIS editors. \"core\" marks foundational sequences, \"nice\" especially elegant ones, \"hard\" ones where computing more terms is an open problem, \"hear\" ones worth listening to.",
        "Data: the stored terms. Long sequences continue in a b-file, which this app fetches when you ask for more terms.",
        "Formula: exact and asymptotic expressions, recurrences, and generating functions contributed over the years, each signed and dated.",
        "Code: programs in PARI, Mathematica, Maple, Python, Haskell, and more that compute the sequence.",
        "Cross-references: relatives worth visiting next. The compare button next to each one plots the two sequences against each other.",
      ],
    },
  ],
};
