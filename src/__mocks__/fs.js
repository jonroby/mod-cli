const fs = jest.genMockFromModule("fs");

let mockFiles = Object.create(null);
function __setMockFiles(files) {
  mockFiles = files;
}

const existsSync = path => mockFiles[path];
const readFileSync = path => mockFiles[path];
const writeFileSync = jest.fn(({ filestring, filepath }) => {});

fs.__setMockFiles = __setMockFiles;
fs.existsSync = existsSync;
fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
