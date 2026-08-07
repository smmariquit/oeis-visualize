import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "app-manual",
  title: "About this app",
  summary: "The full user guide: search, the daily game, sound, compare, and more.",
  icon: "information-circle-outline",
  sections: [
    {
      id: "am-intro",
      body: [
        "Sequence Trip is a pocket window into the On-Line Encyclopedia of Integer Sequences [1]: search its catalog, watch sequences build themselves as animations, hear them as music, race a friend to guess the daily puzzle, and read about the mathematics in this wiki. Everything essential works offline, nothing tracks you, and the source code is public.",
        "This page is the owner's manual. You do not need to read it top to bottom; each section below covers one part of the app, so you can jump to whatever you are curious about and come back for the rest when a button surprises you.",
        "A quick map of the tabs: Home is search plus a rotating set of featured sequences; Daily is OEISdle, the guessing game; Explore offers themed collections and a random draw from the whole database; Settings holds the global controls for colors, sound, and notifications; and About is this wiki, including the page you are reading now.",
      ],
    },
    {
      id: "am-search",
      title: "Searching",
      body: [
        "The search box on the Home tab understands three kinds of query and figures out which one you mean automatically.",
        "By name. Type words from a sequence's name, like \"fibonacci\" or \"prime twin\". Every word you type must match somewhere in the name, so adding words narrows the results. Case does not matter.",
        "By A-number. Type the catalog ID, like A005132. You can be lazy about it: a5132 works too, and the app pads the digits to the official six-digit form for you.",
        "By terms. Type the first few values you know, separated by commas or spaces, like 1,1,2,3,5. The app finds sequences containing exactly that run of values, consecutively and in order. This is the search mode that feels like magic: it is how you identify a pattern you met in the wild.",
        "Negative numbers are fine. If you get too many results, add one more term; each extra term cuts the list dramatically.",
        "All searches run against the on-device database described in the Offline section, which is why results appear instantly and why search works in airplane mode. If a search comes up empty, check the order of your terms first (order matters!), then try fewer of them, in case your version of the sequence starts at a different spot than the catalog's.",
      ],
    },
    {
      id: "help",
      title: "The visualization screen",
      body: [
        "Open any sequence, from search, a featured card, an Explore collection, a wiki chip, or the daily puzzle result, and you land on its visualization: an animated construction that draws the sequence term by term while captions below narrate each step.",
        "Some sequences have hand-crafted visualizations (Recamán's arcs, the Fibonacci spiral, the Ulam spiral, the Collatz tree, Pascal's fractal, the digit flow). Everything else gets a set of generic lenses picked to fit the shape of the data: line plot, bars, a colored grid, a golden-angle spiral, a turtle walk, and a phase plot. The chips at the top right switch between all views available for the current sequence; each one encodes the numbers differently, and a pattern invisible in one view often jumps out in another.",
        "The palette button restyles the visualization colors for the sequence you are watching, and the Settings tab sets the default palette for every sequence. The main playback controls:",
      ],
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
      id: "am-lenses",
      figure: {
        kind: "pisano-strip",
        caption:
          "What switching lenses can reveal: reduce Fibonacci mod 5 and a repeating strip of colors appears with Pisano period 20, the kind of structure the grid view surfaces; tap the strip to hear the loop played as notes.",
      },
    },
    {
      id: "am-daily",
      title: "OEISdle, the daily puzzle",
      body: [
        "OEISdle is the app's daily guessing game, in the spirit of Wordle [3] but with sequences: every day, one sequence from a hand-picked pool is the puzzle, you see its opening terms, and you have three guesses to name the next one. The pool rotates so that every puzzle appears before any repeats and no two consecutive days feel alike, and everyone gets the same puzzle on the same date.",
        "Three difficulties change how much help you get. Easy shows 8 terms, gives you the hint right away, and lets you pick from 4 candidate answers. Normal shows 6 terms and 6 candidates, and reveals the hint only after your first wrong guess.",
        "Hard shows just 5 terms, makes you type the answer yourself, and holds the hint back until you have missed twice. You can play all three difficulties of the same day's puzzle.",
        "Guessing has a few kindnesses built in. Only whole numbers count, spaces and commas in your typing are ignored, and repeating a guess you already tried costs you nothing. Wrong guesses get struck through in the guess slots so you can see your history.",
        "The clue tiles themselves are playable: tap any term to hear its pitch, and prime terms glow. Guess right and the whole sequence takes a bow, tiles hopping in order while their notes play as a run.",
        "Streaks are counted by days: solve any difficulty on a given day and the streak survives; end the day with only failed attempts and it resets. Perfect-square streaks (1, 4, 9, 16, ...) are celebrated with confetti, which is exactly the kind of joke a sequence app should make. Progress is saved on your device only.",
        "Two more buttons round it out. Share produces a spoiler-free result card (date, difficulty, score) you can send to a friend. Practice mode lets you play through the entire puzzle pool at your own pace: practice rounds never touch your streak, and the app quietly skips today's daily puzzle in practice so nothing spoils the real game. After any solved or failed puzzle, one tap takes you to that sequence's visualization to see what you were guessing at.",
      ],
    },
    {
      id: "am-sound",
      title: "Sonification: scales, key, and layers",
      body: [
        "Every visualization can be heard as well as seen. Sonification, turning data into sound, has a serious research pedigree [2]: the ear is superb at noticing rhythm, repetition, and drift over time, which are exactly the features sequences have. The OEIS itself tags entries worth listening to with the keyword \"hear\", and its editors have long championed playing sequences aloud [4].",
        "The Settings tab controls how terms become notes, globally for the whole app. The Scale choice decides which notes are allowed: Pentatonic (the default) uses five notes per octave, the black-keys sound where any two notes agree, so even wild sequences stay pleasant; Major is the bright seven-note scale of most pop songs; Minor is its moodier cousin; and Chromatic allows all twelve notes, the most faithful to the raw numbers and the most tense. The Key slider shifts everything up or down by semitones, from C up through B, if you prefer your mathematics in E flat.",
        "On each visualization screen, the Musicalize button opens the layer toggles. Each layer is one instrument with its own recipe for reading a(n): Melody takes the remainder of a(n) divided by 25 and picks a scale step, higher remainders giving higher notes. Bass does the same with remainder 15, about one and a half octaves down, in a warmer tone. Harmony uses remainder 5, nudged by position, to shade the melody with soft high notes.",
        "Rhythm builds drums from the numbers: kick on every 4th term, snare when a(n) is odd, hi-hat on every 3rd. Digits plays the last four decimal digits of each term as a quick run, 0 low to 9 high. Pad roots a slow three-note chord on every 4th term. Melody and Pad are on by default; layer combinations are remembered per sequence.",
        "Separately, the app has an optional ambient background loop with its own volume control (on phones and tablets). It is scenery, not data: the sequence sounds play on top of it.",
      ],
      figure: {
        kind: "residue-wheel",
        caption:
          "The Melody recipe drawn as a wheel: each Fibonacci term lands on its remainder mod 25, and higher cells become higher notes; tap to step through the terms and hear every landing.",
      },
    },
    {
      id: "am-harmonics",
      figure: {
        kind: "harmonic-ladder",
        caption:
          "Why the app's tones sound warm rather than beepy: each note stacks quieter partials at 2, 3, and 4 times its base frequency on top of the fundamental; tap the ladder to hear the lit rungs fuse into one tone.",
      },
    },
    {
      id: "am-compare",
      title: "Compare: two sequences, three lenses",
      body: [
        "Some questions only make sense about a pair: does Fibonacci grow faster than the Catalan numbers? Do the Lucas numbers shadow Fibonacci? The Compare tab answers by plotting sequences against each other, through three lenses.",
        "Growth overlays the sequences on shared log-scaled axes, any number of them at once. On log axes, the slope is the growth rate, so parallel curves mean same-speed growth and a steeper curve is genuinely faster, no squinting at huge numbers required.",
        "Ratio divides term by term, a(n)/b(n), for exactly two sequences. When the ratio is known to settle toward a limit, the plot draws a dashed gold guide line at that value, so you can watch, say, consecutive-term ratios crowd toward the golden ratio.",
        "Phase plots one dot per index, pairing a(n) with b(n). Dots along a straight line mean one sequence is a scaled copy of the other; curves and clouds reveal subtler relationships. Like Ratio, it needs exactly two sequences.",
        "Comparisons can be heard too. The duet button plays both sequences together, the first panned to your left ear and the second to your right, and when both land on the same value at the same step, a little chime marks the coincidence. The first ten terms of each sequence are shown as strips with shared values highlighted.",
        "You can reach Compare three ways: from the preset matchups on the Compare tab (each chosen because the pair has a real story), from the compare button next to any cross-reference in a full OEIS entry, or by editing the URL directly on web, in the form /compare/A000045-A000108.",
      ],
      figure: {
        kind: "ratio-convergence",
        caption:
          "The Ratio lens in miniature: consecutive Fibonacci terms divided pairwise hop above and below the dashed gold guide before squeezing toward the golden ratio φ, exactly the settling the guide line marks in Compare.",
      },
    },
    {
      id: "am-widgets",
      title: "Widget and notifications",
      body: [
        "On Android, Sequence Trip ships a \"Sequence of the Day\" home screen widget: a small card with the day's featured sequence, its A-number, name, and opening terms, refreshing itself a few times a day. To add it, long-press an empty spot on your home screen, tap Widgets, find Sequence Trip, and drag the widget out. Tapping it opens the sequence in the app.",
        "On phones and tablets, the app can also send two daily notifications, both off until you enable them in Settings. Around 9am local time, \"Today's sequence\" names the sequence of the day with its A-number, and tapping it jumps straight to the visualization. Around noon, an OEISdle reminder announces that the day's puzzle is ready; its wording is deliberately vague, because naming the sequence would spoil the answer you are supposed to guess.",
        "A privacy note worth making explicit: these are local notifications, scheduled on your device as a rolling two-week window that is rebuilt each time you open the app. No server sends you anything, because there is no server at all.",
      ],
    },
    {
      id: "offline",
      title: "Offline & privacy",
      body: [
        "The app carries its own OEIS index: a bundled SQLite database built from the encyclopedia's official data dumps (the \"stripped\" terms file and the names file). Search by name, A-number, or terms, the featured picks, the daily puzzle, and every visualization's opening terms all run against this local database, which is why they work in airplane mode and respond instantly.",
        "Two things do use the network, both on demand. Asking a visualization for more terms may download the sequence's b-file from oeis.org, a plain-text file of extended terms; downloaded b-files are cached on device so the next visit is offline again. And opening the full OEIS entry (formulas, keywords, programs, cross-references) fetches the live entry from oeis.org, so you always read the current state of mathematical knowledge rather than a stale copy.",
        "That is the complete list. No accounts, no analytics, no tracking. Game progress and settings stay on your device. Nothing leaves it except the explicit OEIS requests above and app update checks.",
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
  citations: [
    "N. J. A. Sloane, \"The On-Line Encyclopedia of Integer Sequences,\" Notices of the American Mathematical Society 65(9), 2018, pp. 1062-1074.",
    "T. Hermann, A. Hunt, J. G. Neuhoff (eds.), The Sonification Handbook. Logos Verlag, 2011.",
    "D. Victor, \"Wordle Is a Love Story,\" The New York Times, January 3, 2022.",
    "N. J. A. Sloane, \"My favorite integer sequences,\" in Sequences and their Applications (Proceedings of SETA '98). Springer, 1999.",
  ],
};
