// https://www.programcreek.com/2014/08/leetcode-nested-list-weight-sum-ii-java/

// Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Different from the previous question where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.

// Example 1:
// Given the list [[1,1],2,[1,1]], return 8. (four 1's at depth 1, one 2 at depth 2)

// Example 2:
// Given the list [1,[4,[6]]], return 17. (one 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17)

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

type DepthMap = {
  [key: number]: number[];
};

const depthSum2 = (nestedList: RecursiveArray<number>): number => {
  const map = aggregate(nestedList, 1, {});

  const levels = Object.keys(map).map(Number);

  return levels
    .map(l => map[l].reduce((s, v) => s + v * (levels.length + 1 - l), 0))
    .reduce((s, levelSum) => s + levelSum, 0);
};

const aggregate = (
  nestedList: RecursiveArray<number>,
  depth = 1,
  map: DepthMap = {}
): DepthMap =>
  nestedList.reduce<DepthMap>(
    (m, val) =>
      Array.isArray(val)
        ? aggregate(val, depth + 1, m)
        : addToMap(m, val, depth),
    map
  );

const addToMap = (map: DepthMap, val: number, depth: number): DepthMap => {
  const existing = map[depth];
  return { ...map, [depth]: existing ? [...existing, val] : [val] };
};

console.log(
  "depthSum2([[1,1],2,[1,1]]) === 8)",
  depthSum2([[1, 1], 2, [1, 1]]) === 8
);

console.log("depthSum2([1,[4,[6]]]) === 17)", depthSum2([1, [4, [6]]]) === 17);
