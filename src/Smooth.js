import React from "react";

function createKeyFrameTag(css, name) {
  const elem = document.createElement("style");
  elem.innerHTML = css;
  elem.setAttribute("class", "keyframe-style");
  elem.setAttribute("id", name);
  elem.setAttribute("type", "text/css");
  document.getElementsByTagName("head")[0].appendChild(elem);
  return elem;
}

function createKeyFrameCss(name, old, next) {
  return `@keyframes ${name} {
      from { 
          opacity: 1;
          height:${old.height}px;
          width:${old.width}px;
      }
      to { 
          opacity: 1;
          height:${next.height}px;
          width:${next.width}px;
      }
    }`;
}

function createKeyFrameName() {
  const id = Math.random()
    .toString(36)
    .substring(7);
  return `kf-${id}`;
}

function removeCssElement(elem) {
  if (elem) {
    elem.parentNode.removeChild(elem);
  }
}

export default class Smooth extends React.Component {
  componentDidMount() {
    this.nodeCurrentRect = this.nodeCurrent.getBoundingClientRect();
  }
  componentWillUnmount() {
    removeCssElement(this.cssElem);
  }

  render() {
    const { state } = this;
    const me = this;
    return (
      <div
        {...this.props}
        style={{ overflow: "hidden" }}
        ref={node => {
          if (node && node.innerHTML) {
            if (this.nodeCurrentRect) {
              const old = this.nodeCurrentRect;
              const next = node.getBoundingClientRect();
              const name = createKeyFrameName();
              const keyFrame = createKeyFrameCss(name, old, next);
              const cssElement = createKeyFrameTag(keyFrame, name);
              removeCssElement(this.cssElem);
              this.cssElem = cssElement;
              node.style.animation = `${name} 0.3s`;
              const animationBeginHandler = () => {
                node.removeEventListener("animationend", animationBeginHandler);
                this.nodeCurrentRect = node.getBoundingClientRect();
                removeCssElement(me.cssElem);
                me.cssElem = null;
              };

              node.addEventListener("animationend", animationBeginHandler);
            }

            me.nodeCurrent = node;
          }
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
