const main = require("../main");
// const config = require("./setup.test.js");

// mod mock is here
jest.mock("../lib/getInput");

// config object is here
jest.mock("../setup");
jest.mock("../helpers/fileExists");
jest.mock("../lib/writeFilestrings");

describe("main", () => {
  test("takes input and config and returns modified files", () => {
    const result = main();
    expect(result).toEqual(expected);
  });
});

const expected = {
  data: {
    actionConstant: "myAction",
    actionConstants: ["A"],
    actionCreator: "myAction",
    command: "addAction",
    component: "myComponent",
    flags: ["-o", "-e", "-c", "-d", "-t"],
    pathToActionConstantsReducer: "../actions/constants",
    pathToActionCreators: "../redux/actions/creators",
    reducer: "myComponent",
    rootReducer: "myComponent",
  },
  diffs: {
    "src/components/myComponent.jsx": "MOD",
    "src/redux/actions/constants.js": "MOD",
    "src/redux/actions/creators.js": "MOD",
    "src/redux/reducers/myComponent.js": "MOD",
    "src/redux/reducers/rootReducer.js": "MOD",
  },
  files: [
    {
      filepath: "./src/redux/actions/constants.js",
      filestring: "parsed const a = 1;",
      name: "actionConstant",
    },
    {
      filepath: "./src/redux/actions/creators.js",
      filestring: "parsed const a = 1;",
      name: "actionCreator",
    },
    {
      filepath: "./src/components/myComponent.jsx",
      filestring: "parsed const a = 1;",
      name: "component",
    },
    {
      filepath: "./src/redux/reducers/myComponent.js",
      filestring: "parsed const a = 1;",
      name: "reducer",
    },
    {
      filepath: "./src/redux/reducers/rootReducer.js",
      filestring: "parsed const a = 1;",
      name: "rootReducer",
    },
  ],
  input: ["a", "-a", "myAction", "-c", "myComponent", "-r", "myComponent"],
};
