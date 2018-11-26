const removeDotFromFilepath = f =>
  f.filepath
    .split("/")
    .filter(i => i !== ".")
    .join("/");

module.exports = removeDotFromFilepath;
