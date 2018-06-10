type Trie = {
  key: string;
  leafs?: Map<string, Trie>;
  final: boolean;
};

enum DiffType {
  includes = 0,
  diff = 1,
  smaller = 2,
  equals = 3
}

type Diff = {
  pos?: number;
  type: DiffType;
};

function findDiff(key: string, word: string): Diff {
  for (let pos = 0; pos < word.length; pos++) {
    if (pos === key.length) {
      return { type: DiffType.smaller };
    }

    const wordChar = word.charAt(pos);
    const keyChar = key.charAt(pos);

    if (wordChar !== keyChar) {
      return { pos, type: DiffType.diff };
    }
  }

  return word.length === key.length
    ? { type: DiffType.equals }
    : { type: DiffType.includes };
}

function fork(trie: Trie, pos: number, word: string): Trie {
  const wordKey = word.substring(pos);
  const forkedKey = trie.key.substring(pos);
  const leafs = new Map()
    .set(wordKey.charAt(0), { key: wordKey, final: true })
    .set(forkedKey.charAt(0), { ...trie, key: forkedKey });

  return { key: word.substring(0, pos), leafs, final: false };
}

function include(trie: Trie, word: string): Trie {
  const remaining = trie.key.substring(word.length);
  const leafs = new Map().set(remaining.charAt(0), { ...trie, key: remaining });
  return { key: word, leafs, final: true };
}

function handleSmaller(trie: Trie, word: string): Trie {
  const remaining = word.substring(trie.key.length);
  const leafs = trie.leafs || new Map<string, Trie>();

  const char = remaining.charAt(0);
  const existing = leafs.get(char);

  if (existing === undefined) {
    leafs.set(char, { key: remaining, final: true });
    return { ...trie, leafs };
  }

  return { ...trie, leafs: leafs.set(char, addWord(existing, remaining)) };
}

function addWord(trie: Trie, word: string): Trie {
  const diff = findDiff(trie.key, word);

  switch (diff.type) {
    case DiffType.equals:
      return final(trie);
    case DiffType.diff:
      return fork(trie, check(diff.pos), word);
    case DiffType.includes:
      return include(trie, word);
    case DiffType.smaller:
      return handleSmaller(trie, word);
  }
}

const final = (trie: Trie): Trie =>
  trie.final ? trie : { ...trie, final: true };

function check<T>(val: T | undefined | null): T {
  if (val === undefined || val === null) throw "val is undefined";
  return val;
}

function countWords(trie: Trie, prefix: string): number {
  const diff = findDiff(trie.key, prefix);

  switch (diff.type) {
    case DiffType.equals:
      return countFinal(trie);
    case DiffType.diff:
      return 0;
    case DiffType.includes:
      return countFinal(trie);
    case DiffType.smaller:
      const remaining = prefix.substring(trie.key.length);
      const leaf = trie.leafs && trie.leafs.get(remaining.charAt(0));
      return leaf ? countWords(leaf, remaining) : 0;
  }

  return countFinal(trie);
}

function countFinal(trie: Trie): number {
  let count = trie.final ? 1 : 0;
  const { leafs } = trie;
  if (leafs) {
    for (let child of leafs.values()) {
      count += countFinal(child);
    }
  }
  return count;
}

function printTrie(trie: Trie): void {
  console.log("trie: ", trie);
}

const initial: Trie = { key: "", final: false };

const trie: Trie = ["hacker", "hackerrank"].reduce(
  (prev, word) => addWord(prev, word),
  initial
);

printTrie(trie);

console.log("total", countWords(trie, "hac"));
