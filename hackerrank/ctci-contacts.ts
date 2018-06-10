function f() {
  type Trie = {
    char: string;
    leafs?: { [char: string]: Trie | undefined };
    final: boolean;
  };

  function addWord(word: string, trie: Trie, start: number = 0): Trie {
    if (start === word.length) return trie;

    const final = start === word.length - 1;
    const char = word.charAt(start);

    const leafs = trie.leafs || {};
    const leaf: Trie = addWord(
      word,
      updateFinal(leafs[char] || { char, final }, final),
      start + 1
    );

    return { ...trie, leafs: { ...leafs, ...{ [char]: leaf } } };
  }

  function countWords(trie: Trie, prefix: string, start: number): number {
    if (start < prefix.length) {
      const char = prefix.charAt(start);
      const leaf = trie.leafs && trie.leafs[char];
      return leaf ? countWords(leaf, prefix, start + 1) : 0;
    }

    return countFinal(trie);
  }

  function countFinal(trie: Trie): number {
    const count = trie.final ? 1 : 0;
    const { leafs } = trie;
    return leafs
      ? Object.keys(leafs)
          .map(key => leafs[key])
          .reduce((sum, leaf) => sum + countFinal(check(leaf)), count)
      : count;
  }

  function check<T>(val: T | undefined | null): T {
    if (val === undefined || val === null) throw "val is undefined";
    return val;
  }

  const updateFinal = (trie: Trie, final: boolean): Trie => ({
    ...trie,
    final: trie.final || final
  });

  function printTrie(trie: Trie): void {
    console.log(JSON.stringify(trie));
  }

  const initial: Trie = { char: "root", final: false };

  const trie: Trie = ["hacker", "hackerrank"].reduce(
    (prev, word) => addWord(word, prev),
    initial
  );

  // printTrie(trie);

  console.log("total", countWords(trie, "hac", 0));
}
