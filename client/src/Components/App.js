import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//Portfolio, trade, transaction
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import Transactions from "./Transactions";
import { Button } from "reactstrap";
import Example from "./Text";
// import classnames from "classnames";
// import reactTapEventPlugin from "react-tap-event-plugin";
// const moment = require("moment");

import NavLinks from "./NavLinks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stock Portfolio App</h1>
        <div>
          {/* <NavLinks /> */}
          <Example />
          <Button color="danger">Danger</Button>
        </div>
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
