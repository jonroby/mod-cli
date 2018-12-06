const setup = require("./setup");
const {
  getInput,
  validateInput,
  selectFiles,
  findFiles,
  genFilestrings,
  modFilestrings,
  writeFilestrings,
  printDiffs,
} = require("./lib");
const { pipe } = require("./helpers");

const config = setup();

const mod = {
  input: [],
  files: [],
  data: {},
  diffs: {},
};

const main = pipe(
  getInput(mod),
  validateInput(config.man),
  config.hook,
  selectFiles(config),
  findFiles,
  genFilestrings(config.gens),
  modFilestrings(config.parser, config.mods),
  writeFilestrings,
  printDiffs
);

module.exports = main;
