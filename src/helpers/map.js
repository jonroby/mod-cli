const map = fn => (xs) => {
  // since we can't foldr with concat
  // nor cons
  // xs.length === 0 && x === undefined
  // ? []
  // : [fn(x)].concat(map(xs));

  return xs.map(i => fn(i));
}

module.exports = map;
      
