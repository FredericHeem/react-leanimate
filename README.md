# react-leanimate  [![npm version](https://badge.fury.io/js/react-leanimate.svg)](https://badge.fury.io/js/react-leanimate)
Animate your react application with a lightweight component.  

## Aminate component ![](http://img.badgesize.io/fredericheem/react-leanimate/master/src/Animate.js.svg?compression=gzip)
The problem with animating a react component is simple, you cannot animate a component that has been removed from the DOM. 

The solution is to wrap a component, intercept the unmount lifecycle, clone the underlying DOM node and then apply the desired CSS animation. 

Here is a basic example of how to use the *Animate* component:

```jsx
import React, { Component } from "react";
import Animate from "react-leanimate/Animate";

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

[![Edit react-leanimate example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rj3m0jq3o4)

## Smooth component ![](http://img.badgesize.io/fredericheem/react-leanimate/master/src/Smooth.js.svg?compression=gzip)

When a child component is added or removed, the parent node will have its width or height changed. Use the *Smooth* component to animate this transition.

Example:

```jsx
import React, { Component } from "react";
import Smooth from "react-leanimate/Smooth";

class ShowDetails extends Component {
  state = {
    show: false
  };

  render() {
    const { state } = this;
    return (
      <Smooth className="box-border">
        <button onClick={() => this.setState({ show: !state.show })}>
          Show Details
        </button>
        <div>
          {state.show && <div>Details here</div>}
        </div>
      </Smooth>
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
> microbundle -i src/Animate.js -i src/Smooth.js --external all --jsx React.createElement

Build output to dist:
        609 B: Animate.js
        575 B: Animate.m.js
        673 B: Animate.umd.js
        718 B: Smooth.js
        684 B: Smooth.m.js
        782 B: Smooth.umd.js
 ```

## Modifying this library

Start a development server using:

    $ npm run build

You can also develop with [storybook](https://github.com/storybooks/storybook)

    $ npm run storybook




