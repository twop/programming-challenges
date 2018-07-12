// https://leetcode.com/problems/roman-to-integer/description/

// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

// For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

//     I can be placed before V (5) and X (10) to make 4 and 9.
//     X can be placed before L (50) and C (100) to make 40 and 90.
//     C can be placed before D (500) and M (1000) to make 400 and 900.

// Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

// Example 1:

// Input: "III"
// Output: 3

namespace str_to_rome {
  type RomeNum = [string, number];
  const nums: RomeNum[] = [
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000]
  ];

  const map: { [key: string]: number } = nums.reduce(
    (m, [rome, val]) => ({ ...m, [rome]: val }),
    {}
  );

  const romanToInt = (s: string) =>
    s.split("").reduce(
      ({ sum, prev }, char) => {
        const val = map[char] || 0;
        return { sum: sum - (val > prev ? 2 * prev : 0) + val, prev: val };
      },
      { sum: 0, prev: Number.MAX_VALUE }
    ).sum;

  const testNum = ([num, str]: [number, string]) =>
    console.log(
      `${str} -> ${num} = ${
        romanToInt(str) === num ? "ok" : "false : " + romanToInt(str).toString()
      }`
    );

  [[3, "III"], [4, "IV"], [9, "IX"], [58, "LVIII"], [1994, "MCMXCIV"]].forEach(
    testNum
  );
}
