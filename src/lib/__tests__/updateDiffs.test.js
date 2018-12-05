const updateDiffs = require("../updateDiffs");
const { NEW, MOD, UNMOD } = require("../../constants");

const filepath = "./path/to/file.js";

describe("updateDiffs removes ./ before filepath", () => {
  test("returns diffs", () => {
    const diffs = {};
    updateDiffs(diffs, filepath);
    const diffsKey = Object.keys(diffs)[0];

    expect(diffsKey).toEqual("path/to/file.js");
  });

  test("filepath is set to NEW if it didn't previously exist and if no file strings are given", () => {
    const diffs = {};
    updateDiffs(diffs, filepath);
    expect(diffs).toEqual({ "path/to/file.js": NEW });
  });

  test("filepath is kept at NEW if it previously existed and regardless if filestrings are given", () => {
    const diffs = { "path/to/file.js": NEW };
    updateDiffs(diffs, filepath);
    expect(diffs).toEqual({ "path/to/file.js": NEW });

    updateDiffs(diffs, filepath, "fs1");
    expect(diffs).toEqual({ "path/to/file.js": NEW });

    updateDiffs(diffs, filepath, "fs1", "fs2");
    expect(diffs).toEqual({ "path/to/file.js": NEW });
  });

  test("diffs[filepath] is MOD when filestrings are different ", () => {
    const diffs = {};
    updateDiffs(diffs, filepath, "fs1", "fs2");
    expect(diffs).toEqual({ "path/to/file.js": MOD });
  });

  test("diffs[filepath] is UNMOD when filestrings are the same ", () => {
    const diffs = {};
    updateDiffs(diffs, filepath, "fs1", "fs1");
    expect(diffs).toEqual({ "path/to/file.js": UNMOD });
  });
});
