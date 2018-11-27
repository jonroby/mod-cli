[![npm version](https://badge.fury.io/js/%40mod-cli%2Fmod-cli.svg)](https://badge.fury.io/js/%40mod-cli%2Fmod-cli)
[![Build Status](https://travis-ci.com/jonroby/mod-cli.svg?branch=master)](https://travis-ci.com/jonroby/mod-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/1bde59e92968538f845c/maintainability)](https://codeclimate.com/github/jonroby/mod-cli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1bde59e92968538f845c/test_coverage)](https://codeclimate.com/github/jonroby/mod-cli/test_coverage)

# Mod CLI

It isn't always possible to eliminate boilerplate code. Perhaps it's just part
of the language/framework, or maybe you're unable to figure out an abstraction.
It could be that the team can't agree on how, or they don't even consider it a problem.
Whatever the reason, you're stuck rewriting code over... and over... and over again.

Mod CLI is a tool that can help automate these tasks. You install it along with
the plugin of your choice (or likely, you'll need to write your own). Then
in the command line type `mod <your> <command> --with --whatever --options`.
And on enter, all that repetitious code is added to your project!

## Example

I've experienced first hand writing a lot of boilerplate with Redux. Despite all
of its benefits, I've had to write out nearly identical actions, action creators,
reducers, sagas, many many times. That doesn't even include all the importing
and exporting.

So to see how Mod CLI can help, clone the following repo and `cd` into it.

`$ git clone https://github.com/jonroby/with-redux-app.git`

It's just a nextjs example project. You can generate it yourself with

```
$ npm install --save next react react-dom
$ npx create-next-app --example with-redux with-redux-app
```

Next, you'll need Mod CLI. You can install it globally (or locally, but
this requires an extra step not covered here).

`$ npm i -g @mod-cli/mod-cli`

The Mod CLI can't do anything by itself. It needs the right plugin for a
project. I've written a simple (and very limited) plugin for this project
which you can get by

`$ npm i -S @mod-cli/nextjs-redux-example-plugin`

Mod CLI needs to know that this is the plugin you want to use so add a
`.mod` file to the root of the project and write out the plugin name.
You can do that by

`$ echo '@mod-cli/nextjs-redux-example-plugin' > .mod`

Now everything's ready! Go ahead and look at the files `/components/counter.js` and
`./store.js`. If you've written any Redux, you'll see where you'd have to add
some boilerplate to create a new action.

So say you want to create a new action called `newAction`, which you'll then need
to import into counter. Instead of doing this by hand, navigate to the CLI and
then type and enter

`$ mod newAction Counter`

This will generate everything for you (excepting of course the actual logic you want
carried out).


```javascript
// store.js

...

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  NEW_ACTION: "NEW_ACTION" // an actionType is added
}

...

case actionTypes.RESET:
  return Object.assign({}, state, {
    count: exampleInitialState.count
  })
// a case statement in the reducer
case types.NEW_ACTION:
  return state;

...

// an action creator 
export const newAction = () => dispatch => {   
  return dispatch({
    type: actionTypes.NEW_ACTION
  });
};

...
```


```javascript
// components/counter.js

// newAction is imported for you
import { incrementCount, decrementCount, resetCount, newAction } from '../store';
```

If you had only wanted to update the store (actions are not capitalized):

`$ mod <action> -a`

Or just the component (components are capitalized):

`$ mod <action> <Component> -c`

Now these are not specific to Mod CLI. The command line options and updating
behavior are specified by the plugin. Note that this is plugin is very limited
and will break easily. I only include it here for illustrative purposes.




