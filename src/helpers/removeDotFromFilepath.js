const removeDotFromFilepath = f =>
  f
    .split("/")
    .filter(i => i !== ".")
    .join("/");

module.exports = removeDotFromFilepath;
