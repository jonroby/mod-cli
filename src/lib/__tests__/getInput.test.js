const getInput = require("../getInput");

const mod = {
  input: [],
  files: [],
  data: {},
  diffs: {},
};

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
