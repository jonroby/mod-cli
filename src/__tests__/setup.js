const setup = require("../setup");

jest.mock('path');
jest.mock('../helpers/fileExists'); 

describe("setup", () => {
  test("setup return config object if everything is successful", () => {
    const realProcess = process;

    global.process = {
      ...realProcess,
      cwd: () => {}
    };
    
    const result = setup();
    expect(result).toEqual({ defaults: 1, mods: 1, config: 1 });
    global.process = realProcess;
  });
});
