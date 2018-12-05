const getFileroot = require("../getFileroot");

describe("getFileroot", () => {
  test("returns the root directory of project", () => {
    const realProcess = process;

    global.process = {
      ...realProcess,
      cwd: () => "path/to/file/root",
    };

    const result = getFileroot();
    expect(result).toEqual("root");
    global.process = realProcess;
  });
});
