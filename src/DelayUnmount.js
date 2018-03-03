import React, { Component } from "react";

export default class DelayUnmount extends Component {
  state = {
    previous: null,
    current: null
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ current: this.props.component });
  }

  componentWillReceiveProps(nextProps) {
    const { state } = this;
    let nextComponent = nextProps.component;
    if (nextComponent !== state.current) {
      this.setState({ previous: state.current, current: nextComponent });
    }
  }

  render() {
    const { state } = this;
    console.log("render ", state);
    return (
      <div>
        <div
          ref={node => {
            if (node && node.innerHTML) {
              node.style.visibility = "visible";
              node.style.animation = this.props.animationHide;

              const animationEndHandler = ev => {
                node.removeEventListener("animationend", animationEndHandler);
                node.style.visibility = "hidden";
                node.style.animation = "";
              };

              node.addEventListener("animationend", animationEndHandler);
            }
          }}
          style={{ position: "absolute" }}
        >
          {state.previous}
        </div>
        <div
          ref={node => {
            if (node && node.innerHTML) {
              node.style.animation = this.props.animationShow;
              const animationBeginHandler = ev => {
                node.removeEventListener("animationend", animationBeginHandler);
                node.style.animation = "";
              };

              node.addEventListener("animationend", animationBeginHandler);
            }
          }}
          style={{ position: "absolute" }}
        >
          {state.current}
        </div>
      </div>
    );
  }
}
