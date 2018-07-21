// eval '2*3 + 4 * 5', followup introduce brackets "("  '2*(3+4)*5';
namespace eval_math_exp {
  type Token = {
    tag: "lit" | "op" | "leftBracket" | "rightBracket";
    val: string;
  };

  const charToToken = (val: string): Token =>
    val >= "0" && val <= "9"
      ? { tag: "lit", val }
      : val === "("
        ? { tag: "leftBracket", val }
        : val === ")"
          ? { tag: "rightBracket", val }
          : { tag: "op", val };

  const tokenize = (expStr: string): Token[] =>
    expStr
      .replace(/\s+/g, "")
      .split("")
      .reduce<Token[]>((tokens, char) => {
        const token = charToToken(char);
        const last: Token | undefined = tokens[tokens.length - 1];

        // mutable
        if (last && last.tag === "lit" && token.tag === "lit") {
          last.val += token.val;
        } else {
          tokens.push(token);
        }

        return tokens;

        // immutable
        // if (last && last.tag === "lit" && token.tag === "lit") {
        //   return tokens
        //     .slice(0, tokens.length - 2)
        //     .concat({ tag: "lit", val: last.val + token.val });
        // }

        // return tokens.concat(token);
      }, []);

  // type Op = '-' | '+' | '/' | '*';

  const precedence: { [op: string]: number } = {
    "-": 1,
    "+": 1,
    "/": 2,
    "*": 2
  };

  type Computation = {
    res: Token[];
    opStack: Token[];
  };

  const peek = (stack: Token[]): Token | undefined => stack[stack.length - 1];

  const toReversePolishNotation = (tokens: Token[]): Token[] => {
    const { res, opStack } = tokens.reduce<Computation>(
      ({ res, opStack }, t) => {
        if (t.tag === "lit") {
          return { res: res.concat(t), opStack };
        }

        if (t.tag === "op") {
          let stackTop = peek(opStack);

          while (stackTop && precedence[stackTop.val] >= precedence[t.val]) {
            res.push(stackTop);
            opStack.pop();
            stackTop = peek(opStack);
          }

          return { res, opStack: opStack.concat(t) };
        }

        if (t.tag === "leftBracket") {
          return { res, opStack: opStack.concat(t) };
        }

        if (t.tag === "rightBracket") {
          let stackTop = peek(opStack);

          while (stackTop && stackTop.tag !== "leftBracket") {
            res.push(stackTop);
            opStack.pop();
            stackTop = peek(opStack);
          }

          opStack.pop();
          return { res, opStack };
        }

        // opStack.reduceRight<Token[]>((toOtput, op) => precedence[op.val] > precedence[t.val] ? , [])

        return { res, opStack };
      },
      { res: [], opStack: [] }
    );

    return res.concat(opStack.reverse());
  };
  //   while there are tokens to be read:
  //     read a token.
  //     if the token is a number, then:
  //         push it to the output queue.
  //     if the token is a function then:
  //         push it onto the operator stack
  //     if the token is an operator, then:
  //         while ((there is a function at the top of the operator stack)
  //                or (there is an operator at the top of the operator stack with greater precedence)
  //                or (the operator at the top of the operator stack has equal precedence and is left associative))
  //               and (the operator at the top of the operator stack is not a left bracket):
  //             pop operators from the operator stack onto the output queue.
  //         push it onto the operator stack.
  //     if the token is a left bracket (i.e. "("), then:
  //         push it onto the operator stack.
  //     if the token is a right bracket (i.e. ")"), then:
  //         while the operator at the top of the operator stack is not a left bracket:
  //             pop the operator from the operator stack onto the output queue.
  //         pop the left bracket from the stack.
  //         /* if the stack runs out without finding a left bracket, then there are mismatched parentheses. */
  // if there are no more tokens to read:
  //     while there are still operator tokens on the stack:
  //         /* if the operator token on the top of the stack is a bracket, then there are mismatched parentheses. */
  //         pop the operator from the operator stack onto the output queue.
  // exit.

  type Exp = Val | Op;

  type Op = { tag: "op"; op: string; a: Exp; b: Exp };
  type Val = { tag: "val"; val: number };

  const EvalOp: { [op: string]: (a: number, b: number) => number } = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "/": (a, b) => a / b,
    "*": (a, b) => a * b
  };

  type ExpComputation = Exp[];

  const tokensToExp = (rpnTokens: Token[]): Exp =>
    rpnTokens.reduce<ExpComputation>((comp, cur) => {
      // console.log(comp.map(exp2Str), { cur });
      if (cur.tag === "lit")
        return comp.concat({ tag: "val", val: Number(cur.val) });
      const [a, b] = comp.slice(-2);
      return comp
        .slice(0, comp.length - 2)
        .concat({ tag: "op", op: cur.val, a, b });
    }, [])[0];

  const evalStr = (expStr: string): number =>
    evalExp(tokensToExp(toReversePolishNotation(tokenize(expStr))));

  const evalExp = (exp: Exp): number => {
    switch (exp.tag) {
      case "op":
        return EvalOp[exp.op](evalExp(exp.a), evalExp(exp.a));
      case "val":
        return exp.val;
    }
  };

  const exp2Str = (exp: Exp): string => {
    switch (exp.tag) {
      case "op":
        return `(${exp2Str(exp.a)} ${exp.op} ${exp2Str(exp.b)})`;
      case "val":
        return exp.val.toString();
    }
  };

  const example = "2*3 + 4/(1+1)";
  // console.log(toReversePolishNotation(tokenize(example)));
  const exp = tokensToExp(toReversePolishNotation(tokenize(example)));
  console.log(exp2Str(exp));
  // console.log(evalExp(exp));
  console.log(evalStr(example));
}
