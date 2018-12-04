const getInput = require('./getInput');
const selectFiles = require('./selectFiles');
const findFiles = require('./findFiles');
const genFilestrings = require('./genFilestrings');
const modFilestrings = require('./modFilestrings')
const writeFilestrings = require('./writeFilestrings');
const printDiffs = require('./printDiffs');

// All functions in lib accept a mod object and return one.
// The only mutations allowed are to diffs.
module.exports = {
  getInput,
  selectFiles,
  findFiles,
  genFilestrings,
  modFilestrings,
  writeFilestrings,
  printDiffs,
};
