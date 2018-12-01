const shell = require("shelljs");
const chalk = require("chalk");
const { fileExists, removeDotFromFilepath } = require("./helpers");

// const state = {
//   data: {}
//   commandLineArguments: [],
//   tasks: [task1, task2], // Once filestrings are read we "send it back",
//   modificationList: [] or {}?
// }

const getFile = task => ({
  ...task,
  filestring: fileExists(task.filepath, "readFile"),
});

const getMod = mods => task => {
  if (task.mod === "NONE") {
    return task;
  }

  return {
    ...task,
    mod: mods[task.mod] && mods[task.mod](task.data),
  };
};

const modifyFile = (parser, defaults) => task => {
  if (task.mod === "NONE" && task.filestring) {
    return task;
  }

  if (task.mod === "NONE" && !task.filestring) {
    return { ...task, filestring: defaults[task.default](task.data) };
  }

  return task.filestring
    ? {
        ...task,
        filestring: parser(task.filestring, task.mod),
      }
    : {
        ...task,
        filestring: task.mod
          ? parser(defaults[task.default](task.data), task.mod)
          : defaults[task.default](task.data),
      };
};

const printMods = root => f => {
  // TODO: Add logic for modifications, new, deleting, etc.
  const type = chalk.greenBright("modified");
  const file = `${root}/${removeDotFromFilepath(f)}`;
  shell.echo(`    ${type} ${file}`);
  return f;
};

module.exports = { getFile, getMod, modifyFile, printMods };
