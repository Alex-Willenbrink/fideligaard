import React, { Component } from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { withRouter } from "react-router-dom";

class RouterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.route
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.history.push(`/${value}`);
  };

  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={"Trade"} primaryText="Trade" />
        <MenuItem value={"Transactions"} primaryText="Transactions" />
        <MenuItem value={"Portfolio"} primaryText="Portfolio" />
      </DropDownMenu>
    );
  }
}

export default withRouter(RouterDropdown);
