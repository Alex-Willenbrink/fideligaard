import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import * as TransactionsActions from "../Actions/transactions";

import Trade from "../Components/Trade";

/*

- should probably pass the stocksData reducer to TradeContainer
- we could make a trade reducer that keeps track of the symbol (date is already date reducer)

 */

class TradeContainer extends Component {
  state = {
    symbol: null,
    tradeType: "Buy",
    quantity: 0,
    price: 0,
    cost: 0
  };

  async componentDidMount() {
    const { t } = queryString.parse(this.props.location.search);
    const { currentDate } = this.props.DateReducers;
    this.setState({
      symbol: t || null
    });
    // update price and cost
    this.updatePriceAndCost();
  }

  async componentWillReceiveProps(nextProps) {
    const { t } = queryString.parse(nextProps.location.search);
    await this.setState({
      symbol: t || null
    });
    this.updatePriceAndCost();
  }

  updatePriceAndCost = () => {
    let price = 0,
      cost = 0;
    if (this.props.StocksReducers.stocksData) {
      const { symbol, quantity } = this.state;
      const { currentDate } = this.props.DateReducers;
      price = this.props.StocksReducers.stocksData.stocks[symbol][
        currentDate.format("YYYY-MM-DD")
      ];
      cost = price * quantity;
    }
    this.setState({
      price,
      cost
    });
  };

  isValidSymbol = props => {
    const { stocksData } = props.StocksReducers;
    return stocksData && stocksData.tickers.includes(this.state.symbol);
  };

  // put in transform to change value of variable before storing in the state
  // transform is optional
  onTradeInfoChange = transform => async e => {
    e.stopPropagation();
    const value =
      typeof transform === "function"
        ? transform(e.target.value)
        : e.target.value;
    await this.setState({
      [e.target.name]: value
    });
    this.updatePriceAndCost(this.props);
  };

  transformQuantity = value => {
    return ~~value;
  };

  isNumber = value => !isNaN(parseInt(value));

  onTradeTransaction = () => {
    const { symbol, tradeType, quantity, price } = this.state;
    const { currentDate } = this.props.DateReducers;
    const transaction = {
      date: currentDate.clone(),
      ticker: symbol,
      type: tradeType,
      quantity,
      price
    };

    this.props.TransactionsActions.tradeTransaction(transaction);
  };

  render() {
    let { balance } = this.props.TransactionsReducers;
    let { currentDate } = this.props.DateReducers;
    let { symbol, tradeType, quantity, price, cost } = this.state;

    balance = this.isNumber(balance) && `$${balance.toFixed(2)}`;
    price = this.isNumber(price) && `$${price.toFixed(2)}`;
    cost = this.isNumber(cost) && `$${cost.toFixed(2)}`;
    let date = currentDate ? currentDate.format("MM/DD/YYYY") : null;

    return (
      <Trade
        balance={balance}
        onTradeInfoChange={this.onTradeInfoChange()}
        onQuantityChange={this.onTradeInfoChange(this.transformQuantity)}
        symbol={symbol}
        tradeType={tradeType}
        quantity={quantity}
        date={date}
        price={price}
        cost={cost}
        onTradeTransaction={this.onTradeTransaction}
      />
    );
  }
}

const mapStateToProps = state => ({
  StocksReducers: state.StocksReducers,
  DateReducers: state.DateReducers,
  TransactionsReducers: state.TransactionsReducers
});

const mapDispatchToProps = dispatch => ({
  TransactionsActions: bindActionCreators(TransactionsActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradeContainer)
);
