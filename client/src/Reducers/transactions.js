import { TransactionsActions } from "../Actions";

// import moment from "moment";
const initialState = {
  transactions: [],
  balance: 10000,
  stocks: {},
  loading: false,
  error: null
};

// const initialState = {
//   transactions: [
//     {
//       date: moment("2016-01-01"),
//       ticker: "AAPL",
//       type: "Buy",
//       quantity: 1,
//       price: 105.35,
//       id: "Hyf2pPQgz"
//     },
//     {
//       date: moment("2016-01-01"),
//       ticker: "ABT",
//       type: "Buy",
//       quantity: 6,
//       price: 42.93,
//       id: "HJjnavQeG"
//     },
//     {
//       date: moment("2016-01-01"),
//       ticker: "LUV",
//       type: "Buy",
//       quantity: 5,
//       price: 41.96,
//       id: "B1MpavQxG"
//     }
//   ],
//   balance: 9427.27,
//   stocks: {
//     AAPL: 1,
//     ABT: 6,
//     LUV: 5
//   },
//   loading: false,
//   error: null
// };

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
        stocksNew[ticker] = quantity * multiplier * -1;
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
