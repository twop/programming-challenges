// https://www.hackerrank.com/challenges/ctci-queue-using-two-stacks/problem

const None = "none";
type Opt<T> = T | typeof None;
const isNone = <T>(v: Opt<T>): v is typeof None => v === None;

type Elem<T> = { val: T; next: Opt<Elem<T>> };
type Stack<T> = Elem<T>;

const S = {
  push: <T>(s: Opt<Stack<T>>, val: T): Stack<T> => ({ val, next: s }),
  pop: <T>(s: Stack<T>): { tail: Opt<Stack<T>>; val: T } => ({
    val: s.val,
    tail: s.next
  })
};

const reverseStack = <T>(s: Stack<T>): Stack<T> => {
  let reversed = S.push(None, s.val);
  let tail: Opt<Stack<T>> = s.next;

  while (!isNone(tail)) {
    reversed = S.push(reversed, tail.val);
    tail = tail.next;
  }

  return reversed;
};

type Queue<T> = { inOrder: Opt<Stack<T>>; reversed: Opt<Stack<T>> };

const Q = {
  enqueue: <T>({ inOrder, reversed }: Queue<T>, val: T): Queue<T> => ({
    inOrder: S.push(inOrder, val),
    reversed
  }),
  dequeue: <T>({ inOrder, reversed }: Queue<T>): Queue<T> =>
    !isNone(reversed)
      ? { inOrder, reversed: S.pop(reversed).tail }
      : !isNone(inOrder)
        ? { inOrder: None, reversed: S.pop(reverseStack(inOrder)).tail }
        : { inOrder, reversed },

  front: <T>(q: Queue<T>): { q: Queue<T>; front: Opt<T> } => {
    if (!isNone(q.reversed)) {
      return { q, front: q.reversed.val };
    }

    if (!isNone(q.inOrder)) {
      const reversed = reverseStack(q.inOrder);
      return { q: { inOrder: None, reversed }, front: reversed.val };
    }

    return { q, front: None };
  }
};

function processData(input: string, log: (s: string) => void) {
  type QN = Queue<number>;

  const addOp = (num: number, q: QN) => Q.enqueue(q, num);
  const printFront = (queue: QN) => {
    const { q, front } = Q.front(queue);
    if (!isNone(front)) {
      log(front.toString());
    }
    return q;
  };

  input
    .split("\n")
    .slice(1)
    .reduce<Queue<number>>(
      (q, s) =>
        s.startsWith("2")
          ? Q.dequeue(q)
          : s.startsWith("3")
            ? printFront(q)
            : addOp(Number(s.split(" ")[1]), q),
      { inOrder: None, reversed: None }
    );
}

// const data = `8
// 1 15
// 1 17
// 3
// 1 25
// 2
// 3
// 2
// 3`;

// processData(data, console.log);
