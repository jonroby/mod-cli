const unspool = require("../unspool");

describe("unspool", () => {
  test("correctly unspools", () => {
    const result = unspool(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(result).toEqual({ l: ['a', 'c', 'e'], r: ['b', 'd', 'f'] });
  });
});
