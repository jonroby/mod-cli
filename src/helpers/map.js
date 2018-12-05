const map = fn => xs => xs.map((x, i) => fn(x, i));

module.exports = map;
