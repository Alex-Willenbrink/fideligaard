import React, { Component } from "react";
import { connect } from "react-redux";

import Transactions from "../Components/Transactions";

class TransactionsContainer extends Component {
  state = {
    transactions: this.props.TransactionsReducers.transactions
  };

  render() {
    const { transactions } = this.state;
    return <Transactions transactions={transactions} />;
  }
}

const mapStateToProps = state => ({
  TransactionsReducers: state.TransactionsReducers
});

export default connect(mapStateToProps, null)(TransactionsContainer);
