const setup = require("./setup");
const { getFile, getMod, modifyFile, printMods } = require("./lib");
const {
  getCommands,
  getFileroot,
  fileExists,
  writeToFile,
  pipe,
  map,
} = require("./helpers");

const { defaults, mods, config } = setup();

const main = pipe(
  getCommands,
  config.commands,
  map(getFile),
  map(getMod(mods)),
  map(modifyFile(config.parser, defaults)),
  map(writeToFile),
  map(
    pipe(
      getFileroot,
      printMods
    )()
  )
);

module.exports = main;
