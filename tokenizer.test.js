const { tokenize, isSpace, isDigit } = require("./tokenizer");

// 空文字判定のテスト
it("isSpace", () => {
  expect(isSpace(" ")).toBe(true);
  expect(isSpace("  ")).toBe(true);
  expect(isSpace("a")).toBe(false);
  expect(isSpace("1")).toBe(false);
  expect(isSpace("-")).toBe(false);
  expect(isSpace("")).toBe(false);
});

// 数字判定のテスト
it("isDigit", () => {
  expect(isDigit("1")).toBe(true);
  expect(isDigit("2")).toBe(true);
  expect(isDigit("0")).toBe(true);
  expect(isDigit("9")).toBe(true);
  expect(isDigit("a")).toBe(false);
  expect(isDigit(" ")).toBe(false);
});

// Tokenizeできているかどうかのテスト
it("(+ 1 2 3)", () => {
  expect(tokenize("(+ 1 2 3)")).toEqual([
    { type: "LPAREN" },
    { type: "OPERATOR", val: "+" },
    { type: "NUMBER", val: 1 },
    { type: "NUMBER", val: 2 },
    { type: "NUMBER", val: 3 },
    { type: "RPAREN" },
  ]);
});

it("(+ 1 2(+ 4 1)3)", () => {
  expect(tokenize("(+ 1 2(+ 4 1)3)")).toEqual([
    { type: "LPAREN" },
    { type: "OPERATOR", val: "+" },
    { type: "NUMBER", val: 1 },
    { type: "NUMBER", val: 2 },
    { type: "LPAREN" },
    { type: "OPERATOR", val: "+" },
    { type: "NUMBER", val: 4 },
    { type: "NUMBER", val: 1 },
    { type: "RPAREN" },
    { type: "NUMBER", val: 3 },
    { type: "RPAREN" },
  ]);
});


