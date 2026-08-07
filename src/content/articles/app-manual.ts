import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "app-manual",
  title: "About this app",
  summary: "Controls, offline behavior, privacy, credits, and source.",
  icon: "information-circle-outline",
  sections: [
    {
      id: "help",
      title: "How to use",
      bullets: [
        "Search by name (e.g. fibonacci), A-number (A005132), or leading terms (1,1,2,3,5).",
        "Tap a result or featured card to open the full visualization.",
        "Play starts construction; Pause freezes it; Restart resets and plays from the beginning.",
        "Speed cycles through 0.5x, 1x, 2x, and 4x.",
        "Musicalize turns each new term into sound. Pick Melody, Bass, Harmony, Rhythm, or Digits and tap the speaker icon.",
        "Captions below the viz explain each step. Math notation uses LaTeX on web.",
        "Tap the OEIS id in the header to open the sequence on oeis.org.",
        "Tap the document icon in the visualize toolbar for the full OEIS entry: keywords, formulas, code, cross-refs, and more.",
      ],
    },
    {
      id: "offline",
      title: "Offline & privacy",
      body: [
        "Search and bundled terms work offline via the on-device OEIS database.",
        "Extra terms may download a b-file from oeis.org the first time you open a sequence; cached copies reuse local storage on native.",
        "The full OEIS entry (formulas, keywords, programs, cross-refs) loads from oeis.org when you tap the document icon on the visualize screen.",
        "No accounts, analytics, or tracking. Nothing leaves your device except explicit OEIS requests and app update checks.",
      ],
    },
    {
      id: "credits",
      title: "Credits",
      body: [
        "Sequence data from the On-Line Encyclopedia of Integer Sequences (OEIS), founded by Neil J. A. Sloane (N. J. A. Sloane) and maintained by The OEIS Foundation Inc., under CC BY-SA 4.0.",
        "This app is not affiliated with or endorsed by The OEIS Foundation or Dr. Sloane.",
        "Ambient music: \"Heavenly Loop\" by isaiah658 (CC0, opengameart.org).",
      ],
      links: [
        { label: "oeis.org", url: "https://oeis.org" },
        { label: "N. J. A. Sloane (OEIS founder)", url: "https://oeis.org/wiki/User:N._J._A._Sloane" },
        {
          label: "OEIS End-User License Agreement",
          url: "https://oeis.org/wiki/The_OEIS_End-User_License_Agreement",
        },
        { label: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
      ],
      bullets: [
        "KaTeX for math rendering (web)",
        "Expo, React Native, and Shopify React Native Skia",
        "SQLite OEIS index built from official stripped + names dumps",
      ],
    },
    {
      id: "source",
      title: "Source",
      body: ["Open source. Bug reports and contributions welcome on GitHub."],
      links: [
        {
          label: "github.com/smmariquit/oeis-visualize",
          url: "https://github.com/smmariquit/oeis-visualize",
        },
      ],
    },
  ],
};
