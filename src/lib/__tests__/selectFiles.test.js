const selectFiles = require("../selectFiles");

const mod = {
  input: ["x", "-a", "myFlagName"],
  files: [],
  data: {},
  diffs: {},
};

const config = {
  chains: {
    "-a": ["-b", "-c"],
  },
  modFlags: () => ({
    "-b": {
      filepath: "fileb",
    },
    "-c": {
      filepath: "filec",
    },
  }),
  flagToFlagName: {
    "-a": "aaa",
    "-b": "bbb",
    "-c": "ccc",
  },
  commands: {
    x: "x",
  },
};

describe("selectFiles", () => {
  test("", () => {
    const result = selectFiles(config)(mod);

    expect(result).toEqual({
      data: {
        bbb: "myFlagName",
        ccc: "myFlagName",
        command: "x",
        flags: ["-b", "-c"],
      },
      diffs: {},
      files: [{ filepath: "fileb" }, { filepath: "filec" }],
      input: ["x", "-a", "myFlagName"],
    });
  });
});

module.exports = selectFiles;
