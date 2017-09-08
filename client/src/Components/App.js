import React, { Component } from "react";
import { createStore, Provider, applyMiddleWare } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Portfolio, trade, transaction
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import Transactions from "./Transactions";
import { Button } from "reactstrap";

import StockContainer from "../Containers/StocksContainer";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";

const store = createStore({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <h1>Stock Portfolio App</h1>
            <NavLinks />
            <StockContainer />
            <Switch>
              <Route exact path="/Portfolio" component={Portfolio} />
              <Route exact path="/Transactions" component={Transactions} />
              <Route exact path="/Trade" component={Trade} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
