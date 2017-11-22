import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Navbar";
import DateWidgetContainer from "../../Containers/DateWidgetContainer";
import StocksDataContainer from "../../Containers/StocksDataContainer";
import TradeContainer from "../../Containers/TradeContainer";
import TransactionsContainer from "../../Containers/TransactionsContainer";

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
            <article id="main-container">
              <div className="main-subcontainer">
                <StocksDataContainer />
              </div>
              <div className="main-subcontainer">
                <div id="date-widget-container">
                  <DateWidgetContainer />
                </div>
                <br />
                <Switch>
                  <Route
                    exact
                    path="/Trade"
                    render={() => <TradeContainer id="trade-container" />}
                  />
                  <Route
                    exact
                    path="/Transactions"
                    render={() => <TransactionsContainer />}
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
