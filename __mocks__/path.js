const path = jest.genMockFromModule('path');

path.resolve = () => '';

module.exports = path;
