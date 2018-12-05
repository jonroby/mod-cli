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
in the command line type `mod <your> <command> --with --options`.
And on enter, all that repetitious code is added to your project!

## Example

To start clone the following repo.

`$ git clone https://github.com/jonroby/mod-react.git`

`cd` into it and `$ npm i && npm start`.

It's a simple counter app with incrementing and decrementing. Now let's say we
want to add functionality for resetting the counter. If you've written any Redux,
you know that this involves several steps including writing an action creator, an
action constant that is placed in a reducer's case statement, etc. And that
doesn't even include all the importing and exporting. Of course, this is price
to pay for Redux's simplicity, but wouldn't it be nice to avoid writing all of
this repetitious code?

To help, install Mod CLI globally. 

`$ npm i -g @mod-cli/mod-cli`

By itself, Mod CLI can't do anything. It needs a plugin that specifies all of the
desired file transformations. I've written one for this project.

`$ npm i -S @mod-cli/mod-react-plugin`

Write the plugin name in a `.mod` file so that Mod CLI will use this plugin
to execute the transformations:

`$ echo '@mod-cli/mod-react-plugin' > .mod`

We're ready to write our reset functionality. Enter the following command.

```
$ mod reset Counter
    modified mod-react/src/redux/actions/constants.js
    modified mod-react/src/redux/actions/creators.js
    modified mod-react/src/components/Counter.js
    modified mod-react/src/redux/reducers/counter.js
```

We can see that it made modifications to a number of files! It currently doesn't
display which changes (coming soon), but here are the git diffs.

![Screenshot](readme-images/mod-cli-diffs.png)

All of the boilerplate has been added! So all we have to do to create our reset
functionality is to update our reducer in `src/redux/reducers/counter.js`:

```
...
  case RESET:
    return { ...state, count: 0 };
...
```

And then in `src/components/Counter.js`, right below the decrement button, add a
button with its `onClick` handler set to the newly generated `reset` function,
which is already available from `this.props`.
```
...
  <button onClick={this.props.decrement}>-</button>
  <button onClick={this.props.reset}>0</button>
...
```

That's it! Check it out in the browser.

## Mod React (Redux)

### Individual commands

To create an action constant and action creator

`$ mod -a <action>`

To generate a new component file with a component

`$ mod -c <Component>`

To generate a reducer file with a reducer

`$ mod -r <reducer>`

To add a reducer to the rootReducer

`$ mod -t <reducer>`

### Actions

Most of the boilerplate in Redux involves actions or state (and in that order).
More specifically, actions/action creators are added to components and reducers
and not vice versa. Similarly, state is added to reducers and to components.

With that in mind, this command will create the action constant/creator
AND includes the constant into the reducer (it will also create the reducer and
reducer file if it doesn't exist):

`$ mod -a <action> -r <reducer>`

So too for components (action creator)

`$ mod -a <action> -c <Component>`

And to do it all at once

`$ mod -a <action> -c <Component> -r <reducer>`

Two conveniences are that if you use `<action>` as your first argument you can
drop the `-a`:

`$ mod <action> -c <Component> -r <reducer>`

The second, is that if your component and reducer have the same name, you don't
need to specify each (this was the command given in the preceding section):

`$ mod <action> <Component|reducer>`

One other feature is that the plugin won't write over previous actions, keys,
case statements, etc. Nor does it duplicate them. However, it currently won't
display this to you (coming soon).

### Sagas

![Screenshot](readme-images/repo.png)
![Screenshot](readme-images/repos_sagas.png)

```
const url = "https://fakerql.com/graphql";
const graphqlString = `
{
  Todo(id: 1) {
    id
    title
    completed
  }
}
`;
```

### State

Along with actions, you can also add state to your components and reducers.

`$ mod -s myKey -c myComponent`

```
const mapStateToProps = state => ({
  myKey: state.myComponent.myKey
})
```

And if you specify a reducer: `$ mod -s myKey -c MyComponent -r myReducer`,
it takes priority.
```
const mapStateToProps = state => ({
  myKey: state.myReducer.myKey
})
```

You can also create a custom key: `$ mod -s my.custom.prop -c MyComponent`
```
const mapStateToProps = state => ({
  prop: state.my.custom.prop
})
```

Finally you can add a key to the reducer as well.
`$ mod -s myKey -r myReducer`.

```
const initialState = {
  myKey: null,
}
```

Just as with actions, you can add state to both the component and the reducer:
`$ mod -s myKey -c MyComponent -r myReducer`

If they share the same name
`$ mod -s myKey <Component|reducer>`

Unlike actions, you can't ever omit `-s` preceding a state key. And
`$ -s stateKey` won't do anything.

Even though invoking all these arguments share a similar structure
(`-a <action>`, `-s <stateKey>`, `-c <Component>`, `-r <reducer>`), their
behavior is slightly different. In determing this structure, intuitiveness
and brevity were weighted more heavily than consistency of behavior.
