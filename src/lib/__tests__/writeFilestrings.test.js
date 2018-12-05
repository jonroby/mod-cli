const writeFilestrings = require("../writeFilestrings");

jest.mock("fs");

const fs = require("fs");

describe("writeFilestrings", () => {
  const filepath = "./path/to/file.js";
  const filestring = "const meaningOfLife = 42;";
  const fileData = { files: [{ filepath, filestring }] };

  test("calls fs.writeFileSync with passed arguments", () => {
    writeFilestrings(fileData);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    fs.writeFileSync.mock.calls.forEach(args => {
      expect(args).toEqual([filepath, filestring, "utf8"]);
    });
  });

  test("returns original argument", () => {
    const result = writeFilestrings(fileData);
    expect(result).toEqual(fileData);
  });
});

module.exports = writeFilestrings;
