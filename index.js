#!/usr/bin/env node

const process = require("process");
const path = require("path");
const { readFile, writeToFile, compose } = require("./helpers");

const plugin = readFile(path.resolve(process.cwd(), "./.mod"));

const { defaults, mods, config } = require(path.resolve(
  process.cwd(),
  `./node_modules/${plugin}`
));

const getCommands = () => process.argv.slice(2);

const getFile = task => ({
  ...task,
  filestring: readFile(task.filepath)
});

const getMod = task =>
  task.filestring ? { ...task, mod: mods[task.mod](task.data) } : task;

const modifyFile = task =>
  task.filestring
    ? {
        ...task,
        filestring: config.parser(task.filestring, task.mod)
      }
    : {
        ...task,
        filestring: defaults[task.default](task.data)
      };

const main = () =>
  compose(
    getCommands,
    config.commands
  )
    .map(getFile)
    .map(getMod)
    .map(modifyFile)
    .forEach(writeToFile);

main();
