const fs = require("fs");

const readFile = path => (fs.existsSync(path) ? fs.readFileSync(path, "utf8") : null);
module.exports = readFile;
