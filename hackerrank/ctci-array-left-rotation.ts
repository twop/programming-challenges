const leftRotate = (arr: number[], shift: number): number[] =>
  arr.slice(shift).concat(arr.slice(0, shift));

const printArray = (arr: number[]) => arr.join(" ");

const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(0, 4));
console.log(arr.slice(4));

const str = printArray(leftRotate(arr, 4));

console.log(str);
