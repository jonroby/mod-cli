const findFiles = require('../findFiles');

jest.mock('../../helpers/fileExists');

const mod = {
  input: [],
  files: [{ filepath: './filepath.js' }],
  data: {},
  diffs: {},
};

describe("findFiles", () => {
  test("findFiles returns Mod back with filestring in .files", () => {
    const result = findFiles(mod);
    const files = [
      {
	filepath: './filepath.js',
	filestring: "const a = 1;"
      }
    ]
    expect(result).toEqual({ ...mod, files });
  });
});

