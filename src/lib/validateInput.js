const shell = require("shelljs");
const { STOP } = require("../constants");

const validateInput = config => mod => {
  if (mod.input.length === 0) {
    shell.echo(config);
    return STOP;
  }

  // Do other checks here.
  return mod;
};

module.exports = validateInput;
