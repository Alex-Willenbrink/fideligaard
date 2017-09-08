import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import DatetimeSlider from "react-datetime-slider";
import "react-datetime-slider/css/ReactDatetimeSlider.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const moment = require("moment");

class App extends Component {
  render() {
    return (
      <div className="App">
        <DatetimeSlider
          min={moment().subtract(1, "hour").valueOf()}
          max={moment().valueOf()}
          onChange={console.log}
        />
        <h1>Stock Portfolio App</h1>
        <Slider />
        <Range />
      </div>
    );
  }
}

export default App;
