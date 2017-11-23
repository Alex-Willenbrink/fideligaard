import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import shortid from "shortid";
import swal from "sweetalert2";

import * as TransactionsActions from "../Actions/transactions";
import Trade from "../Components/Trade";

class TradeContainer extends Component {
  state = {
    symbol: null,
    tradeType: "Buy",
    quantity: 0,
    price: 0,
    cost: 0,
    isValidTransaction: false
  };

  async componentDidMount() {
    const { t } = queryString.parse(this.props.location.search);
    await this.setState({
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
    const { balance, stocks } = this.props.TransactionsReducers;
    const { symbol, quantity, tradeType } = this.state;
    let price = 0,
      cost = 0,
      isValidTransaction = false;
    if (this.props.StocksReducers.stocksData && symbol) {
      const { currentDate } = this.props.DateReducers;
      price = this.props.StocksReducers.stocksData.stocks[symbol][
        currentDate.format("YYYY-MM-DD")
      ];
      cost = price * quantity;
    }

    if (tradeType === "Buy") {
      isValidTransaction = balance >= cost && cost > 0;
    } else if (tradeType === "Sell") {
      isValidTransaction = stocks[symbol] && stocks[symbol] >= quantity;
    }

    this.setState({
      price,
      cost,
      isValidTransaction
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

  isNumber = value => !isNaN(parseInt(value, 10));

  onTradeTransaction = () => {
    const { symbol, tradeType, quantity, price } = this.state;
    const { currentDate } = this.props.DateReducers;
    const transaction = {
      date: currentDate.clone(),
      ticker: symbol,
      type: tradeType,
      quantity,
      price,
      id: shortid.generate()
    };

    this.props.TransactionsActions.tradeTransaction(transaction);
    if (tradeType === "Buy") {
      swal({
        title: "Bought Stocks!",
        text: `You acquired ${quantity} stocks from ${symbol}`,
        type: "success",
        timer: 2000
      });
    } else if (tradeType === "Sell") {
      swal({
        title: "Sold Stocks!",
        text: `You sold ${quantity} stocks from ${symbol}`,
        type: "success",
        timer: 2000
      });
    }
  };

  render() {
    let { balance } = this.props.TransactionsReducers;
    let { currentDate } = this.props.DateReducers;
    let {
      symbol,
      tradeType,
      quantity,
      price,
      cost,
      isValidTransaction
    } = this.state;

    const date = currentDate ? currentDate.format("MM/DD/YYYY") : null;
    const moneyBagSize = this.isNumber(balance)
      ? Math.round(Math.pow(balance * 6, 0.33))
      : 0;

    balance = this.isNumber(balance) && `${balance.toFixed(2)}`;
    price = this.isNumber(price) && `$${price.toFixed(2)}`;
    cost = this.isNumber(cost) && `$${cost.toFixed(2)}`;

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
        isValidTransaction={isValidTransaction}
        moneyBagSize={moneyBagSize}
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
