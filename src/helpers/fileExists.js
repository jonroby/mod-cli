const fs = require("fs");

const fileExists = (path, fn, err) => {
  const type = {
    require: require,
    readFile: path => fs.readFileSync(path, "utf8"),
  };

  if (fs.existsSync(path)) {
    return type[fn](path);
  } else {
    return undefined; 
  }
};

module.exports = fileExists;
