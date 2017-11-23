import React, { Component } from "react";
import { connect } from "react-redux";
import Portfolio from "../Components/Portfolio";

class PortfolioContainer extends Component {
  generatePortfolioStocks = (userStocks, currentDate, stocks) => {
    const stocksArray = [];
    Object.keys(userStocks).forEach(ticker => {
      const dateString = currentDate.format("YYYY-MM-DD");
      stocksArray.push({
        ticker,
        quantity: userStocks[ticker],
        currentPrice: stocks[ticker][dateString].toFixed(2),
        value: (stocks[ticker][dateString] * userStocks[ticker]).toFixed(2)
      });
    });
    return stocksArray;
  };

  render() {
    const userStocks = this.props.TransactionsReducers.stocks;
    const { currentDate } = this.props.DateReducers;

    const { stocksData } = this.props.StocksReducers;
    const stocks = stocksData && stocksData.stocks;

    const stocksArray =
      stocks && currentDate && stocksData
        ? this.generatePortfolioStocks(
            userStocks,
            currentDate,
            stocksData.stocks
          )
        : [];

    return <Portfolio stocks={stocksArray} />;
  }
}

const mapStateToProps = state => ({
  TransactionsReducers: state.TransactionsReducers,
  StocksReducers: state.StocksReducers,
  DateReducers: state.DateReducers
});

export default connect(mapStateToProps, null)(PortfolioContainer);
