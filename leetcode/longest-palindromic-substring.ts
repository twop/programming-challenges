// https://leetcode.com/problems/longest-palindromic-substring/description/

// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

// Example 2:

// Input: "cbbd"
// Output: "bb"

type CurMaximum = {
  length: number;
  left: number;
  right: number;
};

const findPalindrom = (
  curMax: CurMaximum,
  left: number,
  right: number,
  chars: string[]
): CurMaximum => {
  if (right > chars.length - 1 || left < 0) return curMax;
  if (chars[left] === chars[right]) {
    const curLen = right - left + 1;
    return findPalindrom(
      curLen > curMax.length ? { length: curLen, right, left } : curMax,
      left - 1,
      right + 1,
      chars
    );
  }

  return curMax;
};

const longestPalindrome = (s: string): string => {
  const { left, length } = s
    .split("")
    .reduce<CurMaximum>(
      (curMax, c, i, chars) =>
        findPalindrom(
          findPalindrom(curMax, i, i + 1, chars),
          i - 1,
          i + 1,
          chars
        ),
      {
        length: 1,
        left: 0,
        right: 1
      }
    );

  return s.substr(left, length);
};

console.log(longestPalindrome("baab"));
