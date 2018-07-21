//https://leetcode.com/problems/divide-two-integers/description/

// Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

// Return the quotient after dividing dividend by divisor.

// The integer division should truncate toward zero.

// Example 1:

// Input: dividend = 10, divisor = 3
// Output: 3

// Example 2:

// Input: dividend = 7, divisor = -3
// Output: -2

// Note:

//     Both dividend and divisor will be 32-bit signed integers.
//     The divisor will never be 0.
//     Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

const divide = (dividend: number, divisor: number): number => {
  const negative =
    (dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0);

  if (dividend === -(1 << 31) && divisor === -1) {
    return 1 << (31 - 1);
  }

  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  const res = div(dividend, divisor, 0, 0);
  return negative ? -res : res;
};

const div = (
  dividend: number,
  divisor: number,
  shift: number,
  res: number
): number => {
  if (dividend < divisor) {
    return res;
  }

  const left = dividend - (divisor << shift);
  console.log({ left, dividend, divisor, shift, res });

  if (left > 0) {
    return div(dividend, divisor, shift + 1, res);
  }

  if (left === 0) {
    return res + shift + 1;
  }

  return div(dividend - (divisor << (shift - 1)), divisor, 0, res + shift);
};

const tests = [
  [3, 3, 1],
  [6, 3, 2],
  [2, 3, 0],
  [7, 3, 2],
  [3, -3, -11],
  [-1, 1, -1],
  [-1, -1, 1],
  [-2147483648, -1, (1 << 31) - 1] // UNSOLVED TODO
]; //[5,3,1]

tests.forEach(([dvd, dvs, res]) =>
  console.log(
    `${dvd}/${dvs} = ${res} `,
    divide(dvd, dvs) === res ? "Ok" : `Failed, was ${divide(dvd, dvs)}`
  )
);
