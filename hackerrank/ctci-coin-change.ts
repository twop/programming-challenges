// https://www.hackerrank.com/challenges/ctci-coin-change/problem

// Given a number of dollars and an array of denominations of coins, determine how many ways you can make change.
// For example, making change for n=4 dollars from coin denominations coins=[1,2,3] , there are ways to make change:

/// 1 1 1 1
/// 2 1 1
/// 2 2
/// 3 1

// watched youtube video to solve that.
// seems like an odd one
function ways(n: number, coins: number[]) {
  const running = new Array(n + 1).fill(0).fill(1, 0, 1);

  for (const coin of coins) {
    for (let i = 1; i < running.length; i++) {
      if (i >= coin) running[i] += running[i - coin];
    }
  }

  return running[n];
}
