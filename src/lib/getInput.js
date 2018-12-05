const getInput = mod => () => {
  return {
    ...mod,
    input: process.argv.slice(2),
  };
};

module.exports = getInput;
