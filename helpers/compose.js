const compose = (...xs) => {
  return xs.reduce(
    (prev, curr) => {
      return curr(prev);
    },
    () => {}
  );
};

module.exports = compose;
