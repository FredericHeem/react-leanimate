import React, { Component } from "react";

export default class DelayUnmount extends Component {
  state = {
    previous: null,
    current: null
  };

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
  componentWillUnmount() {
    const { nodeCurrent } = this;
    if (nodeCurrent) {
      const nodeCloned = nodeCurrent.cloneNode(true);
      const parent = nodeCurrent.parentNode;
      nodeCloned.style.position = "fixed";
      const rect = nodeCurrent.firstChild.getBoundingClientRect();
      nodeCloned.style.left = `${rect.left}px`;
      nodeCloned.style.top = `${rect.top}px`;
      nodeCurrent.parentNode.insertAdjacentElement("afterend", nodeCloned);
      this.saveNode(nodeCloned);
    }
  }
  saveNode(node) {
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
  }
  render() {
    const { state } = this;
    const me = this;
    return (
      <div>
        <div
          ref={node => {
            console.log("previous ", node);
            this.saveNode(node)
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
              me.nodeCurrent = node;
            }
          }}
        >
          {state.current}
        </div>
      </div>
    );
  }
}
