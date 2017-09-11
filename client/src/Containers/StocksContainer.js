import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../Actions";
import StocksView from "../Components/StocksView";

class StocksContainer extends Component {
  componentDidMount() {
    this.props.getInitialStocksData();
  }

  render() {
    const { stocksData, isFetching } = this.props.StocksReducers;
    console.log("stocksData: ", stocksData);

    return <StocksView stocksData={stocksData} isFetching={isFetching} />;
  }
}

const mapStateToProps = state => {
  return {
    StocksReducers: state.StocksReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInitialStocksData: () => {
      dispatch(Actions.StocksActions.getStocks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
