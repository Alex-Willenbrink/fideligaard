import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import FlatButton from "material-ui/FlatButton";
import ReplayIcon from "material-ui/svg-icons/av/replay";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import StopIcon from "material-ui/svg-icons/av/stop";

import DatetimeSlider from "react-datetime-slider";
import "../../node_modules/react-datetime-slider/css/ReactDatetimeSlider.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//Portfolio, trade, transaction
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import Transactions from "./Transactions";
// import classnames from "classnames";
// import reactTapEventPlugin from "react-tap-event-plugin";
// const moment = require("moment");

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <DatetimeSlider
          min={moment()
            .subtract(1, "hour")
            .valueOf()}
          max={moment().valueOf()}
          onChange={console.log}
        />
        <h1>Stock Portfolio App</h1>
        <Slider />
        <Range /> */}
        <h1>Stock Portfolio App</h1>
        <Router>
          <Switch>
            <Route exact path="/Portfolio" component={Portfolio} />
            <Route exact path="/Transactions" component={Transactions} />
            <Route exact path="/Trade" component={Trade} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
