namespace RabinKarp {
  type Hash = {
    prime: number;
    base: number;
    val: number;
    leavingCoef: number;
  };

  const calcHash = (values: number[], prime: number, base: number): number =>
    values.reduce((h, n) => (h * base + n) % prime, 0);

  const buildHash = (values: number[], prime: number, base: number): Hash => {
    const leavingCoef = values
      .slice(0, -1)
      .reduce((h, _) => (h * base) % prime, 1);
    // pow ( base, len -1) % prime

    const val = calcHash(values, prime, base);

    return { leavingCoef, base, prime, val };
  };

  const slide = (
    { val, leavingCoef, prime, base }: Hash,
    oldSymbol: number,
    nextSymbol: number
  ): Hash => {
    const newVal =
      ((val - leavingCoef * oldSymbol) * base + nextSymbol) % prime;

    return {
      prime,
      base,
      val: newVal > 0 ? newVal : newVal + prime,
      leavingCoef
    };
  };

  const findPattern = (
    input: number[],
    pattern: number[],
    onFind: (at: number) => void
  ) => {
    const base = 10;
    const prime = 101;

    const patternHash = calcHash(pattern, prime, base);
    let slidingHash = buildHash(input.slice(0, pattern.length), prime, base);

    console.log("start ", patternHash, slidingHash);
    input.slice(0, -pattern.length).reduce((h, c, i) => {
      console.log("iter ", h.val, { c, i });

      if (patternHash === h.val && exactMatch(input, i, pattern)) {
        onFind(i);
      }

      return slide(h, c, input[i + pattern.length]);
    }, slidingHash);
  };

  const exactMatch = (
    input: number[],
    at: number,
    pattern: number[]
  ): boolean => pattern.reduce((m, c, i) => m && c === input[at + i], true);

  findPattern([0, 1, 2, 6, 6, 1, 2], [2, 6], i => console.log(`found at ${i}`));
}
