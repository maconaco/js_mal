function isSpace(c) {
  return /\s+/.test(c);
};

function isDigit(c) {
  return /\d+/.test(c);
};

const createOperator = (op, operands) => ({operator: op, operands});
const createNumber = (buf) => ({number: Number(buf)});

const tokenize = (source) => {
  let i = 0, c = "";
  tokens = []
  for (i = 0; i < source.length; i++) {
    c = source.charAt(i)

    if (isSpace(c)) {
      continue;
    }
    let token = null;
    operands = []
    buf = "";
    // number取れたら次はoperatorなので
    if (isDigit(c)) {
      buf += c;
      // token = createNumber(buf);
    }

    operands.push(createNumber(buf));

    op = null;

    if (["+", "*", "-", "/"].indexOf(c) !== -1) {
      op = c
    }

    switch (op) {
      case "+":
      case "*":
      case "-":
      case "/":
        token = createOperator(op);
      default:
        break;
    }

    if (token) {
      tokens.push(token);
      continue;
    }
  }
  return tokens;
};

module.exports ={
  tokenize: tokenize,
}
