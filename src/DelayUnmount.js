import React, { Component } from "react";

export default class DelayUnmount extends Component {
  state = {
    current: null
  };

  componentWillMount() {
    this.setState({ current: this.props.component });
  }

  componentDidMount() {
    this.nodeCurrentRect = this.nodeCurrent.firstChild.getBoundingClientRect();
  }

  componentWillReceiveProps(nextProps) {
    const { state } = this;
    const nextComponent = nextProps.component;
    if (nextComponent !== state.current) {
      this.saveNode(this.nodeCurrent);
      this.setState({ previous: state.current, current: nextComponent });
    }
  }

  componentWillUnmount() {
    this.saveNode(this.nodeCurrent);
  }

  saveNode(node) {
    if (node && node.innerHTML) {
      const nodeCloned = node.cloneNode(true);
      nodeCloned.style.position = "fixed";
      let rect = node.firstChild.getBoundingClientRect();
      if (rect.width === 0) {
        rect = this.nodeCurrentRect;
      }
      nodeCloned.style.left = `${rect.left}px`;
      nodeCloned.style.top = `${rect.top}px`;
      nodeCloned.style.animation = this.props.animationHide;
      document.body.appendChild(nodeCloned);
      const animationEndHandler = () => {
        nodeCloned.parentNode.removeChild(nodeCloned);
      };

      nodeCloned.addEventListener("animationend", animationEndHandler);
    }
  }
  render() {
    const { state } = this;
    const me = this;
    return (
      <div
        ref={node => {
          if (node && node.innerHTML) {
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
    );
  }
}
