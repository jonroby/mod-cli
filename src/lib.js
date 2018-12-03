const fs = require("fs");
const shell = require("shelljs");
const chalk = require("chalk");
const { fileExists, removeDotFromFilepath } = require("./helpers");

// map over calling wo? const wo = obj => k => ({ ...obj, k });

const getFile = f => ({
  ...f,
  filestring: fileExists(f.filepath, "readFile"),
});

const getInput = mod => () => {
  return {
    ...mod,
    input: process.argv.slice(2),
  };
};

const selectFiles = mod => {
  // This will live in Mod CLI
  const type = { type: config.types[mod.input[0]] };
  const flags = mod.input.slice(1).filter(c => c.match(/-[a-z]/));
  const nonFlags = mod.input.slice(1).filter(c => !c.match(/-[a-z]/));

  const data = flags.reduce((prev, curr, i) => {
    if (config.chains[curr]) {
      const o = config.chains[curr].reduce((prev, curr) => {
        return { ...prev, [config.flagToFlagName[curr]]: nonFlags[i] };
      }, {});
      return {
        ...prev,
        ...o,
        [config.flagToFlagName[curr]]: nonFlags[i],
      };
    }
    return { ...prev, [config.flagToFlagName[curr]]: nonFlags[i] };
  }, type);

  const mf = config.modFlags(data);
  const fl = flat(flags.map(f => (config.chains[f] ? config.chains[f] : f)));
  const t = fl.map(f => {
    return mf[f];
  });

  return {
    ...mod,
    data: {
      ...data,
      actionConstants: ["MY_RED_ACTION"],
      pathToActionCreators: "../redux/actions/creators",
      pathToActionConstantsReducer: "../actions/constants",
    },
    files: t,
  };
};

const findFiles = mod => {
  return {
    ...mod,
    files: mod.files.map(getFile),
  };
};

const genFilestrings = gens => mod => {
  const files = mod.files.map(f => {
    if (!f.filestring) {
      return {
        ...f,
        filestring: gens[f.name](mod.data),
      };
    } else {
      return f;
    }
  });

  return {
    ...mod,
    files,
  };
};

const modFilestrings = (parser, mods) => mod => {
  const files = mod.files.map(f => {
    if (mods[mod.data.type] && mods[mod.data.type][f.name]) {
      return {
        ...f,
        filestring: parser(f.filestring, mods[mod.data.type][f.name](mod.data)),
      };
    }
    return f;
  });

  return {
    ...mod,
    files,
  };
};

const writeFilestrings = mod => {
  const w = f => {
    fs.writeFileSync(f.filepath, f.filestring, "utf8");
    return f;
  };
  mod.files.map(w);
  return mod;
};

const printDiffs = mod => {
  // TODO: Add logic for modifications, new, deleting, etc.

  // const type = chalk.greenBright("modified");
  // const file = `${root}/${removeDotFromFilepath(f)}`;
  // shell.echo(`    ${type} ${file}`);

  return mod;
};

module.exports = {
  getFile,
  getInput,
  selectFiles,
  findFiles,
  genFilestrings,
  modFilestrings,
  writeFilestrings,
  printDiffs,
};
