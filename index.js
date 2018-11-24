#!/usr/bin/env node

const fs = require('fs');
const process = require("process");
const path = require("path");
const { fileExists, writeToFile, compose } = require("./src/helpers");

const cwd = process.cwd();
const pathToModConfig = path.resolve(cwd, "./.mod");
const pluginName = fileExists(pathToModConfig, 'readFile');
const pluginNameCleaned = pluginName.split('\n').join('');
const pathToPlugin = path.resolve(cwd, 'node_modules', '@mod-cli', pluginNameCleaned, 'index.js');
const { defaults, mods, config } = fileExists(pathToPlugin, 'require');

const getCommands = () => process.argv.slice(2);

const getFile = task => ({
  ...task,
  filestring: fileExists(task.filepath, 'readFile')
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
  )()
    .map(getFile)
    .map(getMod)
    .map(modifyFile)
    .forEach(writeToFile);

main();
