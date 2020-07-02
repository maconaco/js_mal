function isSpace(c) {
  return /\s+/.test(c);
};

function isDigit(c) {
  return /\d+/.test(c);
};

/* source = "1 + 2"

const calculator = (source) => {
  num1 = Number(source[0]);
  op = source[2];
  num2 = Number(source[4]);

  r = null;
  console.log(op);
  console.log(num2);
  switch (op) {
    case "+": r = num1 + num2;
      break;
    case "*": r = num1 * num2;
      break;
    case "-": r = num1 - num2;
      break;
    case "/": r = num1 / num2;
      break;
    default:
      break;
  }
  return r
};
*/

/* source = "1 + 2 + 3"

const calculator = (source) => {
  num1 = Number(source[0]);
  op1 = source[2];
  num2 = Number(source[4]);
  op2 = source[6];
  num3 = Number(source[8]);

  r = null;
  switch (op1) {
    case "+": r = num1 + num2;
      break;
    case "*": r = num1 * num2;
      break;
    case "-": r = num1 - num2;
      break;
    case "/": r = num1 / num2;
      break;
    default:
      break;
  }
  result = null;
  switch (op2) {
    case "+": result = r + num3;
      break;
    case "*": result = r * num3;
      break;
    case "-": result = r - num3;
      break;
    case "/": result = r / num3;
      break;
    default:
      break;
  }
  console.log(result);
  return result;
};*/

const calculator = (source) => {
  let c = "";
  tokens = [];
  let result = 0;
  // 全要素取得までやる
  // スペース削除したい
  for (let i = 0; i < source.length; i++) {
    c = source[i]
    if (isSpace(c)) {
      continue;
    };
    if (["+", "*", "-", "/"].indexOf(c) !== -1) {
      tokens.push(c);
      continue;
    };

    buf = "";
    if (isDigit(c)) {
      buf += c;
      c = source[i++];
    };
    i--;
    tokens.push(Number(buf));
  }

  result = 0;
  op = null;
  c = "";

  for (let i = 0; i < tokens.length; i++) {
    c = tokens[i];
    if (["+", "*", "-", "/"].indexOf(c) !== -1) {
      op = c;
      continue;
    };

    switch (op) {
      case "+": result += c;
      break;
      case "*": result *= c;
      break;
      case "-": result -= c;
      break;
      case "/": result /= c;
      default: result = c;
      break;
    }
  }
  return result;
  /*r = null;
  index = 0;
  a = nums[index];
  b = nums[index+1];
    switch (op) {
      case "+": r = a + b;
        break;
      case "*": r = a * b;
        break;
      case "-": r = a - b;
        break;
      case "/": r = a / b;
        break;
      default:
        break;
    };
    result = r;
    w = null, q = null;

    for (i = 2; i < nums.length; i++) {
      i = 2;
      c = nums[i];
      w = q || result
      console.log(q || result);
      switch (operators[i]) {
        case "+": q = w + c;
          break;
        case "*": q = w * c;
          break;
        case "-": q = w - c;
          break;
        case "/": q = w / c;
          break;
        default:
          break;
      }
      console.log("------------  c" + c);
      answer = q;
    }
  console.log(answer);
  console.log(result);*/
}



module.exports = {
  calculator: calculator,
}
