//https://leetcode.com/problems/product-of-array-except-self/description/

// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

// Example:

// Input:  [1,2,3,4]
// Output: [24,12,8,6]

// Note: Please solve it without division and in O(n).

// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

const productExceptSelf = (nums: number[]): number[] => {
  let fromStart = 1;
  let fromEnd = 1;

  const size = nums.length;
  const res = new Array(size).fill(1);

  for (let i = 0; i < size; i++) {
    res[i] *= fromStart;
    fromStart *= nums[i];

    res[size - 1 - i] *= fromEnd;
    fromEnd *= nums[size - 1 - i];
  }

  return res;
};

const productExceptSelfExtraSpace = (nums: number[]): number[] => {
  const fromStart = new Array(nums.length).fill(1);
  const fromEnd = new Array(nums.length).fill(1);
  const res = new Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    fromStart[i] = nums[i - 1] * fromStart[i - 1];
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    fromEnd[i] = nums[i + 1] * fromEnd[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    res[i] = fromStart[i] * fromEnd[i];
  }

  return res;
};
