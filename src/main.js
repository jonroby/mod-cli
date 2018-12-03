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
const { pipe, flat } = require("./helpers");

const config = setup();

const mod = {
  input: [],
  files: [],
  data: {},
  diffs: [],
};

const main = () => {
  const m = pipe(
    getInput(mod),
    selectFiles,
    findFiles,
    genFilestrings(config.gens),
    modFilestrings(config.parser, config.mods),
    writeFilestrings
    // printDiffs
  );
  console.log(m());
};

module.exports = main;
