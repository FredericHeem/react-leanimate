import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DelayUnmount from "./DelayUnmount";

const C1 = ({ myProp }) => <div className="carousel">{myProp}</div>;

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
        <div>Header</div>
        <div
          style={{
            border: "1px solid blue",
            margin: "auto",
            width: "100px",
            height: "100px"
          }}
        >
          <DelayUnmount
            component={state.show ? <C1 myProp="AA" /> : <C1 myProp="BB" />}
            animationHide={"hide-right 1s"}
            animationShow={"show-left 1s"}
          />
        </div>
        <div
          style={{
            border: "1px solid blue",
            margin: "auto",
            width: "100px",
            height: "100px"
          }}
        >
          <DelayUnmount
            component={state.show ? <C1 myProp="CC" /> : <C1 myProp="DD" />}
            animationHide={"hide-left 1s"}
            animationShow={"show-right 1s"}
          />
        </div>
        <div>Footer</div>
      </div>
    );
  }
}

export default App;
