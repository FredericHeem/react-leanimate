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
    const nextComponent = nextProps.component;
    if (nextComponent !== state.current) {
      this.setState({ previous: state.current, current: nextComponent });
    }
  }
  componentWillUnmount() {
    const { nodeCurrent } = this;
    console.log("componentWillUnmount ", nodeCurrent)
    if (nodeCurrent) {
      const nodeCloned = nodeCurrent.cloneNode(true);
      nodeCloned.style.position = "fixed";
      const rect = nodeCurrent.firstChild.getBoundingClientRect();
      nodeCloned.style.left = `${rect.left}px`;
      nodeCloned.style.top = `${rect.top}px`;
      document.body.appendChild(nodeCloned);
console.log("rect ", rect)
      //nodeCurrent.parentNode.insertAdjacentElement("afterend", nodeCloned);
      this.saveNode(nodeCloned);
    }
  }
  saveNode(node) {
    if (node && node.innerHTML) {
      node.style.visibility = "visible";
      node.style.animation = this.props.animationHide;

      const animationEndHandler = () => {
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
      <div className="animate">
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
              console.log("new rect ", node, node.getBoundingClientRect())

              node.style.animation = this.props.animationShow;
              const animationBeginHandler = () => {
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
