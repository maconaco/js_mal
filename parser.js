const { Types: TokenTypes } = require("./tokenizer");

// Parserした結果のASTのType(種類)
const Types = {
  PROC_CALL: "PROC_CALL",
  NUMBER: "NUMBER",
};

const parse = (tokens) => {
  let i = 0;
  // 現在のindex番号に対応する要素を返す
  const cur = () => {
    if (i < tokens.length) {
      return tokens[i];
    }
    return {};
  };
  // 現在のindex番号のひとつ進めたindex番号に対応する要素を返す
  const shift = () => {
    if (i < tokens.length) {
      return tokens[i++];
    }
    return {};
  };
  // tokの要素があり、尚且つその要素のtypeが任意のものだった時に
  // index番号をひとつ進める
  const consume = (t) => {
    const tok = cur();
    if (tok && tok.type === t) {
      i++;
      return true;
    }
    return false;
  };
  // tokenがOperatorだった時に返すものを定義
  const createProcCall = (operator, operands) => ({
    type: Types.PROC_CALL,
    operator: operator.val,
    operands,
  });
  // tokenが数字だった時に返すものを定義
  const createNumber = (token) => ({ type: Types.NUMBER, val: token.val });

  const expr = () => {
    // 要素のtypeがLPARENなら
    if (consume(TokenTypes.LPAREN)) {
      // operatorはtokens[i++]
      const operator = shift();
      const operands = [];
      let node = null;
      // expr()される間
      while ((node = expr())) {
        // operandsにexprの結果をpushする
        operands.push(node);
        // 要素のTokenTypesがRPAREになったらwhile文を抜ける
        if (cur().type === TokenTypes.RPAREN) {
          break;
        }
      }
      // 要素のtypeがRPARENじゃなければ
      if (!consume(TokenTypes.RPAREN)) {
        throw new Error(`expected ')', got ${JSON.stringify(cur())}`);
      }
      // ProcCallを返す
      return createProcCall(operator, operands);
    }
    // 要素のTokenTypesがNUMBERなら
    if (cur().type === TokenTypes.NUMBER) {
      // 数字を返す
      return createNumber(shift());
    }
    throw new Error(`expected number, got ${JSON.stringify(cur())}`);
  };
  return expr();
};

module.exports = {
  parse: parse,
};
