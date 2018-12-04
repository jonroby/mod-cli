const { getFile, getInput } = require("../lib");

jest.mock("shelljs", () => ({
  echo: jest.fn(),
}));

jest.mock("../helpers/fileExists");

const shell = require("shelljs");

const mod = {
  input: [],
  files: [],
  data: {},
  diffs: {},
};

describe("lib", () => {
  test("getFile returns task object back with filestring", () => {
    const task = { a: "a" };
    const result = getFile(task);
    expect(result).toEqual({ a: "a", filestring: "plugin" });
  });

  test("getInput returns mod.input with process.argv", () => {
    const realProcess = process;

    global.process = {
      ...realProcess,
      argv: ["node", "filename.js", "arg1", "arg2"],
    };

    const result = getInput(mod)();
    const expected = { ...mod, input: ["arg1", "arg2"] };
    expect(result).toEqual(expected);

    global.process = realProcess;
  });

  // test("getMod returns task object back with mod when filestring is defined", () => {
  //   const task = { a: "a", filestring: "exists", mod: "m" };
  //   const mods = { m: () => "modification" };
  //   const result = getMod(mods)(task);
  //   expect(result).toEqual({ ...task, mod: "modification" });
  // });

  // test("getMod returns task object back with filestring is undefined", () => {
  //   const task = { a: "a", filestring: undefined, mod: "m" };
  //   const mods = { m: () => "modification" };
  //   const result = getMod(mods)(task);
  //   expect(result).toEqual({ ...task, mod: "modification" });
  // });

  // test("modifyFile returns task object back with filestring", () => {
  //   const task = { a: "a", filestring: "exists" };
  //   const parser = () => "modification";
  //   const result = modifyFile(parser)(task);
  //   expect(result).toEqual({ a: "a", filestring: "modification" });
  // });

  // test("modifyFile returns task object back with modified default filestring when filestring is undefined", () => {
  //   const task = { a: "a", filestring: undefined, default: "d", mod: () => {} };
  //   const parser = a => "modified " + a;
  //   const defaults = { d: () => "default" };
  //   const result = modifyFile(parser, defaults)(task);
  //   expect(result).toEqual({
  //     ...task,
  //     filestring: "modified default",
  //   });
  // });

  // test("printMods echoes modified file", () => {
  //   const root = "root-folder";
  //   const filepath = "./path/to/file.js";
  //   printMods(root)({ filepath });
  //   expect(shell.echo).toHaveBeenCalledTimes(1);
  // });

  // test("printMods return original file", () => {
  //   const root = "root-folder";
  //   const filepath = "./path/to/file.js";
  //   const result = printMods(root)({ filepath });
  //   expect(result).toEqual({ filepath });
  // });
});
