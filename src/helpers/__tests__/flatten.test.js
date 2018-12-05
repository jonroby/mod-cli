const flatten = require("../flatten");

describe("flatten", () => {
  test("returns undefined if no function is passed", () => {
    const result = flatten(undefined);
    expect(result).toEqual([]);
  });
  test("returns flat array if original array is flat", () => {
    const result = flatten([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test("returns flat array if original array is flat", () => {
    const result = flatten([[1, 2], 3, [4, 5]]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
