import React from "react";

function createKeyframeTag(css, id) {
  const elem = document.createElement("style");
  elem.innerHTML = css;
  elem.setAttribute("class", "keyframe-style");
  elem.setAttribute("id", id);
  elem.setAttribute("type", "text/css");
  document.getElementsByTagName("head")[0].appendChild(elem);
  return id;
}

export default class Morph extends React.Component {

  componentDidMount() {
    this.nodeCurrentRect = this.nodeCurrent.getBoundingClientRect();
    console.log("componentDidMount ", this.nodeCurrentRect);
  }
  componentWillUnmount() {
    //TODO remove css
  }

  render() {
    const { state } = this;
    const me = this;
    return (
      <div {...this.props} style={{overflow: 'hidden'}}
        ref={node => {
          if (node && node.innerHTML) {
            if (this.nodeCurrentRect) {
              const old = this.nodeCurrentRect;
              const next = node.getBoundingClientRect();
              const id = Math.random()
                .toString(36)
                .substring(7);
              const name = `kf-${id}`;
              const keyFrame = `@keyframes ${name} {
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
              createKeyframeTag(keyFrame, id);
              node.style.animation = `${name} 0.3s`;
            }

            const animationBeginHandler = () => {
              node.removeEventListener("animationend", animationBeginHandler);
              this.nodeCurrentRect = node.getBoundingClientRect();
            };

            node.addEventListener("animationend", animationBeginHandler);
            me.nodeCurrent = node;
          }
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
