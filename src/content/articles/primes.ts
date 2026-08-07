import type { WikiArticle } from "../infoContent";

export const article: WikiArticle = {
  id: "primes",
  title: "The primes keep surprising us",
  summary: "The building blocks of multiplication still hide their most basic patterns.",
  icon: "lock-closed-outline",
  sections: [
    {
      id: "prime-rule",
      title: "Atoms of multiplication",
      body: [
        "A prime is a whole number greater than 1 with exactly two positive divisors: 1 and itself. Every whole number above 1 has one unique factorization into primes, which is why primes are the basic pieces of arithmetic.",
        "Their positions look irregular, but they are not random. The prime number theorem says the nth prime is about n log n, so gaps slowly widen on average while still making dramatic local surprises.",
      ],
      anums: ["A000040", "A001359", "A000720"],
    },
    {
      id: "prime-see",
      title: "See it",
      body: [
        "Open the prime sequence in the mod grid or compare primes with composites. The grid reveals which remainders can contain primes, while the comparison shows the prime side thinning out without ever disappearing.",
      ],
    },
    {
      id: "prime-real-world",
      title: "In the real world",
      body: [
        "Public-key cryptography depends on problems involving very large primes. Your device can publish a key for others to use without publishing the private information that makes its security work.",
      ],
    },
    {
      id: "prime-open-door",
      title: "An open door",
      body: [
        "Twin primes differ by two, like 11 and 13. We know there are infinitely many pairs of primes that are not too far apart, but nobody has proved that infinitely many twin-prime pairs exist.",
      ],
      links: [
        { label: "Prime numbers, OEIS A000040", url: "https://oeis.org/A000040" },
        { label: "Twin primes, OEIS A001359", url: "https://oeis.org/A001359" },
        { label: "NIST Digital Signature Standard", url: "https://csrc.nist.gov/pubs/fips/186-5/final" },
      ],
    },
  ],
};
