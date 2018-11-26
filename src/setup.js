const path = require("path");

const { fileExists } = require("./helpers");

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

const setup = () => {
  const cwd = process.cwd();
  const pathToModConfig = path.resolve(cwd, "./.mod");
  const pluginName = fileExists(pathToModConfig, 'readFile');
  const pluginNameCleaned = pluginName.split('\n').join('');
  const pathToPlugin = path.resolve(
    cwd,
    'node_modules',
    pluginNameCleaned,
    'index.js'
  );
  const obj = fileExists(pathToPlugin, 'require');

  return fileExists(pathToPlugin, 'require');
}

module.exports = setup;
