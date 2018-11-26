const { fileExists } = require('./helpers');

const getFile = task => ({
  ...task,
  filestring: fileExists(task.filepath, "readFile")
});

const getMod = (mods) => task => task.filestring
      ? { ...task, mod: mods[task.mod](task.data) }
      : task;

const modifyFile = (parser, defaults) => task =>
  task.filestring
    ? {
        ...task,
        filestring: parser(task.filestring, task.mod)
      }
    : {
        ...task,
        filestring: defaults[task.default](task.data)
    };

module.exports = { getFile, getMod, modifyFile };
