import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Portfolio, trade, transaction
// import Portfolio from "./Portfolio";
// import StocksContainer from "../Containers/StocksContainer";
// import Transactions from "./Transactions";

// import NavLinks from "./NavLinks";
// import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import DateWidgetContainer from "../../Containers/DateWidgetContainer";
import StocksDataContainer from "../../Containers/StocksDataContainer";
import TradeContainer from "../../Containers/TradeContainer";

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
            <article id="main-container">
              <div className="left">
                <StocksDataContainer />
              </div>
              <div className="right">
                <div id="date-widget-container">
                  <DateWidgetContainer />
                </div>
                <br />
                <br />
                <br />
                <Switch>
                  <Route
                    exact
                    path="/Trade"
                    render={() => <TradeContainer id="trade-container" />}
                  />
                </Switch>
              </div>
            </article>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
