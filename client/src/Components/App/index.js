import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Portfolio, trade, transaction
// import Portfolio from "./Portfolio";
// import StocksContainer from "../Containers/StocksContainer";
// import Transactions from "./Transactions";

// import NavLinks from "./NavLinks";
// import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import DateWidget from "../DateWidget";
import DateWidgetContainer from "../../Containers/DateWidgetContainer";
import StocksDataContainer from "../../Containers/StocksDataContainer";

import "./App.css";

// import PerfProfiler from "./Elements/PerfProfiler";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="router-container">
            <Navbar />
            <br />
            <br />
            <div className="stocks-container">
              <div id="stocks-data-container">
                <StocksDataContainer />
              </div>
              <div id="date-widget-container">
                <DateWidgetContainer />
              </div>
            </div>

            {/* <Switch>
              <Route exact path="/Portfolio" component={StocksContainer} />
            </Switch> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
