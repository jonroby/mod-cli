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

`$ git clone https://github.com/jonroby/mod-react.git`

Next, you'll need a global installation of Mod CLI.

`~/mod-react $ npm i -g @mod-cli/mod-cli`

It can't do anything by itself. It needs the right plugin for a
project. I've written a simple (and very limited) plugin for this project
which you can get by

`~/mod-react $ npm i -S @mod-cli/mod-react-plugin`

Mod CLI needs to know that this is the plugin you want to use so add a
`.mod` file to the root of the project and write out the plugin name.
You can do that by

`~/mod-react $ echo '@mod-cli/mod-react-plugin' > .mod`


`~/mod-react $ npm start`

It's a simple counter app with incrementing and decrementing. Now let's say you
want to add additional functionality for resetting the counter. If you've written
any Redux, you know there are a number of steps involved in this process. So,
instead, just enter the following code into the command line:

```
 ~/mod-react $ mod reset Counter
    modified mod-react/src/redux/actions/constants.js
    modified mod-react/src/redux/actions/creators.js
    modified mod-react/src/components/Counter.js
    modified mod-react/src/redux/reducers/counter.js
```

This command generates all of the associated redux boilerplate:

![Screenshot](readme-images/mod-cli-diffs.png)

To finish, update your reducer `src/redux/reducers/counter.js`:

```
...
  case RESET:
    return { ...state, count: 0};
...
```

And then just below the decrement buttion, add an additional button with its
`onClick` handler set to the newly generated `this.props.reset` function: 
```
...
  <button onClick={this.props.decrement}>-</button>
  <button onClick={this.props.reset}>0</button>
...
```

## Mod React

While this repo is for Mod CLI and not Mod React, some additional documentation
is provided.

If you want to generate a file individually, you do so with the following:
`$ mod -a <action>`

`$ mod -c <Component>`

`$ mod -r <reducer>`

You can also string them together:
`$ mod -a <action> -c <Component> -r <reducer>`

If you use `<action>` as your first argument you can drop the `-a`.
`$ mod <action> -c <Component> -r <reducer>`

If your component and reducer have the same name (capitalization doesn't matter),
you don't need to specify each (this was the command given in the preceding
section):
`$ mod <action> <Component|reducer>`

You might be wondering what happens if you don't have the component or the reducer.
Happily, one will be generated for you and if you specified actions they will be
added as well. Right now, you still have to add a generated reducer to the
rootReducer; in an upcoming release this will also be done for you. In the mean
time, you can `$ mod -t <reducer>`.

You also don't need to worry about adding duplicate actions, keys, case statements,
whatever it might be (at least in most cases). The `mod-react-plugin` won't
create duplicates (and on the road map is way to print this information out on
completion when CLI is finished.)

Finally, you can also add a state to you can also add a key to `mapStateToProps`
(this is if your Component and reducer share the same name):
`$ mod -s myKey myComponent`

```
const mapStateToProps = state => ({
  myKey: state.myComponent.myKey
})
```

And if you specify a reducer: `$ mod -s myKey -c MyComponent -r myReducer`
```
const mapStateToProps = state => ({
  myKey: state.myReducer.myKey
})
```

You can also do a custom one: `$ mod -s my.custom.prop -c MyComponent`

```
const mapStateToProps = state => ({
  prop: state.my.custom.prop
})
```

Finally you can add that key to the reducer as well. `$ mod -s myKey -r myReducer`.
(You can't set its value from the CLI.)

```
const initialState = {
  myKey: null,
}
```

Just as with actions, you can add state to both the component and the reducer:

`$ mod -s myKey -c MyComponent -r myReducer`
