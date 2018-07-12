// https://leetcode.com/problems/integer-to-roman/description/

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

// Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.

// Example 1:

// Input: 3
// Output: "III"

type RomeNum = [string, number];

const nums: RomeNum[] = [
  ["M", 1000],
  ["D", 500],
  ["C", 100],
  ["L", 50],
  ["X", 10],
  ["V", 5],
  ["I", 1]
];

const specialCases: RomeNum[] = [
  ["IV", 4],
  ["IX", 9],
  ["XL", 40],
  ["XC", 90],
  ["CD", 400],
  ["CM", 900]
];

const merged = [...nums, ...specialCases].sort(([_, a], [__, b]) => b - a);

` 
Input: 3
Output: "III"

[3,""] -> -1 -> [2,"I"] ->  -1 -> [1, "III"] -> -1 -> [0, 'III']
`;

// [3, ''] -> [2, 'I'] ...
const intToRoman = (n: number, curStr = ""): string => {
  if (n <= 0) return curStr;

  for (const [rome, val] of merged) {
    if (n >= val) {
      return intToRoman(n - val, curStr + rome);
    }
  }

  return curStr;
};

const testNum = ([num, expected]: [number, string]) =>
  console.log(
    `${num} -> ${expected} = ${
      intToRoman(num) === expected ? "ok" : "false : " + intToRoman(num)
    }`
  );

[[3, "III"], [4, "IV"], [9, "IX"], [58, "LVIII"], [1994, "MCMXCIV"]].forEach(
  testNum
);
