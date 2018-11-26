const shell = require("shelljs");
const chalk = require("chalk");
const { fileExists, removeDotFromFilepath } = require('./helpers');

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

const printMods = root => f => {
  // TODO: Add logic for modifications, new, deleting, etc. 
  const type = chalk.greenBright("modified");
  const file = `${root}\/${removeDotFromFilepath(f)}`;
  shell.echo(`    ${type} ${file}`);
  return f;
}

module.exports = { getFile, getMod, modifyFile, printMods };
