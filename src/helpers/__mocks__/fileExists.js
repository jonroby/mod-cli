const fileExists = jest.fn((_, arg) => {
  if (arg === "readFile") return "plugin";
  if (arg === "require") return { defaults: 1, mods: 1, config: 1 };
});

module.exports = fileExists;
