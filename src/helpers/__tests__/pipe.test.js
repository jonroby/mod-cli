const pipe = require("../pipe");
const { STOP } = require("../../constants");

describe("pipe", () => {
  test("returns undefined if no function is passed", () => {
    const result = pipe();
    expect(result).toBe(undefined);
  });

  test("returns STOP if any function returns STOP", () => {
    const result = pipe(
      a => a + 1,
      () => STOP,
      c => "Hello" + c
    )(1);
    expect(result).toBe(STOP);
  });

  test("no downstream functions are called if any function returns STOP", () => {
    const fn1 = jest.fn(x => x);
    const stop = () => STOP;
    const fn3 = jest.fn();
    const fn4 = jest.fn();
    pipe(
      fn1,
      stop,
      fn3,
      fn4
    )(1);
    expect(fn1).toBeCalledTimes(1);
    expect(fn3).toBeCalledTimes(0);
    expect(fn4).toBeCalledTimes(0);
  });

  test("returns result of function if only one function is passed", () => {
    const result = pipe(() => 42);
    expect(result()).toBe(42);
  });

  test("returns result of backward composition of two functions", () => {
    const f1 = x => x + 11;
    const f2 = x => x + 17;
    const result = pipe(
      f1,
      f2
    );
    expect(result(14)).toBe(42);
  });

  test("returns result of backward composition of three functions", () => {
    const f1 = x => x + 1;
    const f2 = x => x * 2;
    const f3 = x => x + 40;
    const result = pipe(
      f1,
      f2,
      f3
    );
    expect(result(0)).toBe(42);
  });
});
