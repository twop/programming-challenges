// https://www.programcreek.com/2014/05/leetcode-nested-list-weight-sum-java/

// Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Example 1:
// Given the list [[1,1],2,[1,1]], return 10. (four 1's at depth 2, one 2 at depth 1)

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

const depthSum = (nestedList: RecursiveArray<number>, depth = 1): number =>
  nestedList.reduce<number>(
    (s, v) => (Array.isArray(v) ? s + depthSum(v, depth + 1) : s + v * depth),
    0
  );

console.log(
  "depthSum([[1,1],2,[1,1]]) === 10)",
  depthSum([[1, 1], 2, [1, 1]]) === 10
);
