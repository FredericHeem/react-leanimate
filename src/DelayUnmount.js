import React, { Component } from "react";

export default class DelayUnmount extends Component {
  state = {
    previous: null,
    current: null
  };

  constructor(props) {
    super(props);
    console.log("DelayUnmount ctor props.component", props.component);
  }

  componentWillMount() {
    console.log("componentWillMount");
    this.setState({ current: this.props.component });
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      "componentWillReceiveProps",
      nextProps.component,
      this.state.current
    );
    const { state } = this;
    let nextComponent = nextProps.component;
    if (nextComponent !== state.current) {
      console.log("componentWillReceiveProps new props");
      this.setState({ previous: state.current, current: nextComponent });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate", nextProps);
  }

  render() {
    const { state } = this;
    console.log("render ", state);
    return (
      <div>
        <div
          ref={node => {
            if (node && node.innerHTML) {
              console.log(
                "REF prev style ",
                node.innerHTML,
                node.style.animation
              );
              node.style.visibility = "visible";
              node.style.animation = this.props.animationHide;

              const animationEndHandler = ev => {
                console.log("animationEndHandler", ev);
                node.removeEventListener("animationend", animationEndHandler);
                node.style.visibility = "hidden";
                node.style.animation = "";
              };

              node.addEventListener("animationend", animationEndHandler);
            } else {
              console.log("REF prev null");
            }
          }}
          style={{ position: "absolute" }}
        >
          {state.previous}
        </div>
        <div
          ref={node => {
            if (node && node.innerHTML) {
              console.log(
                "REF curr style ",
                node.innerHTML,
                node.style.animation
              );

              window.requestAnimationFrame(() => {
                node.style.animation = this.props.animationShow;
              });
              const animationBeginHandler = ev => {
                console.log("animationBeginHandler", ev);
                node.removeEventListener("animationend", animationBeginHandler);
                node.style.animation = "";
              };

              node.addEventListener("animationend", animationBeginHandler);
            } else {
              console.log("REF curr null");
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
