import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Card, CardBlock, CardTitle, Input } from "reactstrap";
import { createSelector } from "reselect";

import * as Actions from "../Actions";
import StocksView from "../Components/StocksView";
import DatePicker from "../Components/DatePicker";
import TradeView from "../Components/TradeView";
import moment from "moment";

class StocksContainer extends PureComponent {
  constructor() {
    super();

    this.state = {
      date: moment("2016-12-31"),
      filter: "",
      sortType: ""
    };
  }

  componentDidMount() {
    this.props.getInitialStocksData();
  }

  onDateChange = date => {
    console.log(this.props);
    this.setState({
      date: date
    });
  };

  getStringDayDifference = (currDate, dayDiff) => {
    currDate = moment(currDate);
    return currDate.subtract(dayDiff, "days").format("YYYY-MM-DD");
  };

  parseDataRow = ticker => {
    if (Object.keys(this.props.StocksReducers.stocksData).length < 1)
      return null;

    const stocks = this.props.StocksReducers.stocksData.stocks[ticker];
    const currDate = this.state.date.format("YYYY-MM-DD");
    const currPrice = stocks[currDate];
    const dataRow = {
      Symbol: ticker,
      Price: currPrice
    };

    [1, 7, 30].forEach(
      dayDiff =>
        (dataRow[`${dayDiff}D`] = (stocks[currDate] -
          stocks[this.getStringDayDifference(currDate, dayDiff)]).toFixed(2))
    );

    return dataRow;
  };

  parseData = () => {
    const { tickers } = this.props.StocksReducers.stocksData;
    if (!tickers) return [];
    const filteredTickers = tickers.filter(ticker => {
      let reggie = new RegExp(this.state.filter);
      return reggie.test(ticker);
    });
    if (!tickers) return [];

    return this.sortData(
      filteredTickers.map(ticker => this.parseDataRow(ticker))
    );
  };

  sortData = parsedData => {
    let compare;
    switch (this.state.sortType) {
      case "SYMBOL_ASC":
        compare = (a, b) => {
          return a.Symbol > b.Symbol ? -1 : 1;
        };
        break;
      case "SYMBOL_DESC":
        compare = (a, b) => (a.Symbol < b.Symbol ? -1 : 1);
        break;
      case "PRICE_ASC":
        compare = (a, b) => {
          return a.Price > b.Price ? -1 : 1;
        };
        break;
      case "PRICE_DESC":
        compare = (a, b) => {
          return a.Price < b.Price ? -1 : 1;
        };
        break;
      default:
        return parsedData;
    }
    return parsedData.sort(compare);
  };

  onFilterChange = e => {
    this.setState({
      filter: e.target.value
    });
  };

  onSortChange = e => {
    let sortDir = this.state.sortType.split("_")[1];
    sortDir = sortDir === "ASC" ? "DESC" : "ASC";

    this.setState({
      sortType: `${e.target.getAttribute("value").toUpperCase()}_${sortDir}`
    });
  };

  render() {
    const { isFetching } = this.props.StocksReducers;

    return (
      <div className="row">
        <div className="col-lg-6">
          <Card>
            <CardBlock>
              <CardTitle>Stocks</CardTitle>
            </CardBlock>
            <CardBlock className="col-lg-6">
              <Input
                type="text"
                placeholder="filter"
                onChange={this.onFilterChange}
              />
            </CardBlock>
            <CardBlock>
              <DatePicker date={this.state.date} handler={this.onDateChange} />
            </CardBlock>
            <CardBlock>
              <StocksView
                stocksData={this.parseData()}
                isFetching={isFetching}
                handler={this.onSortChange}
              />
            </CardBlock>
          </Card>
        </div>
        <div className="col-log-6">
          <TradeView
            symbol={"AAPL"}
            date={this.state.date.format("YYYY-MM-DD")}
            stockCost={1234}
          />
        </div>
      </div>
    );
  }
}

// Creating non-memoized selector functions
// const getStocksReducers = (state) => state.StocksReducers;

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
