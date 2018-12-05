const fs = require('fs');

const writeFilestrings = mod => {
  mod.files.forEach(({ filepath, filestring }) => {
    fs.writeFileSync(filepath, filestring, 'utf8');
  });
  return mod;
};

module.exports = writeFilestrings;
