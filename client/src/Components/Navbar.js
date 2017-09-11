import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import NavLinks from "./NavLinks";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark navbar-dark" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavLinks />
            <Nav className="ml-auto" navbar>
              <NavItem disabled className="title">
                Fideligard
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
