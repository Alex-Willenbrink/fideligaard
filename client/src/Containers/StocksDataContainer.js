import React, { PureComponent } from "react";
import StocksData from "../Components/StocksData";
import { connect } from "react-redux";

import * as StocksActions from "../Actions/stocks";
import { bindActionCreators } from "redux";

class StocksDataContainer extends PureComponent {
  state = {
    stocksData: [],
    filter: "",
    sortType: ""
  };

  async componentDidMount() {
    await this.props.StocksActions.getStocks();
    this.parseData();
  }

  componentWillReceiveProps() {
    if (this.props.StocksReducers.stocksData.tickers) {
      this.parseData();
    }
  }

  parseDataRow = ticker => {
    const stocks = this.props.StocksReducers.stocksData.stocks[ticker];
    const { currentDate } = this.props.DateReducers;
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

  parseData = () => {
    const { tickers } = this.props.StocksReducers.stocksData;
    // const reggie = new RegExp(this.state.filter);
    // const filteredTickers = tickers.filter(ticker => reggie.test(ticker));

    // return this.sortData(
    this.setState({
      stocksData: tickers.map(ticker => this.parseDataRow(ticker))
    });
  };
  //
  // sortData = parsedData => {
  //   let compare;
  //   switch (this.state.sortType) {
  //     case "SYMBOL_ASC":
  //       compare = (a, b) => {
  //         return a.Symbol > b.Symbol ? -1 : 1;
  //       };
  //       break;
  //     case "SYMBOL_DESC":
  //       compare = (a, b) => (a.Symbol < b.Symbol ? -1 : 1);
  //       break;
  //     case "PRICE_ASC":
  //       compare = (a, b) => {
  //         return a.Price > b.Price ? -1 : 1;
  //       };
  //       break;
  //     case "PRICE_DESC":
  //       compare = (a, b) => {
  //         return a.Price < b.Price ? -1 : 1;
  //       };
  //       break;
  //     default:
  //       return parsedData;
  //   }
  //   return parsedData.sort(compare);
  // };
  //
  // onFilterChange = e => {
  //   this.setState({
  //     filter: e.target.value
  //   });
  // };
  //
  // onSortChange = e => {
  //   let sortDir = this.state.sortType.split("_")[1];
  //   sortDir = sortDir === "ASC" ? "DESC" : "ASC";
  //
  //   this.setState({
  //     sortType: `${e.target.getAttribute("value").toUpperCase()}_${sortDir}`
  //   });
  // };

  render() {
    // console.log("this.props: ", this.props);
    // const stocksData = this.state.stocksData
    // <StocksData stocksData={this.state.stocksData} />
    // const { isFetching } = this.props.StocksReducers;

    return <StocksData stocksData={this.state.stocksData} />;
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
