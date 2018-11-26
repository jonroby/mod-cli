const fileExists = require("../fileExists");

jest.mock("fs");

describe("fileExists", () => {
  const filepath = "./path/to/file.js";
  const filestring = "const meaningOfLife = 42;";

  const MOCK_FILE_INFO = {
    [filepath]: filestring,
  };

  require("fs").__setMockFiles(MOCK_FILE_INFO);

  test("returns filestring if file exists and passed readFile", () => {
    const result = fileExists(filepath, "readFile");
    expect(result).toBe(filestring);
  });

  // test("returns module if file exists and passed require", () => {
  //   const result = fileExists(filepath, 'require');
  //   expect(result).toBe(filestring);
  // });

  test("default error is thrown if filepath isn't found", () => {
    const err = "./path/to/nonexistent/file.js doesn't exist.";
    expect(() =>
      fileExists("./path/to/nonexistent/file.js", "require")
    ).toThrow(err);
  });

  test("user supplied error is thrown if filepath isn't found", () => {
    const err =
      "No .mod file was found. Please add one to your root that includes the name of the mod-cli plugin you want to use.";
    expect(() =>
      fileExists("./path/to/nonexistent/file.js", "require", err)
    ).toThrow(err);
  });
});
