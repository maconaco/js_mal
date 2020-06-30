// TokenのType
const Types = {
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  OPERATOR: "OPERATOR",
  NUMBER: "NUMBER",
};
// 空文字の判定
function isSpace(c) {
  return /\s+/.test(c);
}
// 数字の判定
function isDigit(c) {
  return /\d+/.test(c);
}
// Tokenが"("だった時返すものを定義
const LParenToken = { type: Types.LPAREN };
Object.freeze(LParenToken);
// Tokenが")"だった時返すものを定義
const RParenToken = { type: Types.RPAREN };
Object.freeze(RParenToken);
// Tokenが"+" || "*" || "-" || "/" だった時返すものを定義
const createOperator = (c) => ({ type: Types.OPERATOR, val: c });
// TokenがisDigitだった時返すものを定義
const createNumber = (c) => ({ type: Types.NUMBER, val: +c });

const tokenize = (source) => {
  // 初期化作業
  let i = 0,
    c = "";
  const tokens = [];
  // 初期化式: i = 0;
  // 条件式: iがsourceの長さより小さい間(全要素の取得と無限ループ阻止)
  // 加算式: i++ する
  for (i = 0; i < source.length; i++) {
    // cにsourceのindex番号に対応する要素を入れる(文字)
    c = source[i];
    // cが空文字の場合
    if (isSpace(c)) {
      continue;
    }
    let token = null;
    switch (c) {
      case "(":
        token = LParenToken;
        break;
      case ")":
        token = RParenToken;
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        token = createOperator(c);
        break;
      default:
        break;
    }
    // tokenがこの時点で返されていれば
    if (token) {
      tokens.push(token);
      continue;
    }
    let buf = "";
    // cが数字の間
    while (isDigit(c)) {
      buf += c;
      c = source[++i];
    }
    i--;
    tokens.push(createNumber(buf));
  }
  return tokens;
};

module.exports = {
  isSpace: isSpace,
  isDigit: isDigit,
  tokenize: tokenize,
  Types: Types,
};
