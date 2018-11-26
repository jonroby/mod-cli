#!/usr/bin/env node

const shell = require("shelljs");
const chalk = require("chalk");
const setup = require("./setup");
const { getFile, getMod, modifyFile } = require("./lib");
const { fileExists, writeToFile, compose } = require("./helpers");

const { defaults, mods, config } = setup();

const getCommands = () => {
  const args = process.argv;

  return args.slice(2);
};

// temp fix to display files with root
const cwd = process.cwd().split("/");
const root = cwd[cwd.length - 1];
const removeDot = f =>
  f.filepath
    .split("/")
    .filter(i => i !== ".")
    .join("/");

const main = () =>
  compose(
    getCommands,
    config.commands
  )()
    .map(getFile)
    .map(getMod(mods))
    .map(modifyFile(config.parser, defaults))
    .map(writeToFile)
    .forEach(f =>
      shell.echo(`    ${chalk.greenBright("modified")} ${root}/${removeDot(f)}`)
    );

main();

// module.exports = main;
