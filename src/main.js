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
  // config,
};

const main = () => {
  // const input = getInput(mod);

  // if (input.length === 0) {
  //   shell.echo(config.man);
  //   return;
  // }

  const m = pipe(
    getInput(mod),
    config.hook,
    selectFiles(config),
    findFiles,
    genFilestrings(config.gens),
    modFilestrings(config.parser, config.mods),
    writeFilestrings,
    printDiffs
  );
  // m();
  return m();
};

module.exports = main;
