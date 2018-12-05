const getInput = () => () => {
  const m = {
    // input: ["a", "-a", "a", "-c", "myAction", "-r", "myAction"],
    files: [],
    data: {
      pathToActionCreators: "../redux/actions/creators",
      pathToActionConstantsReducer: "../actions/constants",
      actionConstants: ["A"],
    },
    diffs: {},
  };

  return {
    ...m,
    input: ["a", "-a", "myAction", "-c", "myComponent", "-r", "myComponent"],
  };
};

module.exports = getInput;
