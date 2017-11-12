import { TransactionsActions } from "../Actions";

const initialState = {
  transactions: [],
  balance: 1000,
  stocks: {},
  loading: false,
  error: null
};

// transaction - {date: moment, ticker: String, type ("Buy", "Sell"), quantity, price}
// stocks {"ticker": count}

export default (state = initialState, action) => {
  switch (action.type) {
    case TransactionsActions.TRADE_TRANSACTION_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };

    case TransactionsActions.TRADE_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case TransactionsActions.TRADE_TRANSACTION_SUCCESS:
      const { transactions, balance, stocks } = state;
      const { type, quantity, price, ticker } = action.payload;

      const multiplier = type === "Sell" ? 1 : -1;
      const balanceNew = balance + price * quantity * multiplier;

      const transactionsNew = transactions.slice();
      transactionsNew.push(action.payload);

      const stocksNew = Object.assign({}, stocks);
      if (Object.keys(stocksNew).includes(ticker)) {
        stocksNew[ticker] += quantity * multiplier * -1;
      } else {
        stocksNew[ticker] = quantity * multiplier + -1;
      }

      return {
        ...state,
        transactions: transactionsNew,
        balance: balanceNew,
        stocks: stocksNew,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};
