// src/content/infoContent.ts
//
// The wiki: articles made of sections. The About tab lists articles;
// /wiki/[id] renders one. Body paragraphs may carry $LaTeX$; `anums`
// render as tappable sequence chips.
//
// Article content lives in ./articles/<id>.ts, one file per article.

import { article as appManual } from "./articles/app-manual";
import { article as catalan } from "./articles/catalan";
import { article as deepEnd } from "./articles/deep-end";
import { article as digitsAndBases } from "./articles/digits-and-bases";
import { article as famous } from "./articles/famous";
import { article as fibonacci } from "./articles/fibonacci";
import { article as gettingStarted } from "./articles/getting-started";
import { article as hearing } from "./articles/hearing";
import { article as oeisGuide } from "./articles/oeis-guide";
import { article as partitions } from "./articles/partitions";
import { article as primes } from "./articles/primes";
import { article as seeing } from "./articles/seeing";
import { article as simpleMysteries } from "./articles/simple-mysteries";

export { WIKI_IMAGES } from "./wikiImages";

export interface InfoLink {
  label: string;
  url: string;
}

export interface WikiImage {
  /** require()'d bundled asset (downloaded from Wikimedia Commons). */
  source: number;
  caption: string;
  /** Author + license, shown under the caption, linking to the file page. */
  credit: string;
  creditUrl: string;
  /** width / height of the bundled file. */
  aspectRatio: number;
}

export interface PullQuote {
  text: string;
  attribution: string;
}

export interface InfoSection {
  id: string;
  /** Omitted for book-flow chapters whose prose runs without subheadings. */
  title?: string;
  body?: string[];
  links?: InfoLink[];
  bullets?: string[];
  /** Sequences to open in-app, rendered as chips under the section. */
  anums?: string[];
  image?: WikiImage;
  quote?: PullQuote;
}

export interface WikiArticle {
  id: string;
  title: string;
  summary: string;
  /** Ionicons name for the index card. */
  icon: string;
  sections: InfoSection[];
  /** Numbered Further Reading entries; [n] markers in body text refer here. */
  citations?: string[];
}

export const WIKI_ARTICLES: WikiArticle[] = [
  gettingStarted,
  oeisGuide,
  famous,
  fibonacci,
  catalan,
  simpleMysteries,
  digitsAndBases,
  partitions,
  primes,
  seeing,
  hearing,
  deepEnd,
  appManual,
];

/** Flat view of every section, for search and tests. */
export const INFO_SECTIONS: InfoSection[] = WIKI_ARTICLES.flatMap((a) => a.sections);

export function getArticle(id: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find((a) => a.id === id);
}

export function getInfoSection(id: string): InfoSection | undefined {
  return INFO_SECTIONS.find((s) => s.id === id);
}
