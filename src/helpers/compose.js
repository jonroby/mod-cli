const compose = (...xs) => {
  return !(xs.length === 0)
    ? x =>
        xs.reduce((prev, curr) => {
          return curr(prev);
        }, x)
    : undefined;
};

module.exports = compose;
