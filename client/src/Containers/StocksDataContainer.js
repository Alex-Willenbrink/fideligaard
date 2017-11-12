import React, { Component } from "react";
import StocksData from "../Components/StocksData";
import { connect } from "react-redux";

import * as StocksActions from "../Actions/stocks";
import { bindActionCreators } from "redux";

class StocksDataContainer extends Component {
  state = {
    stocksData: [],
    filter: "",
    sortDir: "ASC"
  };

  async componentDidMount() {
    await this.props.StocksActions.getStocks();
    this.parseData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.StocksReducers.stocksData) {
      this.parseData(nextProps);
    }
  }

  parseData = props => {
    const { tickers } = props.StocksReducers.stocksData;
    const reggie = new RegExp(this.state.filter);
    const filteredTickers = tickers.filter(ticker => reggie.test(ticker));
    const stocksData = filteredTickers.map(ticker =>
      this.parseDataRow(ticker, props)
    );
    this.sortData(stocksData);
    this.setState({
      stocksData: stocksData
    });
  };

  parseDataRow = (ticker, props) => {
    const stocks = props.StocksReducers.stocksData.stocks[ticker];
    const { currentDate } = props.DateReducers;
    const currentPrice = stocks[currentDate.format("YYYY-MM-DD")];
    const dataRow = {
      Symbol: ticker,
      Price: currentPrice
    };

    [1, 7, 30].forEach(dayDiff => {
      let diffDate = currentDate.clone().subtract(dayDiff, "days");
      dataRow[`${dayDiff}D`] =
        currentPrice - stocks[diffDate.format("YYYY-MM-DD")];
      dataRow[`${dayDiff}D`] = !isNaN(dataRow[`${dayDiff}D`])
        ? dataRow[`${dayDiff}D`].toFixed(2)
        : null;
    });
    return dataRow;
  };

  onFilterChange = async e => {
    await this.setState({
      filter: e.target.value
    });
    this.parseData(this.props);
  };

  onSortChange = async e => {
    const sortDir = this.state.sortDir === "ASC" ? "DESC" : "ASC";
    await this.setState({
      sortDir
    });
    this.parseData(this.props);
  };

  sortData = parsedData => {
    let compare;
    switch (this.state.sortDir) {
      case "ASC":
        compare = (a, b) => {
          return a.Symbol < b.Symbol ? -1 : 1;
        };
        break;
      case "DESC":
        compare = (a, b) => {
          return a.Symbol > b.Symbol ? -1 : 1;
        };
        break;
      default:
        compare = (a, b) => {
          return a.Symbol < b.Symbol ? -1 : 1;
        };
    }
    parsedData.sort(compare);
  };

  render() {
    return (
      <StocksData
        stocksData={this.state.stocksData}
        onFilterChange={this.onFilterChange}
        onSortChange={this.onSortChange}
        sortDir={this.state.sortDir}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    StocksReducers: state.StocksReducers,
    DateReducers: state.DateReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    StocksActions: bindActionCreators(StocksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StocksDataContainer
);
