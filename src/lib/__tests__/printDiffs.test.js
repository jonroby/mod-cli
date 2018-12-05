const printDiffs = require("../printDiffs");

jest.mock("shelljs", () => ({
  echo: jest.fn(),
}));

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  grey: jest.fn(),
}));

const shell = require("shelljs");
const chalk = require("chalk");

const mod = {
  input: [],
  files: [],
  data: {},
  diffs: { "src/file/path1.js": "NEW", "src/file/path2.js": "MOD" },
};

beforeEach(() => {
  jest.restoreAllMocks();
  chalk.greenBright.mockRestore();
  chalk.grey.mockRestore();
});

describe("printDiffs", () => {
  test("returns original Mod object", () => {
    const result = printDiffs(mod);

    const expected = mod;
    expect(result).toEqual(expected);
  });

  test("calls shell.echo once for each diff", () => {
    const expected = 2;
    expect(shell.echo).toBeCalledTimes(expected);
  });

  test("prints text as green when file is NEW", () => {
    const modNew = {
      ...mod,
      diffs: { "src/file/path1.js": "NEW" },
    };

    printDiffs(modNew);

    expect(chalk.greenBright).toBeCalledTimes(1);
    expect(chalk.grey).toBeCalledTimes(0);
  });

  test("prints text as white when file is MOD", () => {
    const modNew = {
      ...mod,
      diffs: { "src/file/path1.js": "MOD" },
    };

    printDiffs(modNew);

    expect(chalk.greenBright).toBeCalledTimes(0);
    expect(chalk.grey).toBeCalledTimes(0);
  });

  test("prints text as white when file is UNMOD", () => {
    const modNew = {
      ...mod,
      diffs: { "src/file/path1.js": "UNMOD" },
    };

    printDiffs(modNew);

    expect(chalk.greenBright).toBeCalledTimes(0);
    expect(chalk.grey).toBeCalledTimes(1);
  });
});
