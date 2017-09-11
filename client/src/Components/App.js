import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Portfolio, trade, transaction
import Portfolio from "./Portfolio";
import StocksContainer from "../Containers/StocksContainer";
import Trade from "./Trade";
import Transactions from "./Transactions";
// import { Button } from "reactstrap";

import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment("2016-01-01")
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <h1>Stock Portfolio App</h1>
            <NavLinks />

            <Switch>
              {/* <Route exact path="/Portfolio" component={Portfolio} /> */}
              <Route exact path="/Portfolio" component={StocksContainer} />
              <Route exact path="/Transactions" component={Transactions} />
              <Route exact path="/Trade" component={Trade} />
            </Switch>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
