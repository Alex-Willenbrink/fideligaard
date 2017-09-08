import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class NavLinks extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Button Dropdown</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>
            <NavLink className="nav-link" exact to="/Portfolio">
              Portfolio
            </NavLink>
          </DropdownItem>
          <DropdownItem disabled>
            <NavLink className="nav-link" exact to="/Trade">
              Trade
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink className="nav-link" exact to="/Transactions">
              Transactions
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
