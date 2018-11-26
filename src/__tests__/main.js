const main = require("../main");

jest.mock('../helpers/fileExists');

describe("main", () => {
  test("main returns tasks", () => {
    const result = main();
  });
});
