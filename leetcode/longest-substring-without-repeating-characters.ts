// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

// Given a string, find the length of the longest substring without repeating characters.

// Examples:

// Given "abcabcbb", the answer is "abc", which the length is 3.

// Given "bbbbb", the answer is "b", with the length of 1.

// Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

type Running = {
  longest: number;
  start: number;
  positions: Map<string, number>;
  // positions: { [char: string]: number | undefined };
};

const lengthOfLongestSubstring = (s: string): number =>
  s.split("").reduce<Running>(
    ({ longest, start, positions }, char, i) => {
      const pos = positions.get(char);
      positions.set(char, i);

      const res: Running =
        pos === undefined || pos < start
          ? {
              longest: Math.max(longest, i - start + 1),
              start,
              positions
            }
          : {
              longest: Math.max(longest, i - pos),
              start: pos + 1,
              positions
            };
      console.log({ char, i, res });
      return res;
    },
    {
      longest: 0,
      start: 0,
      positions: new Map<string, number>()
    }
  ).longest;

console.log(lengthOfLongestSubstring("abcabcbb"));
//console.log(lengthOfLongestSubstring("abba"));
