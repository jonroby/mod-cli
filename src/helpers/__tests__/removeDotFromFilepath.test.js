const removeDotFromFilepath = require("../removeDotFromFilepath");

describe("removeDotFromFilepath", () => {
  test("remove dot from filepath", () => {
    const result = removeDotFromFilepath("./path/to/file.js");
    expect(result).toBe("path/to/file.js");
  });
});
