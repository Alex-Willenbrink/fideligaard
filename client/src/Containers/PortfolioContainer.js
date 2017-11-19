import React, { Component } from "react";
import { connect } from "react-redux";

class PortfolioContainer extends Component {
  state = {
    stocks: this.props.TransactionsReducers.transactions
  };

  render() {
    const { stocks } = this.props.TransactionsReducers;
  }
}

const mapStateToProps = state => ({
  TransactionsReducers: state.TransactionsReducers
});

export default connect(mapStateToProps, null)(PortfolioContainer);
