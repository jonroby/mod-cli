const getCommands = require("./getCommands");
const getFileroot = require("./getFileroot");
const fileExists = require("./fileExists");
const writeToFile = require("./writeToFile");
const pipe = require("./pipe");
const removeDotFromFilepath = require("./removeDotFromFilepath");
const map = require("./map");
const flat = require('./flat');

module.exports = {
  getCommands,
  getFileroot,
  fileExists,
  writeToFile,
  pipe,
  removeDotFromFilepath,
  map,
  flat
};
