const setup = () => {
  const config = {
    commands: { a: "addAction", x: "addState" },
    chains: {
      "-a": ["-o", "-e"],
      "-s": ["-u", "-g", "-q"],
      "-r": ["-d", "-t"],
    },
    modFlags: data => ({
      "-o": {
        name: "actionConstant",
        filepath: `./src/redux/actions/constants.js`,
      },
      "-e": {
        name: "actionCreator",
        filepath: `./src/redux/actions/creators.js`,
      },
      "-c": {
        name: "component",
        filepath: `./src/components/${data.component}.jsx`,
      },
      "-d": {
        name: "reducer",
        filepath: `./src/redux/reducers/${data.reducer}.js`,
      },
      "-t": {
        name: "rootReducer",
        filepath: `./src/redux/reducers/rootReducer.js`,
      },
      "-u": {
        name: "saga",
        filepath: `./src/redux/sagas/${data.saga}.js`,
      },
      "-g": {
        name: "rootSaga",
        filepath: `./src/redux/sagas/rootSaga.js`,
      },
      "-q": {
        name: "request",
        filepath: `./src/redux/sagas/requests/${data.saga}.js`,
      },
    }),
    flagToFlagName: {
      "-a": "action",
      "-o": "actionConstant",
      "-e": "actionCreator",
      "-c": "component",
      "-r": "reducer",
      "-d": "reducer",
      "-t": "rootReducer",
      "-s": "saga",
      "-u": "sagaGenerator",
      "-g": "rootSaga",
      "-q": "request",
    },
    parser: filestring => `parsed ${filestring}`,
    mods: {
      addAction: {
        actionConstant: () => "actionConstant",
        actionCreator: () => "actionCreator",
        component: () => "actionComponent",
        reducer: () => "reducer",
        rootReducer: () => "rootReducer",
        rootSaga: () => "rootSaga",
      },
      addState: {
        componentState: () => "componentState",
        reducerState: () => "reducerState",
      },
    },
    gens: {
      component: () => "component",
      reducer: () => "reducer",
      request: () => "request",
      saga: () => "saga",
    },
    hook: mod => mod,
  };
  return config;
};

module.exports = setup;
