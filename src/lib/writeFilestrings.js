const fs = require('fs');

const writeFilestrings = mod => {
  mod.files.forEach(({ filepath, filestring }) => {
    fs.writeFileSync(filepath, filestring);
  });
  return mod;
};

module.exports = writeFilestrings;
