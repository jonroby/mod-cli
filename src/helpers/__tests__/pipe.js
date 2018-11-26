const pipe = require("../pipe");

describe("pipe", () => {
  test("returns undefined if no function is passed", () => {
    const result = pipe();
    expect(result).toBe(undefined);
  });

  test("returns result of function if only one function is passed", () => {
    const result = pipe(() => 42);
    expect(result()).toBe(42);
  });

  test("returns result of composition of two functions", () => {
    const f1 = x => x + 11;
    const f2 = x => x + 17;
    const result = pipe(f1, f2);
    expect(result(14)).toBe(42);
  });

  test("returns result of composition of three functions", () => {
    const f1 = x => x + 1;
    const f2 = x => x * 2;
    const f3 = x => x + 40;
    const result = pipe(f1, f2, f3);
    expect(result(0)).toBe(42);
  });
});
