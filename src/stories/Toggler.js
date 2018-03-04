import React, { Component } from "react";
import Animate from "./Animate";

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

export default Toggler;
