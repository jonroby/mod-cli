const writeFileStrings = require("../writeFileStrings");

jest.mock("fs");

const fs = require("fs");

describe("writeFileStrings", () => {
  const filepath = "./path/to/file.js";
  const filestring = "const meaningOfLife = 42;";
  const fileData = { files: [{ filepath, filestring }] };

  test("calls fs.writeFileSync with passed arguments", () => {
    writeFileStrings(fileData);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    fs.writeFileSync.mock.calls.forEach(args => {
      expect(args).toEqual([filepath, filestring, "utf8"]);
    });
  });

  test("returns original argument", () => {
    const result = writeFileStrings(fileData);
    expect(result).toEqual(fileData);
  });
});

module.exports = writeFileStrings;
