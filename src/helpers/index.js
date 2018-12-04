const getCommands = require("./getCommands");
const getFileroot = require("./getFileroot");
const fileExists = require("./fileExists");
const writeToFile = require("./writeToFile");
const removeDotFromFilepath = require("./removeDotFromFilepath");
const pipe = require("./pipe");
const compose = require('./compose');
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
  compose,
  map,
  flatten,
  unspool
};
