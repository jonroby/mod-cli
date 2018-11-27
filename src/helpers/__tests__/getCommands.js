const getCommands = require("../getCommands");

describe("getCommands", () => {
  test("returns command line arguments, ignoring first two", () => {
    const realProcess = process;

    global.process = {
      ...realProcess,
      argv: ["arg0", "arg1", "arg2", "arg3"],
    };

    const result = getCommands();
    expect(result).toEqual(["arg2", "arg3"]);
    global.process = realProcess;
  });
});
