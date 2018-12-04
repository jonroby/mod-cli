const { fileExists } = require('../helpers');

const findFiles = mod => {
  return {
    ...mod,
    files: mod.files.map(_getFile),
  };
};

const _getFile = f => ({
  ...f,
  filestring: fileExists(f.filepath, "readFile"),
});

module.exports = findFiles;
