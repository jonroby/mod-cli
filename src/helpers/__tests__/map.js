const map = require("../map");

describe("map", () => {
  test("correctly maps", () => {
    const result = map(x => x + 1)([1,2,3,4]);
    expect(result).toEqual([2,3,4,5]);
  });

  test("returns function after partially applied", () => {
    const result = map(x => x + 1);
    expect(result).toBeInstanceOf(Function);
  });
});
