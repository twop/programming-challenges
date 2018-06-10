const matches: { [start: string]: string | undefined } = {
  "{": "}",
  "(": ")",
  "[": "]"
};

const closing = ["}", "]", ")"];
const isClosing = (s: string) => closing.indexOf(s) >= 0;
const isMatch = (start: string, end: string) => matches[start] === end;

function isBalanced(seq: string, stack: string[] = []): boolean {
  if (seq.length === 0) return stack.length === 0;
  const char = seq.charAt(0);

  const top = stack.length > 0 && stack[stack.length - 1];

  if (isClosing(char)) {
    if (!top) return false;
    if (!isMatch(top, char)) return false;
    stack.pop();
  } else {
    stack.push(char);
  }

  return isBalanced(seq.substring(1), stack);
}

const test1 = [
  "}][}}(}][))]",
  "[](){()}",
  "()",
  "({}([][]))[]()",
  "{)[](}]}]}))}(())("
];

const test2 = ["{[()]}", "{[(])}", "{{[[(())]]}}"];

const trace = (arr: string[]) =>
  arr
    .map(s => isBalanced(s))
    .map(balanced => (balanced ? "YES" : "NO"))
    .forEach(res => console.log(res));

trace(test1);
