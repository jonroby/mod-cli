const shell = require("shelljs");
const chalk = require("chalk");
// const { NEW, MOD, UNMOD } = require('../constants');


const printDiffs = mod => {
  // TODO: Add logic for modifications, new, deleting, etc.
  const colors = {
    NEW: (k) => chalk.greenBright(`${k}`),
    MOD: (k) => k,
    UNMOD: (k) => chalk.grey(`${k}`),
  }
  
  Object.keys(mod.diffs).map(d => {
    const filepath = colors[mod.diffs[d]](d);
    shell.echo(` ${filepath}`);
  });

  return mod;
};

module.exports = printDiffs;
