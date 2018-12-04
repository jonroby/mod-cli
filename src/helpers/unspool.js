const unspool = arr => {
  const l = arr.filter((v, i) => i % 2 === 0);
  const r = arr.filter((v, i) => i % 2 !== 0);
  return { l, r }
};

module.exports = unspool;
