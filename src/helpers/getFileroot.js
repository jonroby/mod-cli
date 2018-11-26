const getFileroot = () => {
  const cwd = process.cwd().split("/");
  return cwd[cwd.length - 1];
}

module.exports = getFileroot;
