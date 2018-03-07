import React, { Component } from "react";
import Smooth from "../Smooth";

class ShowDetails extends Component {
  state = {
    show: false
  };

  render() {
    const { state } = this;
    return (
      <Smooth className="box-border">
        <button onClick={() => this.setState({ show: !state.show })}>
          Show Details
        </button>
        <div>
          {state.show && <div>Details here</div>}
        </div>
      </Smooth>
    );
  }
}

export default ShowDetails;
