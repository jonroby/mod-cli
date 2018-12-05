const modFilestrings = require("../modFilestrings");

jest.mock("../../helpers/fileExists");

const mods = {
  a: {
    m1: () => "modified",
  },
};

const mod = {
  input: [],
  files: [{ name: "m1", filepath: "./filepath.js", filestring: "" }],
  data: { command: "a" },
  diffs: {},
};

describe("modFilestrings", () => {
  test("modFilestrings returns modified filestring if plugin exists ", () => {
    const result = modFilestrings(() => "modified", mods)(mod);
    const files = [
      { name: "m1", filepath: "./filepath.js", filestring: "modified" },
    ];
    expect(result).toEqual({ ...mod, files });
  });

  test("modFilestrings return original if plugin doesn't exists", () => {
    const withFilestring = {
      name: "m2",
      filepath: "./filepath.js",
      filestring: "text",
    };
    const result = modFilestrings(() => "modified", mods)({
      ...mod,
      files: [withFilestring],
    });

    expect(result).toEqual({ ...mod, files: [withFilestring] });
  });
});
