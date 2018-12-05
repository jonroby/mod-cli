module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!<rootDir>/src/lib/index.js"
  ],
  roots: ["<rootDir>/src/"],
};
