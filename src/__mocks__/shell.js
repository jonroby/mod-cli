const shell = jest.mock("shelljs");

shell.echo = jest.fn();

module.exports = shell;
