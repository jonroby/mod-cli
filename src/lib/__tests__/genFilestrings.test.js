const genFilestrings = require("../genFilestrings");

jest.mock("../../helpers/fileExists");

const gens = {
  g1: () => "modified",
};

const mod = {
  input: [],
  files: [{ name: "g1", filepath: "./filepath.js", filestring: undefined }],
  data: {},
  diffs: {},
};

describe("genFilestrings", () => {
  test("genFilestrings returns generated filestring if filestring doesn't currently exist ", () => {
    const result = genFilestrings(gens)(mod);
    const files = [
      { name: "g1", filepath: "./filepath.js", filestring: "modified" },
    ];
    expect(result).toEqual({ ...mod, files });
  });

  test("genFilestrings return original if filestring exists", () => {
    const withFilestring = {
      name: "g1",
      filepath: "./filepath.js",
      filestring: "text",
    };
    const result = genFilestrings(gens)({
      ...mod,
      files: [withFilestring],
    });

    expect(result).toEqual({ ...mod, files: [withFilestring] });
  });
});
