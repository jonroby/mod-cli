const fs = require('fs');

const writeToFile = ({ filepath, filestring }) => {
  fs.writeFileSync(filepath, filestring, "utf8");
};

module.exports = writeToFile;
