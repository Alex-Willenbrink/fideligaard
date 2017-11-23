import React from "react";
import IconButton from "material-ui/IconButton";
import SvgIcon from "material-ui/SvgIcon";
import AppBar from "material-ui/AppBar";
import "./Navbar.css";

import { MoneyIcon } from "../SvgIcons";

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
        <AppBar
          iconElementLeft={
            <IconButton>
              <SvgIcon>
                <MoneyIcon fill="white" />
              </SvgIcon>
            </IconButton>
          }
          title="Fideligard"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          className="fideligard-navbar"
        />
      </div>
    );
  }
}
