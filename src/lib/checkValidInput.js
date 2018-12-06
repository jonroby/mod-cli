const shell = require("shell");
const { STOP } = require("../constants");

const validateInput = (mod, config) => {
  if (mod.input.length === 0) {
    shell.echo(config.man);
    return STOP;
  }

  // Do other checks here.
  return mod;
};

module.exports = validateInput;
