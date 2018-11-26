const writeToFile = require("../writeToFile");

jest.mock("fs");

const fs = require("fs");

describe("writeToFile", () => {
  const filepath = "./path/to/file.js";
  const filestring = "const meaningOfLife = 42;";
  const fileData = { filepath, filestring };

  test("calls fs.writeFileSync with passed arguments", () => {
    const result = writeToFile(fileData);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    fs.writeFileSync.mock.calls.forEach(args => {
      expect(args).toEqual([filepath, filestring, "utf8"]);
    });
  });

  test("returns original argument", () => {
    const result = writeToFile(fileData);
    expect(result).toEqual(fileData);
  });
});
