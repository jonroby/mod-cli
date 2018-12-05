const updateDiffs = require("./updateDiffs");

const genFilestrings = gens => mod => {
  const files = mod.files.map(f => {
    if (!f.filestring) {
      updateDiffs(mod.diffs, f.filepath);
      return {
        ...f,
        filestring: gens[f.name](mod.data),
      };
    }
    return f;
  });

  return {
    ...mod,
    files,
  };
};

module.exports = genFilestrings;
