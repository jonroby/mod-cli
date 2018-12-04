const flatten = arr => {
  if (undefined) return [];
  return arr.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(curr);
    } else {
      return prev.concat([curr]);
    }
  }, []);
};

module.exports = flatten;
