const updateDiffs = require("./updateDiffs");

const modFilestrings = (parser, mods) => mod => {
  const files = mod.files.map(f => {
    if (mods[mod.data.command] && mods[mod.data.command][f.name]) {
      const filestring = parser(
        f.filestring,
        mods[mod.data.command][f.name](mod.data)
      );
      updateDiffs(mod.diffs, f.filepath, f.filestring, filestring);
      return {
        ...f,
        filestring,
      };
    }

    return f;
  });

  return {
    ...mod,
    files,
  };
};

module.exports = modFilestrings;
