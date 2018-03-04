import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Animate from "./Animate";

const BoxM = ({ myProp }) => <div className="box-m">{myProp}</div>;
const BoxL = ({ myProp }) => <div className="box-l">{myProp}</div>;

class App extends Component {
  state = {
    show: true
  };

  render() {
    const { state } = this;
    console.log("app render ");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => this.setState({ show: !state.show })}>
          Toggle
        </button>
        <h2>Component removed</h2>
        <div
          style={{
            border: "1px solid blue",
            margin: "auto",
            width: "120px",
            height: "120px"
          }}
        >
          {state.show && (
            <Animate
              component={<BoxM myProp="AA" />}
              animationHide={"hide-right 1s"}
              animationShow={"show-left 1s"}
            />
          )}
        </div>
        <h2>Component replaced</h2>
        <div
          style={{
            border: "1px solid blue",
            margin: "auto",
            width: "120px",
            height: "120px",
            marginTop: "10px"
          }}
        >
          <Animate
            component={state.show ? <BoxM myProp="AA" /> : <BoxL myProp="BB" />}
            animationHide={"hide-right 1s"}
            animationShow={"show-left 1s"}
          />
        </div>
        <div
          style={{
            border: "1px solid blue",
            margin: "auto",
            width: "100px",
            height: "100px",
            marginTop: "10px"
          }}
        >
          <Animate
            component={state.show ? <BoxL myProp="CC" /> : <BoxM myProp="DD" />}
            animationHide={"hide-left 1s"}
            animationShow={"show-right 1s"}
          />
        </div>
      </div>
    );
  }
}

export default App;
