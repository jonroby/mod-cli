const { STOP } = require("../constants");

const pipe = (...xs) => {
  return !(xs.length === 0)
    ? x =>
        xs.reduce((prev, curr) => {
          if (prev === STOP || curr === STOP) {
            return STOP;
          }

          return curr(prev);
        }, x)
    : undefined;
};

module.exports = pipe;
