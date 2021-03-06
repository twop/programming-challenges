// https://leetcode.com/problems/majority-element/description/

// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the majority element always exist in the array.

// Example 1:

// Input: [3,2,3]
// Output: 3

// Example 2:

// Input: [2,2,1,1,1,2,2]
// Output: 2

const majorityElementFunc = (nums: number[]): number =>
  nums.reduce<[number, number]>(
    ([count, candidate], val) =>
      count === 0
        ? [1, val]
        : val === candidate
          ? [count + 1, candidate]
          : [count - 1, candidate],
    [0, 0]
  )[1];

const majorityElement = (nums: number[]) => {
  let count = 1;
  let cnd = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === cnd) {
      count++;

      if (count > nums.length / 2) {
        return cnd;
      }

      continue;
    } else if (count > 0) {
      count--;
      continue;
    }

    // count === 0
    cnd = nums[i];
    count++;
  }

  return cnd;
};
