#react-leanimate http://img.badgesize.io/fredericheem/react-leanimate/master/src/Animate.js.svg?compression=gzip

Animate your react application with a lightweight component.  

The problem with animating a react component is simple, you cannot animate a component that has been removed from the DOM. 

The solution is to wrap a component, intercept the unmount lifecycle, clone the underlying DOM node and then apply the desired CSS animation. 

Here is a basic example of how to use the *Animate* component:

```jsx
import React, { Component } from "react";
import Animate from "react-leanimate";

class Toggler extends Component {
  state = {
    show: true
  };

  render() {
    const { state } = this;
    return (
      <div>
        <button onClick={() => this.setState({ show: !state.show })}>
          Toggle
        </button>
        <div
        >
          {state.show && (
            <Animate
              component={<span>Hello World</span>}
              animationHide={"hide-right 1s"}
              animationShow={"show-left 1s"}
            />
          )}
        </div>
      </div>
    );
  }
}

```

## Installing this library

The library is published under the *react-leanimate* name

    $ npm i react-leanimate


## Building this library

[microbundle](https://github.com/developit/microbundle) is the underlying tool to produce size efficient bundles.

```sh
$ npm run build:lib
Build output to dist:
        588 B: react-leanimate.js
        573 B: react-leanimate.m.js
        662 B: react-leanimate.umd.js
 ```

## Modifying this library

Start a development server using:

    $ npm run build

You can also develop with [storybook](https://github.com/storybooks/storybook)

    $ npm run storybook




