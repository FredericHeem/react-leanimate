import React, { Component } from "react";
import "./App.css";
import Animate from "./Animate";
import ShowDetails from "./stories/ShowDetails";

const createSourceUsplash = size =>
  `https://unsplash.it/${size}/${size}?random`;

function Content({ src, size }) {
  return (
    <img
      style={{ width: size, height: size }}
      src={src}
      width={size}
      height={size}
      alt={src}
    />
  );
}
const Box = ({ size }) => (
  <Content src={createSourceUsplash(size)} size={size} />
);

class App extends Component {
  state = {
    show: true
  };

  render() {
    const { state } = this;
    return (
      <div className="App">
        <header>
          <h1 className="App-title">
            Animate your React application under 1kB with <a href="https://github.com/FredericHeem/react-leanimate">
              react-leanimate
            </a>
          </h1>
        </header>
        <main>
          <section>
            <h1>Smooth</h1>
            <div className="smooth-area">
              <ShowDetails />
            </div>
          </section>
          <section>
            <h1>Animate</h1>
            <button onClick={() => this.setState({ show: !state.show })}>
              Start Animation
            </button>
            <h2>Removed</h2>
            <div className="test-area">
              {state.show && (
                <Animate
                  component={<Box size="50" />}
                  animationHide={"hide-right 1s"}
                  animationShow={"show-left 1s"}
                />
              )}
            </div>
            <h2>Replaced left to right</h2>
            <div className="test-area">
              <Animate
                component={state.show ? <Box size="100" /> : <Box size="50" />}
                animationHide={"hide-right 1s"}
                animationShow={"show-left 1s"}
              />
            </div>
            <h2>Replaced right to left</h2>
            <div className="test-area">
              <Animate
                component={state.show ? <Box size="50" /> : <Box size="150" />}
                animationHide={"hide-left 1s"}
                animationShow={"show-right 1s"}
              />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
