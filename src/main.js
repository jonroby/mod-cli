const setup = require("./setup");
const {
  getInput,
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
  config.hook,
  selectFiles(config),
  findFiles,
  genFilestrings(config.gens),
  modFilestrings(config.parser, config.mods),
  writeFilestrings,
  printDiffs
);

module.exports = main;
