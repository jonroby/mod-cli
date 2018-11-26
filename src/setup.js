const path = require("path");

const { fileExists } = require("./helpers");

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

  return fileExists(pathToPlugin, 'require');
}

module.exports = setup;
