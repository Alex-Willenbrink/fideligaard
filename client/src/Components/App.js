import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Portfolio, trade, transaction
// import Portfolio from "./Portfolio";
import StocksContainer from "../Containers/StocksContainer";
import Transactions from "./Transactions";

// import NavLinks from "./NavLinks";
// import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

import PerfProfiler from "./Elements/PerfProfiler";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PerfProfiler />
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/Portfolio" component={StocksContainer} />
                <Route exact path="/Transactions" component={Transactions} />
                {/* <Route exact path="/Trade" component={Trade} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
