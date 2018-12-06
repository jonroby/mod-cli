const shell = require("shelljs");
const { STOP } = require("../constants");

const validateInput = manPages => mod => {
  if (mod.input.length === 0) {
    shell.echo(manPages);
    return STOP;
  }

  // Do other checks here.
  return mod;
};

module.exports = validateInput;
