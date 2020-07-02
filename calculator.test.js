const { tokenize, evaluate } = require('./calculator');

const { calculator } = require('./new_calculator');

test("1 + 2", () => {
  expect(calculator("1 + 2")).toEqual(3);
});

test("1 + 2 + 3 + 4 + 5", () => {
  expect(calculator("1 + 2 + 3 + 4 + 5")).toEqual(15);
});
test("1 - 2 * 3 + 4 + 5", () => {
  expect(calculator("1 - 2 * 3 + 4 + 5")).toEqual(6);
});
