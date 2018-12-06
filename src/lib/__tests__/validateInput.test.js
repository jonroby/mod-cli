const validateInput = require("../validateInput");
const { STOP } = require("../../constants");

jest.mock("shelljs", () => ({
  echo: jest.fn(),
}));

const shell = require("shelljs");

beforeEach(() => {
  shell.echo.mockRestore();
});

describe("validateInput", () => {
  // const filepath = "./path/to/file.js";
  // const filestring = "const meaningOfLife = 42;";
  // const fileData = { files: [{ filepath, filestring }] };
  const mod = {
    input: [],
    files: [],
    data: {},
    diffs: {},
  };

  const manPages = "manPages";

  test("if no arguments are given, it returns STOP", () => {
    const result = validateInput(manPages)(mod);
    expect(result).toBe(STOP);
  });

  test("if no arguments are given, shell echoes man pages", () => {
    validateInput(manPages)(mod);
    expect(shell.echo).toBeCalledTimes(1);
    expect(shell.echo).toBeCalledWith(manPages);
  });

  test("returns Mod object if arguments are given", () => {
    const modWithArguments = {
      ...mod,
      input: ["arg1"],
    };
    const result = validateInput(manPages)(modWithArguments);
    expect(result).toBe(modWithArguments);
  });

  test("shell echoes nothing if arguments are given", () => {
    const modWithArguments = {
      ...mod,
      input: ["arg1"],
    };
    validateInput(manPages)(modWithArguments);
    expect(shell.echo).toBeCalledTimes(0);
  });

  // test("calls fs.writeFileSync with passed arguments", () => {
  //   const result = validateInput(config)(mod);
  //   fs.writeFileSync.mock.calls.forEach(args => {
  //     expect(args).toEqual([filepath, filestring, "utf8"]);
  //   });
  // });
});

module.exports = validateInput;
