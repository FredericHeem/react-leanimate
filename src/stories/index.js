import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "../App.css";
import Animate from "../Animate";
import Smooth from "../Smooth";
import ShowDetails from "./ShowDetails";
import Toggler from "./Toggler";

const BoxM = ({ myProp }) => <div className="box-m">{myProp}</div>;
const BoxL = ({ myProp }) => <div className="box-l">{myProp}</div>;

class Toggle extends Component {
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
        {this.props.children({ toggle: this.state.show })}
      </div>
    );
  }
}

storiesOf("Smooth", module).add("height", () => <ShowDetails />);

storiesOf("Animate", module)
  .add("removal", () => (
    <Toggle>
      {({ toggle }) =>
        toggle && (
          <Animate
            component={<BoxM />}
            animationHide={"hide-right 1s"}
            animationShow={"show-left 1s"}
          />
        )}
    </Toggle>
  ))
  .add("substitution left to right", () => (
    <Toggle>
      {({ toggle }) => (
        <Animate
          component={toggle ? <BoxM myProp="AA" /> : <BoxL myProp="BB" />}
          animationHide={"hide-right 1s"}
          animationShow={"show-left 1s"}
        />
      )}
    </Toggle>
  ))
  .add("substitution right to left", () => (
    <Toggle>
      {({ toggle }) => (
        <Animate
          component={toggle ? <BoxM myProp="AA" /> : <BoxL myProp="BB" />}
          animationHide={"hide-left 1s"}
          animationShow={"show-right 1s"}
        />
      )}
    </Toggle>
  ))
  .add("toggler example", () => <Toggler />);
