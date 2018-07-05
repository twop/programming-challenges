// https://leetcode.com/problems/add-two-numbers/description/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

class ListNode<T> {
  constructor(public readonly val: T, public next: ListNode<T> | null = null) {}
}

const mkNode = <T>(val: T, next: ListNode<T> | null = null) => {
  const node = new ListNode(val);
  node.next = next;
  return node;
};

const addTwoNumbers = (
  l1: ListNode<number> | null,
  l2: ListNode<number> | null,
  leftOver: number = 0
): ListNode<number> | null => {
  if (l1 === null && l2 === null) return leftOver > 0 ? mkNode(leftOver) : null;
  const v = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + leftOver;
  return mkNode(
    v % 10,
    addTwoNumbers(l1 && l1.next, l2 && l2.next, v > 9 ? 1 : 0)
  );
};

console.log(addTwoNumbers(mkNode(5), mkNode(7, mkNode(1))));

const l1 = mkNode(2, mkNode(4, mkNode(3)));
const l2 = mkNode(5, mkNode(6, mkNode(4)));
console.log(addTwoNumbers(l1, l2));
console.log(addTwoNumbers(mkNode(5), mkNode(5)));
