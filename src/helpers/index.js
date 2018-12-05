const getCommands = require("./getCommands");
const getFileroot = require("./getFileroot");
const fileExists = require("./fileExists");
const writeToFile = require("./writeToFile");
const removeDotFromFilepath = require("./removeDotFromFilepath");
const pipe = require("./pipe");
const map = require("./map");
const flatten = require("./flatten");
const unspool = require("./unspool");

module.exports = {
  getCommands,
  getFileroot,
  fileExists,
  writeToFile,
  pipe,
  removeDotFromFilepath,
  map,
  flatten,
  unspool,
};
