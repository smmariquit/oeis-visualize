import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "hearing",
  title: "Hearing a sequence",
  summary: "How numbers become notes, why remainders make the melody, and what the ear catches that the eye misses.",
  icon: "musical-notes-outline",
  sections: [
    {
      id: "hearing-ear",
      body: [
        "The previous article treated the eye as a mathematical instrument. The ear is a different instrument with a different specialty, and the specialty is time. Human hearing resolves events a few milliseconds apart and locks onto rhythm, repetition, and change with an accuracy vision cannot match; you notice a skipped beat in a song you have never heard before. A sequence is an ordered stream of values, which is to say: a sequence is already shaped like music, waiting for a mapping.",
        "Sonification, turning data into sound, is the auditory sibling of visualization, and it is older than it sounds. The Geiger counter is a sonification: radiation level mapped to click rate, read by ear precisely because ears track rates effortlessly while eyes are busy elsewhere. The most famous scientific sound of this century is another one: when LIGO announced the first gravitational-wave detection in 2016, the signal was presented to the world as a chirp, a rising whoop as two black holes spiraled together, because the wave's frequencies happened to fall in the human audible range and playing them was the fastest way to make a billion-year-old collision comprehensible.",
        "The research field that studies such displays defines sonification as the transformation of data relations into perceived relations in an acoustic signal [2]. Everything in this article is that one sentence, applied to integer sequences.",
      ],
    },
    {
      id: "hearing-oeis",
      title: "The OEIS listen button",
      body: [
        "The idea of listening to integer sequences has an official history, and it runs through the OEIS itself. Neil Sloane had long wanted to hear the sequences in his encyclopedia, on the theory that the ear might catch properties the eye misses, and the OEIS grew a \"listen\" button: pick any of its hundreds of thousands of sequences and the site renders it as a MIDI file, using a player written by David Applegate [1]. The default mapping is blunt and effective: each term is reduced modulo 88 and played as the corresponding key of an 88-key piano.",
        "The encyclopedia even curates its music. Sequences that sound interesting carry the keyword \"hear\", searchable like any other property, which makes the OEIS, among everything else it is, a browsable catalog of accidental compositions [1]. There is also a deliberate composition hiding in it: A123456 was constructed so that the listen feature plays the opening of Beethoven's Für Elise, a demonstration that the pipeline from integers to music runs in both directions. And Sloane has a public favorite: Recamán's sequence, which he recommends hearing with a specific echoing synthesizer patch [1]. Play A005132 in this app and you will understand why; the mostly-stepwise motion with sudden lurches sounds genuinely haunted.",
      ],
      quote: {
        text: "Of all the sequences in the OEIS, this one is my favorite to listen to.",
        attribution: "N. J. A. Sloane, on Recamán's sequence, OEIS entry A005132",
      },
      figure: {
        kind: "residue-wheel",
        params: { seq: "A005132" },
        caption:
          "A pocket listen button for Sloane's favorite: tap to step through Recamán's terms and hear the mostly stepwise motion punctured by sudden leaps.",
      },
      anums: ["A005132"],
      links: [
        { label: "Listening to sequences in the OEIS", url: "https://oeis.org/listen.html" },
      ],
    },
    {
      id: "hearing-mapping",
      title: "Mod or magnitude: every mapping is a choice",
      body: [
        "There is no canonical way a sequence \"should\" sound; every sonification picks a mapping, and the pick is editorial. The core problem is compression: pitch range is finite, roughly ten octaves at the generous end, and sequences are not. Fibonacci passes any fixed pitch ceiling by term ninety or so. Something must fold the unbounded values into the audible range, and the two standard folds hear completely different mathematics.",
        "Magnitude mapping rescales each batch of terms so the smallest sits at the bottom of the range and the largest at the top. It preserves shape: growth sounds like rising, oscillation sounds like wobbling. Its cost is that the scaling constantly renormalizes, so an exponential sequence becomes a bland upward glide and all fine arithmetic detail is crushed, exactly like the linear-axis plot of Fibonacci from the previous article.",
        "Modular mapping, which this app and the OEIS both default to, takes each term's remainder by some k and lets the remainder pick a note. It happily discards growth altogether: Fibonacci's explosion is inaudible. In exchange it preserves the thing number theory actually lives in, modular arithmetic.",
        "A sequence that is periodic modulo k becomes a literally repeating melody; divisibility patterns become recurring motifs; a change in modular behavior is a change of tune you cannot miss. The choice between the two mappings is a choice of what question to ask, which by now is a familiar theme.",
        "Pitch is also not the only channel. Duration, loudness, timbre, and silence all carry data, and rhythm is arguably the ear's strongest suit of all: humans detect a disturbed beat more reliably than a wrong note. A sonification can map values to note lengths, put rests where a sequence skips, or reserve a distinct timbre for special terms, say a drum hit on every prime, and each of those choices makes one property audible at the expense of another. The design space is exactly as wide, and exactly as editorial, as the space of visual encodings from the previous article.",
        "Concretely, each instrument in this app reads the numbers its own way: Melody plays a(n) mod 25 as a step on the chosen scale, Bass follows mod 15 an octave and a half down, Harmony shades with mod 5, Rhythm drums on parity and position, Digits plays the last four decimal digits as a run of notes, and Pad roots a slow chord on mod 10. Layered, they are six simultaneous editorial opinions about the same integers, which is why the same sequence can feel completely different with different instruments enabled.",
      ],
      figure: {
        kind: "residue-wheel",
        params: { seq: "A000045" },
        caption:
          "Modular mapping in action: each tap folds the next Fibonacci number onto one of 25 cells and plays it, discarding the explosive growth while keeping the arithmetic.",
      },
    },
    {
      id: "hearing-scales",
      title: "Scales, ratios, and why pentatonic cannot clash",
      body: [
        "Why map remainders onto a musical scale instead of raw frequencies? Because consonance is physics before it is culture. Two tones sound consonant when their frequencies form small whole-number ratios: 2:1 is the octave, 3:2 the perfect fifth, 4:3 the fourth. The observation is credited to the Pythagoreans (the tale of Pythagoras discovering it from blacksmiths' hammers is folklore, but the ratio experiments on vibrating strings are real physics you can reproduce). The modern explanation of dissonance came from Helmholtz in the 19th century and was nailed down experimentally by Plomp and Levelt in 1965: when two tones are close but not identical in frequency, they beat inside the ear's critical band, producing roughness, and the roughness peaks when tones sit around a semitone apart, then fades as they separate [3].",
        "That result explains a folklore claim precisely: improvise on the black keys of a piano and nothing sounds wrong. The black keys form an anhemitonic pentatonic scale, five notes per octave with no semitone anywhere; adjacent notes are at least a whole tone apart. Since the maximum-roughness zone lives around the semitone, any two pentatonic notes played together largely stay out of it. \"Cannot clash\" is not quite a theorem, since real instruments carry overtones that can still beat, but as an engineering statement about melodic sonification it holds up: pentatonic output stays pleasant no matter what the data does [3].",
        "That pleasantness is a trade, and the app's Settings expose it honestly. Pentatonic hears the sequence through a five-note filter: safe, musical, and lossy, folding twelve pitch classes down to five. Chromatic uses all twelve notes, the most faithful rendering of the raw remainders and the most tense listening, semitone clashes included. Choosing a scale is choosing how much mathematics to trade for how much music, and there is no neutral setting; the diatonic options in between are simply different points on the same dial.",
      ],
      figure: {
        kind: "harmonic-ladder",
        params: { partials: [1, 2, 4, 8, 16, 32] },
        caption:
          "Six partials in pure 2:1 octave ratios: tap to hear them fuse into a single hollow tone, consonance as physics rather than taste.",
      },
    },
    {
      id: "hearing-pisano",
      title: "Pisano periods: loops you can hear",
      body: [
        "Here is the payoff of modular mapping, audible in the app right now. Reduce Fibonacci modulo any number m and the resulting sequence is periodic, always. The proof is a two-line pigeonhole argument worth internalizing: each term depends only on the previous pair of remainders, there are at most $m^2$ possible pairs, so within $m^2$ steps some pair recurs, and the recurrence relation, which runs backwards as well as forwards, forces the whole sequence to cycle from the start. The cycle length is the Pisano period $\\pi(m)$: Fibonacci mod 2 repeats every 3 terms, mod 7 every 16, and mod 10, the last digits, every 60, a fact Lagrange already knew in 1774 [4].",
        "Sonified, this stops being a theorem and becomes a chorus. Play Fibonacci with the Melody instrument, which reads a(n) mod 25, and the tune loops exactly every $\\pi(25) = 100$ notes; the Pad on mod 10 cycles every 60; the parity rhythm thumps its odd-odd-even pattern every 3. Different instruments loop with different periods simultaneously, phasing against each other like a phone's interlocking ringtone, and every bit of that structure is the modular arithmetic of Fibonacci made audible. The catalog of Pisano periods is A001175, and listening is the most direct way anyone has found to feel what those numbers mean.",
        "True to this project's theme, even these tidy loops hide an open problem. For every prime p anyone has ever checked, the period mod $p^2$ is exactly p times the period mod p. Donald Wall asked in 1960 whether that could ever fail; a prime where it does is now called a Wall-Sun-Sun prime, and none has ever been found, though distributed searches have combed far beyond $10^{17}$ candidates.",
        "Nobody has proved one exists, and nobody has proved one does not. Every Pisano period you will ever hear in this app obeys Wall's pattern, and mathematics cannot yet promise that the music never breaks it [4].",
      ],
      figure: {
        kind: "pisano-strip",
        params: { m: 5 },
        caption:
          "Fibonacci mod 5 as a strip of colors: the bracket marks one full Pisano period of 20 residues, after which the pattern repeats forever. Tap to hear the loop played as notes.",
      },
      anums: ["A000045", "A001175"],
    },
    {
      id: "hearing-research",
      title: "Sonification as a research field",
      body: [
        "Turning data into sound has an organized research community. The International Conference on Auditory Display was founded by Gregory Kramer in 1992 at the Santa Fe Institute, and in 1999 its members produced the field's founding survey for the U.S. National Science Foundation, the Sonification Report, which laid out both the promise and the open questions of auditory display [2]. The comprehensive modern reference, The Sonification Handbook, is freely available online and covers everything from psychoacoustics to auditory graph design [5].",
        "The field's vocabulary is worth borrowing. Audification plays the raw data directly as a waveform, the way seismologists speed up earthquake recordings until the planet's rumbling rises into hearing, and the way that LIGO chirp was made. Parameter mapping, what this app and the OEIS both do, assigns data values to musical parameters like pitch and rhythm; it is more flexible and more editorial, since scale, key, tempo, and mapping are all choices [5]. The distinction is the audio version of the difference between showing a photograph and drawing a chart.",
        "The field's honest consensus is worth repeating in an article that has been enthusiastic about listening. Sonification excels at monitoring, at periodicity and rhythm detection, and at freeing the eyes; it struggles with precise value reading, since \"which exact number was that pitch?\" is hard for ears, and its mappings carry the same editorial biases as visual encodings [2]. The right model is the one this pair of articles has been building: sight and sound are two instruments pointed at the same object, with different resolutions along different axes. Pisano loops are easier to hear than to see; the shape of Fibonacci's growth is easier to see than to hear.",
      ],
    },
    {
      id: "hearing-access",
      title: "Hearing as access",
      body: [
        "There is one more reason sound deserves first-class status in a math app, and it is not aesthetic. For blind and low-vision users, audio is not an alternative rendering of the data; it is the rendering. Mathematics has a long history of distinguished blind practitioners, surveyed in a well-known Notices of the American Mathematical Society article, including Bernard Morin, the blind topologist who guided the first explicit sphere eversion, work of profound geometric imagination [6].",
        "Honesty about real practice matters here. Working blind mathematicians historically rely on braille systems, audio and screen-reader access to text, collaboration, and prodigious mental modeling, not primarily on sonification [6]; auditory graphs and data sonification are an active accessibility research area rather than a solved standard. The braille side of that toolkit has its own mathematician hero: the Nemeth code, the standard system for writing mathematics in braille, was created in the 1950s by Abraham Nemeth, a blind mathematician who built the notation he needed to do his own work, and it has carried blind students through calculus and beyond ever since [6].",
        "But the unfinished state of auditory access is exactly why features like the OEIS listen button and this app's sound engine matter beyond novelty: they make the structure of a sequence directly perceivable without a working display, through the channel best suited to pattern-over-time. A Pisano loop heard is a Pisano loop known, no eyesight required.",
      ],
      links: [
        { label: "The World of Blind Mathematicians (PDF)", url: "https://www.ams.org/notices/200210/comm-morin.pdf" },
        { label: "International Community for Auditory Display", url: "https://icad.org" },
      ],
    },
  ],
  citations: [
    "OEIS Foundation, Listening to sequences in the OEIS, oeis.org/listen.html; MIDI player by D. Applegate, and N. J. A. Sloane's comment at entry A005132.",
    "G. Kramer, B. Walker, T. Bonebright, P. Cook, J. H. Flowers, N. Miner, and J. Neuhoff, Sonification Report: Status of the Field and Research Agenda. International Community for Auditory Display, prepared for the National Science Foundation, 1999.",
    "R. Plomp and W. J. M. Levelt, Tonal consonance and critical bandwidth, Journal of the Acoustical Society of America 38 (1965), 548-560.",
    "M. Renault, The period, rank, and order of the (a,b)-Fibonacci sequence mod m, Mathematics Magazine 86 (2013), 372-380.",
    "T. Hermann, A. Hunt, and J. G. Neuhoff (eds.), The Sonification Handbook. Logos Verlag, Berlin, 2011.",
    "A. Jackson, The world of blind mathematicians, Notices of the American Mathematical Society 49 (2002), 1246-1251.",
  ],
};
