#!/usr/bin/env node

const { fileExists, writeToFile, compose } = require("./helpers");

const { setup } = require("./setup");

const { defaults, mods, config } = setup();

const getCommands = () => process.argv.slice(2);

// const getFile = task => ({
//   ...task,
//   filestring: fileExists(task.filepath, "readFile")
// });

// const getMod = task =>
//   task.filestring ? { ...task, mod: mods[task.mod](task.data) } : task;

// const modifyFile = task =>
//   task.filestring
//     ? {
//         ...task,
//         filestring: config.parser(task.filestring, task.mod)
//       }
//     : {
//         ...task,
//         filestring: defaults[task.default](task.data)
//       };

const main = () =>
  compose(
    getCommands,
    config.commands
  )()
    .map(getFile)
    .map(getMod)
    .map(modifyFile(parser, defaults))
    .forEach(writeToFile);

// main();

module.exports = main;
