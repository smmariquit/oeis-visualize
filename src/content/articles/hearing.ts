import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "hearing",
  title: "Hearing a sequence",
  summary: "How numbers become notes, and why remainders make the melody.",
  icon: "musical-notes-outline",
  sections: [
    {
      id: "sound",
      title: "How the music works",
      body: [
        "There is no canonical way a sequence \"should\" sound; every sonification picks a mapping. The OEIS's own listen feature plays a(n) modulo 88 on piano keys. This app does the same thing with more control: the remainder of each term picks a step on a musical scale.",
        "Why remainders? Pitch range is finite and sequences are not, so values must be compressed. Remainders win because number theory lives in them: a sequence that is periodic modulo k becomes a literally repeating melody. Fibonacci modulo anything is periodic (the Pisano period), so Fibonacci genuinely loops as a tune.",
        "Each instrument reads the numbers its own way: Melody plays a(n) mod 25 on the chosen scale, Bass follows mod 15 an octave and a half down, Harmony shades with mod 5, Rhythm drums on parity and position, Digits plays the last four decimal digits as a run of notes, and Pad roots a slow chord on mod 10.",
        "The scale and key live in Settings. Pentatonic keeps everything pleasant; chromatic is the most faithful to the raw numbers and the most tense.",
      ],
    },
  ],
};
