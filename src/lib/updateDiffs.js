const { removeDotFromFilepath } = require("../helpers");
const { NEW, MOD, UNMOD } = require("../constants");

const updateDiffs = (diffs, filepath, fs1, fs2) => {
  const fp = removeDotFromFilepath(filepath);
  if (diffs[fp] !== NEW && fs1 !== undefined && fs2 !== undefined) {
    if (fs1 !== fs2) {
      diffs[fp] = MOD;
    } else {
      diffs[fp] = UNMOD;
    }
  } else {
    diffs[fp] = NEW;
  }
  return diffs;
};

module.exports = updateDiffs;
