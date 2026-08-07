// ponytail: WIKI_IMAGES lives here (not infoContent) to avoid a runtime
// import cycle: infoContent imports the article modules, and articles need
// these images at module-evaluation time.
import type { WikiImage } from "./infoContent";

/** Bundled Commons photos, keyed for reuse across articles. */
export const WIKI_IMAGES = {
  sunflower: {
    source: require("../../assets/wiki/sunflower.jpg"),
    caption:
      "A sunflower head. Count the clockwise and counterclockwise seed spirals: consecutive Fibonacci numbers.",
    credit: "L. Shyamal, CC BY-SA 2.5, Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Helianthus_whorl.jpg",
    aspectRatio: 640 / 480,
  },
  aloe: {
    source: require("../../assets/wiki/aloe.jpg"),
    caption:
      "Spiral aloe (Aloe polyphylla): five spiral arms of leaves, placed by the same golden-angle rule the polar spiral viz draws.",
    credit: "Stan Shebs, CC BY-SA 3.0, Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Aloe_polyphylla_1.jpg",
    aspectRatio: 1280 / 1090,
  },
  romanesco: {
    source: require("../../assets/wiki/romanesco.jpg"),
    caption:
      "Romanesco broccoli: spirals made of spirals, phyllotaxis repeating at every scale.",
    credit: "Iifar, CC BY-SA 4.0, Wikimedia Commons",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Romanesco_broccoli_(Brassica_oleracea).jpg",
    aspectRatio: 1280 / 1024,
  },
  yanghui: {
    source: require("../../assets/wiki/yanghui.gif"),
    caption:
      "Yang Hui's triangle, published in China around 1303, three centuries before Pascal.",
    credit: "Yang Hui, public domain, Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Yanghui_triangle.gif",
    aspectRatio: 704 / 1095,
  },
} satisfies Record<string, WikiImage>;
