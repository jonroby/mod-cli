const { getFile, getMod, modifyFile } = require("../lib");

jest.mock('../helpers/fileExists'); 

describe("lib", () => {
  test("getFile returns task object back with filestring", () => {
    const task = { a: 'a' }
    const result = getFile(task);
    expect(result).toEqual({ a: 'a', filestring: 'plugin' });
  });

  test("getMod returns task object back with mod when filestring is defined", () => {
    const task = { a: 'a', filestring: 'exists', mod: 'm' }
    const mods = { m: () => 'modification' }
    const result = getMod(mods)(task);
    expect(result).toEqual({ ...task, mod: 'modification' });
  });

  test("getMod returns task object back with filestring is undefined", () => {
    const task = { a: 'a', filestring: undefined, mod: 'm' }
    const mods = { m: () => 'modification' }
    const result = getMod(mods)(task);
    expect(result).toEqual(task);
  });

  test("getFile returns task object back with filestring", () => {
    const task = { a: 'a', filestring: 'exists' }
    const parser = () => 'modification';
    const result = modifyFile(parser)(task);
    expect(result).toEqual({ a: 'a', filestring: 'modification' });
  });

  test("getFile returns task object back with filestring", () => {
    const task = { a: 'a', filestring: undefined, default: 'd' }
    const parser = () => 'modification';
    const defaults = { d: () => 'default' }
    const result = modifyFile(parser, defaults)(task);
    expect(result).toEqual({ a: 'a', filestring: 'default', default: 'd' });
  });
});
