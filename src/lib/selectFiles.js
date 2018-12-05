const { pipe, map, flatten, unspool } = require("../helpers");

const selectFiles = config => mod => {
  const command = mod.input[0];
  const input = _prepareInput(mod.input, config);

  const newData = _prepareData(input, command, config);
  const data = { ...mod.data, ...newData };
  const mf = config.modFlags(data);
  const files = data.flags.map(f => {
    return mf[f];
  });

  return {
    ...mod,
    files,
    data,
  };
};

const _prepareInput = (input, config) => {
  // input.slice(1) are the the flags next to names
  // [-f1 n1 -f2 n2 -f3 n3] => [-f1 -f2 -f3] [n1 n2 n3]
  const { l: flags, r: names } = unspool(input.slice(1));

  // [-f1 -f2 -f3] => [[-f4, -f5], -f2, f3] => [-f4, -f5, -f2, f3]
  const flagsChained = pipe(
    map(f => config.chains[f] || f),
    flatten
  )(flags);

  // [n1 n2 n3] => [[n4, n5], n2, f3] => [n4, n5, n2, n3]
  const namesChained = pipe(
    map((n, i) => (config.chains[flags[i]] ? [n, n] : n)),
    flatten
  )(names);

  return { l: flagsChained, r: namesChained };
};

const zip = a1 => a2 => map((v, i) => [v, a2[i]])(a1);

const _prepareData = ({ l: flags, r: names }, command, config) => {
  // [-f1, -f2, -f3] [n1, n2, n3] => [[-f1, n1], [-f2, n2], [-f3, n3]]
  const flagsToNames = zip(flags)(names);
  const flagNamesToNames = flagsToNames.map(f => [
    config.flagToFlagName[f[0]],
    f[1],
  ]);

  const flagNamesToNamesMap = flagNamesToNames.reduce((prev, curr) => {
    return { ...prev, [curr[0]]: curr[1] };
  }, {});

  return {
    flags,
    command: config.commands[command],
    ...flagNamesToNamesMap,
  };
};

module.exports = selectFiles;
